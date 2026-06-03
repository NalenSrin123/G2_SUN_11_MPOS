<template>
  <div class="orders-page">

    <!-- TOPBAR -->
    <header class="topbar">
      <h1 class="topbar-title">Orders</h1>
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Search orders, tables, or customers..." />
      </div>
      <div class="topbar-actions">
        <button class="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <button class="icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>
        <div class="avatar">AD</div>
      </div>
    </header>

    <!-- CONTENT -->
    <main class="content">

      <!-- STAT CARDS -->
      <div class="stats-grid">
        <div class="stat-card" v-for="stat in stats" :key="stat.label">
          <div class="stat-top">
            <div class="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="stat.icon"/>
              </svg>
            </div>
            <span class="stat-badge" :class="stat.badgeClass">{{ stat.badge }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">
            {{ stat.value }}<span v-if="stat.unit" class="stat-unit">{{ stat.unit }}</span>
          </div>
          <div class="stat-bar-track">
            <div class="stat-bar-fill" :style="{ width: stat.barWidth }"></div>
          </div>
        </div>
      </div>

      <!-- ORDERS CARD -->
      <div class="card">

        <!-- Tabs -->
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="tab"
            :class="{ active: activeTab === tab }"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>

        <!-- Table -->
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer / Table</th>
                <th>Items</th>
                <th>Elapsed Time</th>
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

                <td>
                  <span class="order-id">{{ order.id }}</span>
                </td>

                <td>
                  <div class="customer-cell">
                    <div class="customer-avatar" :style="{ background: order.avatarColor }">
                      {{ order.initials }}
                    </div>
                    <div>
                      <div class="customer-name">{{ order.customer }}</div>
                      <div class="customer-sub">{{ order.tableInfo }}</div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="items-text">{{ order.itemsPreview }}</div>
                  <div v-if="order.moreItems" class="items-more">+{{ order.moreItems }} more items</div>
                </td>

                <td>
                  <span class="elapsed" :class="elapsedClass(order)">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.5">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {{ order.elapsed }}
                  </span>
                </td>

                <td>
                  <span class="total">{{ order.total }}</span>
                </td>

                <td>
                  <span class="status-badge" :class="statusClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>

                <td>
                  <button class="action-btn" @click="handleAction(order)">
                    {{ order.status === 'Delivered' ? 'Receipt' : 'Update' }}
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- BOTTOM SUMMARY CARDS -->
      <div class="bottom-grid">
        <div class="bottom-card">
          <div class="bottom-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="2"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <div class="bottom-label">Out for Delivery</div>
            <div class="bottom-value">6</div>
          </div>
        </div>

        <div class="bottom-card">
          <div class="bottom-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <div>
            <div class="bottom-label">Pending Payments</div>
            <div class="bottom-value">$412.00</div>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

//Search & Tabs
const searchQuery = ref('')
const activeTab   = ref('All')
const tabs        = ['All', 'Pending', 'Preparing', 'Delivered']

//Stat Cards 
const stats = [
  {
    label: 'Active Orders',
    value: '24',
    unit: null,
    badge: '↑ +12%',
    badgeClass: 'badge-green',
    barWidth: '60%',
    icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
  },
  {
    label: 'Avg. Wait Time',
    value: '14.5',
    unit: 'min',
    badge: '↓ -3m',
    badgeClass: 'badge-red',
    barWidth: '40%',
    icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2',
  },
  {
    label: 'Kitchen Load',
    value: '68',
    unit: '%',
    badge: 'Optimal',
    badgeClass: 'badge-blue',
    barWidth: '68%',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
]

//Orders Data 
const orders = ref([
  {
    id: '#ORD-9853',
    customer: 'Naymar Jr.',
    initials: 'T4',
    avatarColor: '#3B82F6',
    tableInfo: 'Table 4 · 2 Guests',
    itemsPreview: 'Ribeye Steak, Caesar Salad, Pinot Noir...',
    moreItems: 2,
    elapsed: '24:12',
    total: '$122.50',
    status: 'Preparing',
  },
  {
    id: '#ORD-9854',
    customer: 'Kilen Mbappé',
    initials: 'T12',
    avatarColor: '#8B5CF6',
    tableInfo: 'Table 12 · 4 Guests',
    itemsPreview: 'Grilled Salmon, Quinoa Bowl',
    moreItems: null,
    elapsed: '08:45',
    total: '$60.20',
    status: 'Pending',
  },
  {
    id: '#ORD-9855',
    customer: 'Cristino Ronaldo',
    initials: 'P',
    avatarColor: '#6B7280',
    tableInfo: 'Online Order · 1 Guest',
    itemsPreview: 'Margherita Pizza (Large), Garlic Bread',
    moreItems: null,
    elapsed: 'Done',
    total: '$30.15',
    status: 'Delivered',
  },
  {
    id: '#ORD-9856',
    customer: 'Leonel Messi',
    initials: 'T7',
    avatarColor: '#0EA5E9',
    tableInfo: 'Table 7 · 2 Guests',
    itemsPreview: 'Pasta Carbonara, Bruschetta',
    moreItems: null,
    elapsed: '04:20',
    total: '$50.80',
    status: 'Pending',
  },
])

//  Computed: filter by tab + search
const filteredOrders = computed(() => {
  let list = orders.value

  if (activeTab.value !== 'All') {
    list = list.filter(o => o.status === activeTab.value)
  }

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(o =>
      o.customer.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.tableInfo.toLowerCase().includes(q)
    )
  }

  return list
})

//  Helpers 
function elapsedClass(order) {
  if (order.status === 'Delivered') return 'elapsed-done'
  const mins = parseInt(order.elapsed.split(':')[0])
  return mins >= 20 ? 'elapsed-warn' : 'elapsed-ok'
}

function statusClass(status) {
  const map = {
    Preparing: 'status-preparing',
    Pending:   'status-pending',
    Delivered: 'status-delivered',
  }
  return map[status] ?? ''
}

function handleAction(order) {
  alert(`Action: ${order.id} — ${order.customer}`)
}
</script>

<style scoped>

.orders-page {
  --brand:      #1B4FD8;
  --brand-light:#EEF2FF;
  --surface:    #FFFFFF;
  --bg:         #F1F5FD;
  --text:       #1A202C;
  --muted:      #64748B;
  --border:     #E2E8F0;
  --green:      #16A34A;
  --green-bg:   #DCFCE7;
  --orange:     #EA580C;
  --orange-bg:  #FFF1E6;
  --blue-bg:    #DBEAFE;
  --blue-text:  #1D4ED8;
  --red:        #DC2626;
  --red-bg:     #FEE2E2;
  --radius:     12px;
  --radius-sm:  8px;
  --shadow:     0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04);

  font-family: 'DM Sans', 'Inter', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Topbar */
.topbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 28px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar-title {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -.3px;
  flex-shrink: 0;
}

.search-wrap {
  flex: 1;
  max-width: 440px;
  position: relative;
}

.search-wrap input {
  width: 100%;
  height: 36px;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 0 16px 0 38px;
  font-size: 13.5px;
  font-family: inherit;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: border-color .15s;
}
.search-wrap input:focus { border-color: var(--brand); }
.search-wrap input::placeholder { color: #A0AEC0; }

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0AEC0;
  pointer-events: none;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.icon-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--muted);
  transition: background .15s;
}
.icon-btn:hover { background: var(--bg); }

.avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #1B4FD8);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; color: #fff; font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
}
.content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
}

.stat-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}

.stat-icon {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: var(--brand);
  display: flex; align-items: center; justify-content: center;
}
.stat-icon svg { width: 20px; height: 20px; color: #fff; }

.stat-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}
.badge-green { background: var(--green-bg); color: var(--green); }
.badge-red   { background: var(--red-bg);   color: var(--red); }
.badge-blue  { background: var(--blue-bg);  color: var(--blue-text); }

.stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .8px;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1.1;
}

.stat-unit {
  font-size: 16px;
  font-weight: 500;
  color: var(--muted);
  margin-left: 3px;
}

.stat-bar-track {
  height: 4px;
  background: var(--border);
  border-radius: 99px;
  margin-top: 14px;
}
.stat-bar-fill {
  height: 100%;
  border-radius: 99px;
  background: var(--brand);
  transition: width .4s ease;
}

/*Orders Card */
.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  overflow: hidden;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.tab {
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  font-family: inherit;
  transition: all .15s;
}
.tab:hover { color: var(--text); background: var(--bg); }
.tab.active { background: var(--brand); color: #fff; border-color: var(--brand); }

.table-wrap { overflow-x: auto; }

table { width: 100%; border-collapse: collapse; min-width: 700px; }

thead tr { border-bottom: 1px solid var(--border); }
thead th {
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .7px;
  color: var(--muted);
  padding: 10px 20px;
  text-align: left;
  white-space: nowrap;
}

tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background .1s;
}
tbody tr:last-child { border-bottom: none; }
tbody tr:hover { background: #FAFBFF; }
tbody td { padding: 14px 20px; font-size: 13.5px; vertical-align: middle; }

.order-id {
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  color: var(--brand);
  font-size: 13px;
}

.customer-cell { display: flex; align-items: center; gap: 10px; }

.customer-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  font-size: 12px; font-weight: 700; color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.customer-name { font-weight: 600; font-size: 13.5px; }
.customer-sub  { font-size: 11.5px; color: var(--muted); margin-top: 1px; }

.items-text { font-size: 13px; color: var(--text); }
.items-more { font-size: 12px; color: var(--brand); margin-top: 2px; font-weight: 500; }

.elapsed {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
}
.elapsed-warn { background: #FFF3CD; color: #B45309; }
.elapsed-ok   { background: var(--blue-bg); color: #0369A1; }
.elapsed-done { background: var(--green-bg); color: var(--green); }

.total { font-weight: 700; font-size: 14px; }

.status-badge {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.status-preparing { background: var(--orange-bg); color: var(--orange); }
.status-pending   { background: var(--blue-bg);   color: var(--blue-text); }
.status-delivered { background: var(--green-bg);  color: var(--green); }

.action-btn {
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 12.5px;
  font-weight: 600;
  font-family: inherit;
  color: var(--text);
  cursor: pointer;
  transition: all .15s;
  white-space: nowrap;
}
.action-btn:hover { background: var(--brand); color: #fff; border-color: var(--brand); }

.empty-row {
  text-align: center;
  color: var(--muted);
  padding: 32px !important;
  font-size: 14px;
}

.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.bottom-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.bottom-icon {
  width: 44px; height: 44px;
  border-radius: 10px;
  background: var(--brand-light);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.bottom-icon svg { width: 22px; height: 22px; color: var(--brand); }

.bottom-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .8px;
  color: var(--muted);
  margin-bottom: 4px;
}

.bottom-value {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -1px;
}
</style>