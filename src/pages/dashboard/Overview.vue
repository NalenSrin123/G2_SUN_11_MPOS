<template>
  <div class="dashboard">

    <!-- ── Header ── -->
    <header class="header">
      <div class="header-left">
        <h1 class="title">Dashboard Overview</h1>
        <p class="subtitle">Real-time performance metrics for {{ today }}</p>
      </div>
      <div class="header-right">
        <button class="btn btn-ghost">
          <CalendarDays :size="15" />
          Last 24 Hours
        </button>
        <button class="btn btn-primary">
          <Download :size="15" />
          Export Report
        </button>
      </div>
    </header>

    <!-- ── KPI Cards ── -->
    <section class="kpi-grid">

      <!-- Sales Card -->
      <div class="card card-sales">
        <div class="card-sales-top">
          <span class="kpi-label">TOTAL SALES (TODAY)</span>
          <span class="badge badge-up">
            <TrendingUp :size="11" /> +12.4% vs last week
          </span>
        </div>
        <div class="kpi-value">{{ totalSales }}</div>
        <div class="mini-bars">
          <div
            v-for="(h, i) in miniBars"
            :key="i"
            class="mini-bar"
            :class="{ highlight: i === miniBars.length - 3 }"
            :style="{ height: h + '%' }"
          />
        </div>
        <div class="card-sales-foot">
          <Clock :size="12" />
          Peak at 12:45 PM
        </div>
      </div>

      <!-- Orders -->
      <div class="card card-stat">
        <div class="stat-top">
          <div class="stat-icon-wrap icon-orders">
            <ShoppingBag :size="18" />
          </div>
          <span class="stat-delta delta-down">
            <TrendingDown :size="12" /> 2%
          </span>
        </div>
        <p class="stat-label">Orders</p>
        <p class="stat-value">{{ orders }}</p>
      </div>

      <!-- Active Tables -->
      <div class="card card-stat">
        <div class="stat-top">
          <div class="stat-icon-wrap icon-tables">
            <LayoutGrid :size="18" />
          </div>
          <span class="stat-delta delta-up">
            <TrendingUp :size="12" /> 15%
          </span>
        </div>
        <p class="stat-label">Active Tables</p>
        <p class="stat-value">
          {{ activeTables }}<span class="stat-sub"> / {{ totalTables }}</span>
        </p>
      </div>

      <!-- Avg Order Value -->
      <div class="card card-stat">
        <div class="stat-top">
          <div class="stat-icon-wrap icon-avg">
            <Banknote :size="18" />
          </div>
          <span class="stat-delta delta-up">
            <TrendingUp :size="12" /> 8%
          </span>
        </div>
        <p class="stat-label">Avg. Order Value</p>
        <p class="stat-value">$41.76</p>
      </div>

    </section>

    <!-- ── Charts Row ── -->
    <section class="charts-row">

      <!-- Bar Chart -->
      <div class="card card-chart">
        <div class="chart-head">
          <div>
            <h2 class="chart-title">Sales Performance Trend</h2>
            <p class="chart-sub">Revenue vs. Projections (Hourly)</p>
          </div>
          <div class="legend">
            <span class="legend-item"><span class="dot dot-actual" /> Actual</span>
            <span class="legend-item"><span class="dot dot-target" /> Target</span>
          </div>
        </div>

        <div class="chart-wrap" ref="chartWrap">
          <div class="bar-chart">
            <div
              v-for="(pt, i) in chartData"
              :key="i"
              class="bar-group"
              @mouseenter="showTip(i, $event)"
              @mouseleave="hideTip"
            >
              <div class="bar bar-actual" :style="{ height: pct(pt.actual) + '%' }" />
              <div class="bar bar-target" :style="{ height: pct(pt.target) + '%' }" />
            </div>
          </div>
          <div class="x-axis">
            <span v-for="(pt, i) in chartData" :key="i" class="x-label">{{ pt.label }}</span>
          </div>
          <Transition name="tip">
            <div
              v-if="tip.visible"
              class="tooltip"
              :style="{ left: tip.x + 'px', top: tip.y + 'px' }"
            >
              <span class="tip-label">{{ tip.label }}</span>
              <span class="tip-row"><span class="dot dot-actual" /> ${{ tip.actual.toLocaleString() }}</span>
              <span class="tip-row"><span class="dot dot-target" /> ${{ tip.target.toLocaleString() }}</span>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Top Menu Items -->
      <div class="card card-items">
        <div class="chart-head">
          <div>
            <h2 class="chart-title">Top Menu Items</h2>
            <p class="chart-sub">By revenue today</p>
          </div>
          <Utensils :size="16" class="muted" />
        </div>
        <ul class="item-list">
          <li v-for="item in topItems" :key="item.name" class="item-row">
            <div class="item-left">
              <div class="item-icon-wrap">
                <component :is="item.icon" :size="14" />
              </div>
              <div>
                <p class="item-name">{{ item.name }}</p>
                <p class="item-orders">{{ item.orders }} orders</p>
              </div>
            </div>
            <div class="item-right">
              <p class="item-revenue">${{ item.revenue.toLocaleString() }}</p>
              <div class="item-bar-bg">
                <div
                  class="item-bar-fill"
                  :style="{ width: (item.revenue / topItems[0].revenue * 100) + '%' }"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  CalendarDays, Download, TrendingUp, TrendingDown,
  Clock, ShoppingBag, LayoutGrid, Banknote,
  Utensils, Fish, Beef, Salad, Coffee, IceCream,
} from 'lucide-vue-next'

