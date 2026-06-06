<template>
  <div class="orders-shell">
    <div class="page-header">
      <div>
        <h1>Orders</h1>
        <p>Track active tickets, kitchen status, and completed receipts.</p>
      </div>

      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search orders, tables, or customers..." />
      </div>
    </div>

    <section class="stats-grid">
      <article class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-top">
          <div class="stat-icon" :class="stat.iconClass">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="stat.iconPath" />
              <circle v-if="stat.iconCircle" :cx="stat.iconCircle.cx" :cy="stat.iconCircle.cy" :r="stat.iconCircle.r" />
            </svg>
          </div>
          <span class="stat-badge" :class="stat.badgeClass">{{ stat.badge }}</span>
        </div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-value">{{ stat.value }}<span v-if="stat.unit" class="stat-unit">{{ stat.unit }}</span></div>
        <div class="bar-track">
          <div class="bar-fill" :class="stat.barClass" :style="{ width: stat.barW }"></div>
        </div>
      </article>
    </section>

    <section class="orders-card">
      <div class="tabs">
        <button v-for="t in tabs" :key="t" class="tab" :class="{ active: activeTab === t }" @click="activeTab = t">
          {{ t }}
        </button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer / Table</th>
              <th>Items</th>
              <th class="center">Elapsed Time</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="empty-row">No orders found.</td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td><span class="order-id">{{ order.id }}</span></td>
              <td>
                <div class="customer-cell">
                  <div class="customer-avatar" :style="{ background: order.avatarColor }">{{ order.initials }}</div>
                  <div>
                    <div class="customer-name">{{ order.customer }}</div>
                    <div class="customer-sub">{{ order.tableInfo }}</div>
                  </div>
                </div>
              </td>
              <td class="items-cell">
                <div>{{ order.itemsPreview }}</div>
                <div v-if="order.moreItems" class="items-more">+{{ order.moreItems }} more items</div>
              </td>
              <td class="center">
                <span class="elapsed" :class="elapsedClass(order)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {{ order.elapsed }}
                </span>
              </td>
              <td><span class="total">{{ order.total }}</span></td>
              <td><span class="status-badge" :class="statusClass(order.status)">{{ order.status }}</span></td>
              <td>
                <button class="action-btn" @click="handleAction(order)">
                  {{ order.status === 'Delivered' ? 'Receipt' : 'Update' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="bottom-grid">
      <article class="bottom-card">
        <div class="bottom-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 3h15v13H1z" />
            <path d="M16 8h4l3 3v5h-7z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        </div>
        <div class="bottom-label">Out for Delivery</div>
        <div class="bottom-value">6</div>
      </article>
      <article class="bottom-card">
        <div class="bottom-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h22" />
          </svg>
        </div>
        <div class="bottom-label">Pending Payments</div>
        <div class="bottom-value">$412.00</div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('')
const activeTab = ref('All')
const tabs = ['All', 'Pending', 'Preparing', 'Delivered']

const stats = [
  { label: 'Active Orders', value: '36', badge: '+18%', badgeClass: 'badge-green', iconClass: 'icon-blue', barClass: 'bar-blue', barW: '80%', iconPath: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
  { label: 'Avg. Wait Time', value: '11.2', unit: 'min', badge: '-5m', badgeClass: 'badge-green', iconClass: 'icon-soft', barClass: 'bar-gray', barW: '32%', iconPath: 'M12 6v6l4 2', iconCircle: { cx: 12, cy: 12, r: 10 } },
  { label: 'Kitchen Load', value: '72', unit: '%', badge: 'Busy', badgeClass: 'badge-blue', iconClass: 'icon-blue', barClass: 'bar-blue', barW: '72%', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
]

const orders = ref([
  { id: '#ORD-9001', customer: 'John Smith', initials: 'T1', avatarColor: '#2563EB', tableInfo: 'Table 1 - 3 Guests', itemsPreview: 'Burger, French Fries, Coke', moreItems: 1, elapsed: '12:15', total: '$45.50', status: 'Preparing' },
  { id: '#ORD-9002', customer: 'Emma Johnson', initials: 'T5', avatarColor: '#10B981', tableInfo: 'Table 5 - 2 Guests', itemsPreview: 'Chicken Alfredo, Orange Juice', moreItems: null, elapsed: '05:20', total: '$28.75', status: 'Pending' },
  { id: '#ORD-9003', customer: 'Michael Brown', initials: 'T8', avatarColor: '#F59E0B', tableInfo: 'Table 8 - 4 Guests', itemsPreview: 'Pizza Family Set', moreItems: 3, elapsed: '18:30', total: '$89.99', status: 'Preparing' },
  { id: '#ORD-9004', customer: 'Sophia Davis', initials: 'P', avatarColor: '#8B5CF6', tableInfo: 'Online Order - Pickup', itemsPreview: 'Iced Latte, Croissant', moreItems: null, elapsed: 'Done', total: '$12.50', status: 'Delivered' },
  { id: '#ORD-9005', customer: 'William Wilson', initials: 'T3', avatarColor: '#EF4444', tableInfo: 'Table 3 - 2 Guests', itemsPreview: 'Steak, Caesar Salad', moreItems: null, elapsed: '22:45', total: '$67.20', status: 'Preparing' },
  { id: '#ORD-9006', customer: 'Olivia Martinez', initials: 'D', avatarColor: '#06B6D4', tableInfo: 'Delivery - 1 Guest', itemsPreview: 'Sushi Combo, Green Tea', moreItems: 2, elapsed: 'Done', total: '$34.90', status: 'Delivered' },
])

const filteredOrders = computed(() => {
  let list = orders.value
  if (activeTab.value !== 'All') list = list.filter((order) => order.status === activeTab.value)

  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list

  return list.filter((order) =>
    [order.customer, order.id, order.tableInfo, order.itemsPreview].some((value) =>
      value.toLowerCase().includes(q),
    ),
  )
})

function elapsedClass(order) {
  if (order.status === 'Delivered') return 'elapsed-done'
  const mins = parseInt(order.elapsed.split(':')[0], 10)
  return mins >= 20 ? 'elapsed-warn' : 'elapsed-ok'
}

function statusClass(status) {
  return { Preparing: 'status-preparing', Pending: 'status-pending', Delivered: 'status-delivered' }[status] ?? ''
}

function handleAction(order) {
  alert(`${order.id} - ${order.customer}`)
}
</script>

<style scoped>
*, *::before, *::after { box-sizing: border-box; }

.orders-shell {
  --brand: #3b82f6;
  --surface: #ffffff;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --line: #eef2f7;
  --green: #059669;
  --green-bg: #d1fae5;
  --red: #dc2626;
  --red-bg: #fee2e2;
  --orange: #c2410c;
  --orange-bg: #ffedd5;
  --blue-text: #2563eb;
  --blue-bg: #dbeafe;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--text);
  font-family: Inter, system-ui, sans-serif;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.page-header h1 {
  margin: 0 0 4px;
  color: var(--text);
  font-size: 30px;
  font-weight: 800;
  letter-spacing: 0;
}

.page-header p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.search-wrap {
  position: relative;
  width: min(100%, 360px);
  flex: 0 0 auto;
}

.search-wrap input {
  width: 100%;
  height: 42px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: var(--text);
  font: inherit;
  font-size: 14px;
  outline: none;
  padding: 0 14px 0 40px;
  transition: border-color .15s, box-shadow .15s;
}

.search-wrap input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, .14);
}

.search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat-card,
.orders-card,
.bottom-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
}

.stat-card {
  min-width: 0;
  padding: 20px;
}

.stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.stat-icon { width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; }
.stat-icon svg { width: 17px; height: 17px; }
.icon-blue { background: var(--brand); color: #fff; }
.icon-soft { background: #eff6ff; color: #64748b; }
.stat-badge { border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 700; }
.badge-green { background: var(--green-bg); color: var(--green); }
.badge-blue { background: var(--blue-bg); color: var(--blue-text); }
.stat-label { color: var(--muted); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
.stat-value { margin-top: 4px; font-size: 30px; font-weight: 800; line-height: 1; }
.stat-unit { font-size: 14px; font-weight: 500; margin-left: 3px; }
.bar-track { height: 4px; margin-top: 16px; border-radius: 999px; background: #e2e8f0; overflow: hidden; }
.bar-fill { height: 100%; border-radius: inherit; }
.bar-blue { background: var(--brand); }
.bar-gray { background: #64748b; }

.orders-card {
  overflow: hidden;
}

.tabs {
  min-height: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
}

.tab {
  min-width: 86px;
  height: 38px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: #f1f5f9;
  color: #475569;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background .15s, color .15s, border-color .15s;
}

.tab.active {
  background: var(--brand);
  color: #fff;
}

.tab:hover:not(.active) {
  background: #e2e8f0;
}

.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: #f8fafc; }

th {
  height: 52px;
  padding: 0 20px;
  color: #475569;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .08em;
  text-align: left;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

th.center,
td.center { text-align: center; }

td {
  height: 74px;
  padding: 0 20px;
  border-bottom: 1px solid var(--line);
  color: #334155;
  font-size: 13px;
  vertical-align: middle;
}

tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover td { background: #f8fafc; }
.order-id { color: var(--brand); font-weight: 800; font-size: 13px; }
.customer-cell { display: flex; align-items: center; gap: 10px; }
.customer-avatar { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-size: 11px; font-weight: 800; flex-shrink: 0; }
.customer-name { color: #0f172a; font-weight: 800; font-size: 13px; line-height: 1.2; }
.customer-sub { color: var(--muted); font-size: 11px; margin-top: 2px; }
.items-cell { max-width: 220px; }
.items-more { color: var(--brand); font-size: 11px; font-weight: 700; margin-top: 2px; }

.elapsed,
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.elapsed svg { width: 11px; height: 11px; }
.elapsed-warn { background: var(--red-bg); color: var(--red); }
.elapsed-ok { background: #f1f5f9; color: #475569; }
.elapsed-done { background: var(--green-bg); color: var(--green); }
.status-preparing { background: var(--orange-bg); color: var(--orange); }
.status-pending { background: var(--blue-bg); color: var(--blue-text); }
.status-delivered { background: var(--green-bg); color: var(--green); }
.total { color: #0f172a; font-size: 14px; font-weight: 800; }

.action-btn {
  height: 32px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #fff;
  color: #334155;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  padding: 0 12px;
  cursor: pointer;
  transition: background .15s, border-color .15s, color .15s;
}

.action-btn:hover {
  background: #eff6ff;
  border-color: var(--brand);
  color: var(--brand);
}

.empty-row { text-align: center; color: var(--muted); }
.bottom-grid { display: flex; flex-wrap: wrap; gap: 16px; }
.bottom-card { flex: 0 0 200px; padding: 20px; }
.bottom-icon { width: 22px; height: 22px; color: var(--brand); margin-bottom: 12px; }
.bottom-icon svg { width: 22px; height: 22px; }
.bottom-label { color: var(--muted); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.bottom-value { color: var(--text); font-size: 24px; font-weight: 800; margin-top: 5px; }

@media (max-width: 900px) {
  .page-header {
    flex-direction: column;
  }

  .search-wrap {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
