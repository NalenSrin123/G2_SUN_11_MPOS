<template>
  <div class="orders-shell">
    <!-- Topbar -->
    <header class="topbar">
      <h2 class="topbar-title">Orders</h2>
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search orders, tables, or customers..." />
      </div>
      <div class="topbar-actions">
        <button class="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button class="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
          </svg>
        </button>
        <img class="avatar" src="https://i.pravatar.cc/80?img=13" alt="Admin" />
      </div>
    </header>

    <!-- Content -->
    <main class="content">
      <!-- Stats -->
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
          <div class="bar-track"><div class="bar-fill" :class="stat.barClass" :style="{ width: stat.barW }"></div></div>
        </article>
      </section>

      <!-- Orders Card -->
      <section class="orders-card">
        <div class="tabs">
          <button v-for="t in tabs" :key="t" class="tab" :class="{ active: activeTab === t }" @click="activeTab = t">{{ t }}</button>
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
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
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

      <!-- Bottom Cards -->
      <section class="bottom-grid">
        <article class="bottom-card">
          <div class="bottom-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 3h15v13H1z" /><path d="M16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div class="bottom-label">Out for Delivery</div>
          <div class="bottom-value">6</div>
        </article>
        <article class="bottom-card">
          <div class="bottom-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h22" />
            </svg>
          </div>
          <div class="bottom-label">Pending Payments</div>
          <div class="bottom-value">$412.00</div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeTab = ref('All')
const tabs = ['All', 'Pending', 'Preparing', 'Delivered']