// Date
const today = new Date().toLocaleDateString('en-US', {
  month: 'long', day: 'numeric', year: 'numeric',
})

// KPI
const totalSales   = '$14,284.50'
const orders       = ref(342)
const activeTables = ref(28)
const totalTables  = ref(46)
const miniBars     = [28, 40, 55, 46, 70, 80, 95, 88, 70, 58]

// Chart
const chartData = [
  { label: '10 AM', actual: 420,  target: 380 },
  { label: '12 PM', actual: 650,  target: 500 },
  { label: '2 PM',  actual: 880,  target: 700 },
  { label: '4 PM',  actual: 820,  target: 750 },
  { label: '6 PM',  actual: 700,  target: 680 },
  { label: '8 PM',  actual: 480,  target: 500 },
  { label: '10 PM', actual: 300,  target: 350 },
  { label: '12 AM', actual: 180,  target: 200 },
]
const maxVal = Math.max(...chartData.flatMap(d => [d.actual, d.target])) * 1.1
const pct = v => ((v / maxVal) * 100).toFixed(1)

// Tooltip
const tip = ref({ visible: false, x: 0, y: 0, label: '', actual: 0, target: 0 })
const chartWrap = ref(null)

function showTip(i, e) {
  const d   = chartData[i]
  const rect = e.currentTarget.getBoundingClientRect()
  const par  = chartWrap.value.getBoundingClientRect()
  tip.value = {
    visible: true,
    x: rect.left - par.left + rect.width / 2,
    y: rect.top  - par.top  - 80,
    label: d.label, actual: d.actual, target: d.target,
  }
}
function hideTip() { tip.value.visible = false }

// Top items
const topItems = [
  { name: 'Grilled Salmon',  orders: 87, revenue: 2175, icon: Fish     },
  { name: 'Wagyu Burger',    orders: 74, revenue: 1850, icon: Beef     },
  { name: 'Caesar Salad',    orders: 63, revenue: 945,  icon: Salad    },
  { name: 'Espresso Set',    orders: 58, revenue: 870,  icon: Coffee   },
  { name: 'Gelato Trio',     orders: 49, revenue: 735,  icon: IceCream },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.dashboard {
  --bg:       #f1f4f9;
  --surface:  #ffffff;
  --blue:     #2563eb;
  --blue-dk:  #1d4ed8;
  --blue-lt:  #eff6ff;
  --text:     #0f172a;
  --muted:    #64748b;
  --border:   #e2e8f0;
  --green:    #059669;
  --red:      #dc2626;
  --radius:   14px;
  --shadow:   0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);

  font-family: 'Outfit', sans-serif;
  color: var(--text);
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2vw, 22px);
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.title {
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.4px;
}
.subtitle {
  font-size: clamp(0.75rem, 1.2vw, 0.85rem);
  color: var(--muted);
  margin-top: 2px;
}
.header-right { display: flex; gap: 10px; flex-wrap: wrap; }

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  border: none;
  transition: all .15s;
  white-space: nowrap;
}
.btn-ghost {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
.btn-ghost:hover { background: #f8fafc; }
.btn-primary { background: var(--blue); color: #fff; }
.btn-primary:hover { background: var(--blue-dk); }

/* KPI Grid */
.kpi-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: clamp(10px, 1.5vw, 18px);
}
@media (max-width: 1024px) { .kpi-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px)  { .kpi-grid { grid-template-columns: 1fr; } }

/* Base Card */
.card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: clamp(16px, 2vw, 24px);
  animation: fadeUp .45s ease both;
}

/* Sales Card */
.card-sales {
  background: linear-gradient(140deg, #1e40af 0%, #2563eb 55%, #3b82f6 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(37,99,235,.28);
  animation-delay: 0s;
}
.card-sales::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% -20%, rgba(255,255,255,.14) 0%, transparent 60%);
  pointer-events: none;
}
.card-sales-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.kpi-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  opacity: .8;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 100px;
}
.badge-up { background: rgba(255,255,255,.18); color: #bbf7d0; }

.kpi-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin: 10px 0 6px;
}

