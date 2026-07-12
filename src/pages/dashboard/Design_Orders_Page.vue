<template>
  <div class="w-full min-h-full flex flex-col gap-[clamp(14px,2vw,22px)] text-slate-700 font-sans">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 class="text-[clamp(1.2rem,2.5vw,1.75rem)] font-bold tracking-tight text-slate-900">
          Orders
        </h1>
        <p class="text-[clamp(0.75rem,1.2vw,0.85rem)] text-slate-500 mt-0.5">
          Track active tickets, kitchen status, and completed receipts.
        </p>
      </div>

      <div class="relative w-full sm:w-[360px] flex-shrink-0">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search orders, tables, or customers..."
          class="w-full h-[42px] pl-10 pr-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
        />
      </div>
    </div>

    <!-- Stats Grid -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white rounded-lg shadow p-5 min-w-0"
      >
        <div class="flex items-start justify-between mb-3">
          <div
            class="w-8 h-8 rounded-lg grid place-items-center"
            :class="stat.iconBg"
          >
            <svg
              class="w-[17px] h-[17px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="stat.iconColor"
            >
              <path :d="stat.iconPath" />
              <circle
                v-if="stat.iconCircle"
                :cx="stat.iconCircle.cx"
                :cy="stat.iconCircle.cy"
                :r="stat.iconCircle.r"
              />
            </svg>
          </div>
          <span
            class="rounded-full px-2.5 py-1 text-xs font-bold"
            :class="stat.badgeClasses"
          >
            {{ stat.badge }}
          </span>
        </div>
        <div class="text-xs font-bold uppercase tracking-wide text-slate-500">
          {{ stat.label }}
        </div>
        <div class="mt-1 text-[30px] font-extrabold leading-none">
          {{ stat.value }}<span v-if="stat.unit" class="text-sm font-medium ml-1">{{ stat.unit }}</span>
        </div>
        <div class="h-1 mt-4 rounded-full bg-slate-200 overflow-hidden">
          <div
            class="h-full rounded-full"
            :class="stat.barColor"
            :style="{ width: stat.barW }"
          ></div>
        </div>
      </article>
    </section>

    <!-- Orders Table -->
    <section class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Tabs -->
      <div class="flex items-center gap-2 px-5 py-3 border-b border-slate-200 min-h-[60px]">
        <button
          v-for="t in tabs"
          :key="t"
          class="min-w-[86px] h-[38px] rounded-lg text-sm font-bold transition"
          :class="[
            activeTab === t
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
          ]"
          @click="activeTab = t"
        >
          {{ t }}
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-slate-50">
            <tr>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Order ID
              </th>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Customer / Table
              </th>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Items
              </th>
              <th class="h-[52px] px-5 text-center text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Elapsed Time
              </th>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Total
              </th>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Status
              </th>
              <th class="h-[52px] px-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-600 border-b border-slate-200 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="h-[74px] px-5 text-center text-slate-500 border-b border-slate-100">
                No orders found.
              </td>
            </tr>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="hover:bg-slate-50 transition"
            >
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle">
                <span class="text-blue-600 font-extrabold text-sm">{{ order.id }}</span>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-[30px] h-[30px] rounded-full grid place-items-center text-white text-[11px] font-extrabold flex-shrink-0"
                    :style="{ background: order.avatarColor }"
                  >
                    {{ order.initials }}
                  </div>
                  <div>
                    <div class="text-sm font-extrabold text-slate-900 leading-tight">
                      {{ order.customer }}
                    </div>
                    <div class="text-[11px] text-slate-500 mt-0.5">
                      {{ order.tableInfo }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle max-w-[220px]">
                <div>{{ order.itemsPreview }}</div>
                <div v-if="order.moreItems" class="text-blue-600 text-[11px] font-bold mt-0.5">
                  +{{ order.moreItems }} more items
                </div>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle text-center">
                <span
                  class="inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold whitespace-nowrap"
                  :class="elapsedClass(order)"
                >
                  <svg
                    class="w-[11px] h-[11px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {{ order.elapsed }}
                </span>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle">
                <span class="text-sm font-extrabold text-slate-900">{{ order.total }}</span>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle">
                <span
                  class="inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold whitespace-nowrap"
                  :class="statusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="h-[74px] px-5 border-b border-slate-100 align-middle">
                <button
                  class="h-8 px-3 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition"
                  @click="handleAction(order)"
                >
                  {{ order.status === "Delivered" ? "Receipt" : "Update" }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { getOrders } from "@/services/api"; // adjust path to match your project

// ─── Reactive state ──────────────────────────────────────────
const searchQuery = ref("");
const activeTab = ref("All");
const tabs = ["All", "Pending", "Preparing", "Delivered"];
const orders = ref([]);
const isLoading = ref(true);
const errorMsg = ref(null);

// ─── Stats (static) ──────────────────────────────────────────
const stats = [
  {
    label: "Active Orders",
    value: "36",
    badge: "+18%",
    badgeClasses: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    barColor: "bg-blue-600",
    barW: "80%",
    iconPath:
      "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  },
  {
    label: "Avg. Wait Time",
    value: "11.2",
    unit: "min",
    badge: "-5m",
    badgeClasses: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-blue-50",
    iconColor: "text-slate-500",
    barColor: "bg-slate-500",
    barW: "32%",
    iconPath: "M12 6v6l4 2",
    iconCircle: { cx: 12, cy: 12, r: 10 },
  },
  {
    label: "Kitchen Load",
    value: "72",
    unit: "%",
    badge: "Busy",
    badgeClasses: "bg-blue-100 text-blue-600",
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    barColor: "bg-blue-600",
    barW: "72%",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
];

// ─── Fetch orders from API ───────────────────────────────────
async function fetchOrders() {
  isLoading.value = true;
  errorMsg.value = null;
  try {
    const data = await getOrders();
    // map API response -> shape the template expects
    orders.value = data.map((order) => ({
      id: order.id ?? order._id,
      customer: order.customerName ?? order.customer,
      initials: (order.customerName ?? order.customer ?? "")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      avatarColor: order.avatarColor ?? "#2563EB",
      tableInfo: order.tableInfo ?? `Table ${order.tableNumber ?? "-"}`,
      itemsPreview:
        order.items?.slice(0, 2).map((i) => i.name).join(", ") ?? "",
      moreItems: order.items?.length > 2 ? order.items.length - 2 : null,
      elapsed: order.elapsed ?? "00:00",
      total: `$${Number(order.total ?? 0).toFixed(2)}`,
      status: order.status ?? "Pending",
    }));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    errorMsg.value = "Failed to load orders. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchOrders();
});

// ─── Computed: filter + search ──────────────────────────────
const filteredOrders = computed(() => {
  let list = orders.value;
  if (activeTab.value !== "All") {
    list = list.filter((order) => order.status === activeTab.value);
  }
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((order) =>
    [order.customer, order.id, order.tableInfo, order.itemsPreview].some(
      (val) => val.toLowerCase().includes(q)
    )
  );
});

// ─── Helper functions (return Tailwind classes) ─────────────
function elapsedClass(order) {
  if (order.status === "Delivered") return "bg-emerald-100 text-emerald-700";
  const mins = parseInt(order.elapsed.split(":")[0], 10);
  return mins >= 20
    ? "bg-red-100 text-red-600"
    : "bg-slate-100 text-slate-600";
}

function statusClass(status) {
  const map = {
    Preparing: "bg-amber-100 text-amber-800",
    Pending: "bg-blue-100 text-blue-600",
    Delivered: "bg-emerald-100 text-emerald-700",
  };
  return map[status] || "";
}

function handleAction(order) {
  alert(`${order.id} - ${order.customer}`);
}
</script>