const stats = [
  { label: 'Active Orders', value: '36', badge: '+18%', badgeClass: 'badge-green', iconClass: 'icon-blue', barClass: 'bar-blue', barW: '80%', iconPath: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
  { label: 'Avg. Wait Time', value: '11.2', unit: 'min', badge: '-5m', badgeClass: 'badge-green', iconClass: 'icon-soft', barClass: 'bar-gray', barW: '32%', iconPath: 'M12 6v6l4 2', iconCircle: { cx: 12, cy: 12, r: 10 } },
  { label: 'Kitchen Load', value: '72', unit: '%', badge: 'Busy', badgeClass: 'badge-blue', iconClass: 'icon-blue', barClass: 'bar-blue', barW: '72%', iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
]

const orders = ref([
  { 
  id: '#ORD-9001', 
  customer: 'John Smith', 
  initials: 'T1', 
  avatarColor: '#2563EB', 
  tableInfo: 'Table 1 • 3 Guests', 
  itemsPreview: 'Burger, French Fries, Coke', 
  moreItems: 1, 
  elapsed: '12:15', 
  total: '$45.50', 
  status: 'Preparing' 
  },
  { 
  id: '#ORD-9002', 
  customer: 'Emma Johnson', 
  initials: 'T5', 
  avatarColor: '#10B981', 
  tableInfo: 'Table 5 • 2 Guests', 
  itemsPreview: 'Chicken Alfredo, Orange Juice', 
  moreItems: null, elapsed: '05:20', 
  total: '$28.75', 
  status: 'Pending' 
  },
  { 
  id: '#ORD-9003', 
  customer: 'Michael Brown', 
  initials: 'T8', 
  avatarColor: '#F59E0B', 
  tableInfo: 'Table 8 • 4 Guests', 
  itemsPreview: 'Pizza Family Set', 
  moreItems: 3, elapsed: '18:30', 
  total: '$89.99', 
  status: 'Preparing' 
  },
  { 
  id: '#ORD-9004', 
  customer: 'Sophia Davis', 
  initials: 'P', 
  avatarColor: '#8B5CF6', 
  tableInfo: 'Online Order • Pickup', 
  itemsPreview: 'Iced Latte, Croissant', 
  moreItems: null, 
  elapsed: 'Done', 
  total: '$12.50', 
  status: 'Delivered' },
  { 
  id: '#ORD-9005', 
  customer: 'William Wilson', 
  initials: 'T3', 
  avatarColor: '#EF4444', 
  tableInfo: 'Table 3 • 2 Guests', 
  itemsPreview: 'Steak, Caesar Salad', 
  moreItems: null, 
  elapsed: '22:45', 
  total: '$67.20', 
  status: 'Preparing' 
  },
  { 
  id: '#ORD-9006', 
  customer: 'Olivia Martinez', 
  initials: 'D', 
  avatarColor: '#06B6D4',
  tableInfo: 'Delivery • 1 Guest', 
  itemsPreview: 'Sushi Combo, Green Tea', 
  moreItems: 2, 
  elapsed: 'Done', 
  total: '$34.90', 
  status: 'Delivered' 
  },
])

const filteredOrders = computed(() => {
  let list = orders.value
  if (activeTab.value !== 'All') list = list.filter(o => o.status === activeTab.value)
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter(o => [o.customer, o.id, o.tableInfo, o.itemsPreview].some(v => v.toLowerCase().includes(q)))
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
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.orders-shell {
  --brand: #4376db;
  --page: #a9c9f4;
  --surface: #ffffff;
  --surface-soft: #8cb6f4;
  --text: #7a9cea;
  --muted: #5c6472;
  --border: #77a1ef;
  --line: #6f9efa;
  --green: #73f3ca;
  --green-bg: #79eeb6;
  --red: #fa5f5f;
  --red-bg: #ffd6d6;
  --orange: #f88d62;
  --orange-bg: #f7b15c;
  --blue-text: #4888e9;
  --blue-bg: #6ea9f6;
  --radius: 12px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--page);
  color: var(--text);
  font-family: 'DM Sans', Inter, system-ui, sans-serif;
}
.topbar {
  height: 58px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.topbar-title { font-size: 17px; font-weight: 800; letter-spacing: -.01em; min-width: 70px; }
.search-wrap { position: relative; flex: 1 1 400px; max-width: 520px; }
.search-wrap input {
  width: 100%; height: 38px; border: 1px solid var(--border); border-radius: 8px;
  background: #f5f7fb; color: var(--text); font: inherit; font-size: 13px;
  outline: none; padding: 0 14px 0 38px; transition: all .15s;
}
.search-wrap input:focus { border-color: #9fb3d8; background: #fff; box-shadow: 0 0 0 3px rgba(13,71,191,.08); }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #6b7280; }
.topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 12px; }
.icon-btn {
  width: 32px; height: 32px; border: 0; background: transparent;
  color: #374151; display: grid; place-items: center; cursor: pointer;
  border-radius: 6px; transition: background .15s;
}
.icon-btn svg { width: 18px; height: 18px; }
.icon-btn:hover { background: #e8ecf4; }
.avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
.content {
  flex: 1;
  overflow-y: auto;
  padding: 26px 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.stats-grid { display: flex; gap: 20px; }
.stat-card {
  flex: 1; min-width: 0;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 22px;
  box-shadow: 0 1px 1px rgba(15,23,42,.02);
}
.stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.stat-icon { width: 30px; height: 30px; border-radius: 7px; display: grid; place-items: center; }
.stat-icon svg { width: 16px; height: 16px; }
.icon-blue { background: var(--brand); color: #fff; }
.icon-soft { background: #dbe4fb; color: #64748b; }
.stat-badge { border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 700; }
.badge-green { color: var(--green); }
.badge-blue { background: #e5ecff; color: #223a71; }
.stat-label { color: #474f60; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; }
.stat-value { margin-top: 4px; font-size: 30px; font-weight: 800; letter-spacing: -.04em; line-height: 1; }
.stat-unit { font-size: 14px; font-weight: 500; margin-left: 3px; letter-spacing: 0; }
.bar-track { height: 3px; margin-top: 16px; border-radius: 999px; background: #e2e5ea; overflow: hidden; }
.bar-fill { height: 100%; border-radius: inherit; }
.bar-blue { background: var(--brand); }
.bar-gray { background: #626b7d; }

.orders-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  flex: 1;
}
.tabs {
  height: 60px; display: flex; align-items: center; gap: 6px;
  padding: 0 20px; border-bottom: 1px solid var(--border);
}
.tab {
  min-width: 80px; height: 38px; border: 0; border-radius: 6px;
  background: var(--surface-soft); color: #4b5563; font: inherit;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: all .15s;
}
.tab.active { background: #fff; color: var(--brand); box-shadow: 0 0 0 1px #e5e7eb, 0 1px 2px rgba(15,23,42,.08); }
.tab:hover:not(.active) { background: #e3e7ef; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
thead { background: #f1f3f6; }
th {
  height: 52px; padding: 0 20px; color: #424858;
  font-size: 11px; font-weight: 800; letter-spacing: .08em;
  text-align: left; text-transform: uppercase; border-bottom: 1px solid var(--border);
  white-space: nowrap;
}
th.center, td.center { text-align: center; }
td { height: 76px; padding: 0 20px; border-bottom: 1px solid var(--line); font-size: 13px; vertical-align: middle; }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover td { background: #f8fafc; }
.order-id { color: var(--brand); font-weight: 800; font-size: 13px; }
.customer-cell { display: flex; align-items: center; gap: 10px; }
.customer-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  display: grid; place-items: center; color: #fff;
  font-size: 11px; font-weight: 800; flex-shrink: 0;
}
.customer-name { font-weight: 800; font-size: 13px; line-height: 1.2; }
.customer-sub { color: #6b7280; font-size: 11px; margin-top: 2px; }
.items-cell { max-width: 220px; }
.items-more { color: var(--brand); font-size: 11px; font-weight: 700; margin-top: 2px; }
.elapsed, .status-badge {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 4px; border-radius: 999px; padding: 4px 10px;
  font-size: 11px; font-weight: 800; white-space: nowrap;
}
.elapsed svg { width: 11px; height: 11px; }
.elapsed-warn { background: var(--red-bg); color: var(--red); }
.elapsed-ok { background: #e6e9ed; color: #3f4754; }
.elapsed-done { background: var(--green-bg); color: var(--green); }
.status-preparing { background: var(--orange-bg); color: var(--orange); }
.status-pending { background: var(--blue-bg); color: var(--blue-text); }
.status-delivered { background: var(--green-bg); color: var(--green); }
.total { font-size: 14px; font-weight: 800; }
.action-btn {
  height: 30px; border: 1px solid var(--border); border-radius: 6px;
  background: #fff; color: #1f2937; font: inherit; font-size: 12px;
  font-weight: 700; padding: 0 12px; cursor: pointer; transition: all .15s;
}
.action-btn:hover { background: #f0f4ff; border-color: #9fb3d8; color: var(--brand); }
.empty-row { text-align: center; color: var(--muted); }
.bottom-grid { display: flex; gap: 20px; }
.bottom-card {
  flex: 0 0 180px;
  background: var(--surface); 
  border: 1px solid var(--border);
  border-radius: 
  var(--radius); padding: 20px;
}
.bottom-icon { width: 20px; height: 20px; color: var(--brand); margin-bottom: 12px; }
.bottom-icon svg { width: 20px; height: 20px; }
.bottom-label { color: #4b5563; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
.bottom-value { font-size: 24px; font-weight: 800; margin-top: 5px; }
</style>