.mini-bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 36px;
  margin: 8px 0 6px;
}
.mini-bar {
  flex: 1;
  border-radius: 3px 3px 0 0;
  background: rgba(255,255,255,.28);
  transition: height .6s cubic-bezier(.4,0,.2,1);
}
.mini-bar.highlight { background: rgba(255,255,255,.9); }

.card-sales-foot {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  opacity: .65;
}

/* Stat Cards */
.card-stat { animation-delay: .07s; }
.card-stat:nth-child(3) { animation-delay: .12s; }
.card-stat:nth-child(4) { animation-delay: .17s; }

.stat-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.stat-icon-wrap {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.icon-orders { background: #eff6ff; color: var(--blue); }
.icon-tables { background: #f0fdf4; color: #16a34a; }
.icon-avg    { background: #fff7ed; color: #d97706; }

.stat-delta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.74rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 100px;
}
.delta-up   { background: #f0fdf4; color: var(--green); }
.delta-down { background: #fef2f2; color: var(--red); }

.stat-label { font-size: 0.78rem; color: var(--muted); margin-bottom: 4px; }
.stat-value {
  font-size: clamp(1.6rem, 2.8vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.8px;
  line-height: 1;
}
.stat-sub { font-size: 0.78rem; color: var(--muted); font-weight: 400; }

/* Charts Row */
.charts-row {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: clamp(10px, 1.5vw, 18px);
  flex: 1;
}
@media (max-width: 860px) { .charts-row { grid-template-columns: 1fr; } }

.card-chart { animation-delay: .22s; }
.card-items  { animation-delay: .28s; }

.chart-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}
.chart-title { font-size: clamp(0.9rem, 1.4vw, 1rem); font-weight: 600; }
.chart-sub   { font-size: 0.76rem; color: var(--muted); margin-top: 2px; }

.legend { display: flex; gap: 14px; }
.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.76rem;
  color: var(--muted);
}

.dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-actual { background: var(--blue); }
.dot-target { background: #cbd5e1; }

/* Bar Chart */
.chart-wrap { position: relative; }
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: clamp(120px, 16vw, 180px);
}
.bar-group {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background .15s;
}
.bar-group:hover { background: #f8fafc; }
.bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  transition: height .8s cubic-bezier(.4,0,.2,1);
}
.bar-actual { background: var(--blue); }
.bar-target { background: #cbd5e1; }

.x-axis { display: flex; gap: 6px; margin-top: 8px; }
.x-label {
  flex: 1;
  text-align: center;
  font-size: clamp(0.62rem, 1vw, 0.72rem);
  color: var(--muted);
}

.tooltip {
  position: absolute;
  background: #0f172a;
  color: #f8fafc;
  font-size: 0.74rem;
  padding: 10px 13px;
  border-radius: 10px;
  pointer-events: none;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 8px 24px rgba(0,0,0,.22);
}
.tip-label { font-weight: 600; margin-bottom: 2px; }
.tip-row   { display: flex; align-items: center; gap: 6px; }

.tip-enter-active, .tip-leave-active { transition: opacity .12s, transform .12s; }
.tip-enter-from, .tip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(6px);
}

/* Top Items */
.item-list  { display: flex; flex-direction: column; gap: 14px; list-style: none; }
.item-row   { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.item-left  { display: flex; align-items: center; gap: 10px; min-width: 0; }

.item-icon-wrap {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: var(--blue-lt);
  color: var(--blue);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.item-name {
  font-size: 0.83rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-orders { font-size: 0.72rem; color: var(--muted); }
.item-right  { min-width: 80px; text-align: right; }
.item-revenue {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
  font-family: 'JetBrains Mono', monospace;
}
.item-bar-bg {
  height: 4px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}
.item-bar-fill {
  height: 100%;
  background: var(--blue);
  border-radius: 99px;
  transition: width .8s cubic-bezier(.4,0,.2,1);
}

.muted { color: var(--muted); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>