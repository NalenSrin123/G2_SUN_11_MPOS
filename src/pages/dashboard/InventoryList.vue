<template>
  <!-- Show the New Inventory Item form instead of the dashboard -->
  <FromInventory
    v-if="showForm"
    @close="showForm = false"
    @add="handleAddItem"
  />

  <!-- Inventory dashboard -->
  <div v-else class="min-h-screen bg-[#f8f9fa]  font-sans text-[#4a5568]">
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Real-time tracking for your culinary supplies
        </p>
      </div>
      <button
        @click="showForm = true"
        class="bg-[#5850ec] hover:bg-[#4b43d3] text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Item
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between relative overflow-hidden"
      >
        <div>
          <p
            class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4"
          >
            Total SKUs
          </p>
          <h3 class="text-4xl font-bold text-gray-800 mb-1">1,248</h3>
          <p class="text-xs font-medium text-green-500 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            +12% vs last month
          </p>
        </div>
        <div class="bg-blue-50 text-blue-500 p-3.5 rounded-xl h-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </div>

      <div
        class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between relative overflow-hidden"
      >
        <div>
          <span
            class="absolute top-4 right-20 bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide"
            >Critical</span
          >
          <p
            class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4"
          >
            &nbsp;
          </p>
          <h3 class="text-4xl font-bold text-[#c55147] mb-1">14 Alerts</h3>
          <p class="text-xs font-medium text-gray-500">
            Items below threshold levels
          </p>
        </div>
        <div class="bg-red-50 text-red-500 p-3.5 rounded-xl h-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <div
        class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex justify-between relative overflow-hidden"
      >
        <div class="w-full">
          <p
            class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-right"
          >
            Asset Value
          </p>
          <h3 class="text-4xl font-bold text-gray-800 mb-4">$42,850</h3>

          <div
            class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden flex items-center"
          >
            <div
              class="bg-[#5850ec] h-full rounded-full"
              style="width: 82%"
            ></div>
          </div>
          <div class="flex justify-between items-center mt-1.5">
            <span
              class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
              >Budget Utilization</span
            >
            <span class="text-xs font-semibold text-gray-500">82%</span>
          </div>
        </div>
        <div class="bg-indigo-50 text-indigo-500 p-3.5 rounded-xl h-fit ml-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </div>
    </div>

    <div
      class="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <div
        class="p-5 border-b border-gray-100 bg-[#fcfdfd] flex items-center gap-3"
      >
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wider"
          >Filter By:</span
        >

        <div class="relative">
          <select
            class="appearance-none bg-white border border-gray-200 text-sm text-gray-600 pl-4 pr-10 py-1.5 rounded-xl focus:outline-none focus:border-gray-300 font-medium"
          >
            <option>All Categories</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        <div class="relative">
          <select
            class="appearance-none bg-white border border-gray-200 text-sm text-gray-600 pl-4 pr-10 py-1.5 rounded-xl focus:outline-none focus:border-gray-300 font-medium"
          >
            <option>All Status</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-[#f4f6f8] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100"
            >
              <th class="py-4 px-6">Item Details</th>
              <th class="py-4 px-6">Category</th>
              <th class="py-4 px-6">Current Stock</th>
              <th class="py-4 px-6">Unit Price</th>
              <th class="py-4 px-6">Stock Health</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr
              v-for="item in inventory"
              :key="item.sku"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="py-4 px-6 flex items-center gap-4">
                <div class="p-2.5 rounded-xl bg-gray-100 text-gray-500">
                  <span class="text-xl">{{ item.icon }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-gray-700 text-base">
                    {{ item.name }}
                  </h4>
                  <p class="text-xs text-gray-400 font-medium">
                    SKU: {{ item.sku }}
                  </p>
                </div>
              </td>

              <td class="py-4 px-6 vertical-middle">
                <span
                  :class="[
                    categoryStyles[item.category] ||
                      'bg-gray-100 text-gray-600',
                    'text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider',
                  ]"
                >
                  {{ item.category }}
                </span>
              </td>

              <td class="py-4 px-6">
                <p
                  :class="[
                    item.health === 'CRITICAL'
                      ? 'text-red-500 font-bold'
                      : 'text-gray-700 font-semibold',
                    'text-sm',
                  ]"
                >
                  {{ item.currentStock }}
                </p>
                <p class="text-[11px] text-gray-400 font-medium">
                  Min: {{ item.minStock }}
                </p>
              </td>

              <td class="py-4 px-6 font-semibold text-gray-600">
                ${{ item.unitPrice.toFixed(2) }}
              </td>

              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-16 bg-gray-100 h-2 rounded-full overflow-hidden"
                  >
                    <div
                      :class="[
                        healthStyles[item.health].barColor,
                        'h-full rounded-full',
                      ]"
                      :style="{ width: item.healthPercentage + '%' }"
                    ></div>
                  </div>
                  <span
                    :class="[
                      healthStyles[item.health].textColor,
                      'text-[11px] font-extrabold tracking-wider uppercase',
                    ]"
                  >
                    {{ item.health }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FromInventory from "./FromInventory.vue";

// Custom style maps matching the design language of the image
const categoryStyles = {
  PROTEINS: "bg-[#e0eafc] text-[#4d7cfe]",
  DAIRY: "bg-[#e1f0fe] text-[#3b82f6]",
  PANTRY: "bg-[#f0f4f8] text-[#627d98]",
  PRODUCE: "bg-[#e3f7ed] text-[#24b274]",
};

const healthStyles = {
  HEALTHY: { barColor: "bg-green-500", textColor: "text-green-500" },
  CRITICAL: { barColor: "bg-red-500", textColor: "text-red-500" },
  WARNING: { barColor: "bg-yellow-500", textColor: "text-yellow-500" },
  OPTIMAL: { barColor: "bg-green-500", textColor: "text-green-500" },
};

const inventory = ref([
  {
    name: "Alaskan Salmon",
    sku: "FSH-00293",
    category: "PROTEINS",
    currentStock: "45.0 kg",
    minStock: "20.0 kg",
    unitPrice: 24.5,
    health: "HEALTHY",
    healthPercentage: 75,
    icon: "🐟",
  },
  {
    name: "Grade A Large Eggs",
    sku: "DRY-00142",
    category: "DAIRY",
    currentStock: "12 Units",
    minStock: "50 Units",
    unitPrice: 0.35,
    health: "CRITICAL",
    healthPercentage: 20,
    icon: "🥚",
  },
  {
    name: "Balsamic Vinegar",
    sku: "STO-00981",
    category: "PANTRY",
    currentStock: "8.5 Liters",
    minStock: "5.0 Liters",
    unitPrice: 12.0,
    health: "WARNING",
    healthPercentage: 50,
    icon: "🍾",
  },
  {
    name: "Heirloom Tomatoes",
    sku: "VEG-00512",
    category: "PRODUCE",
    currentStock: "112.0 kg",
    minStock: "30.0 kg",
    unitPrice: 5.2,
    health: "OPTIMAL",
    healthPercentage: 100,
    icon: "🍅",
  },
]);

// Controls visibility of the "Add New Item" modal (FromInventory.vue)
const showForm = ref(false);

// Default icons per category, used when adding a new item
const categoryIcons = {
  PROTEINS: "🥩",
  DAIRY: "🥛",
  PANTRY: "🥫",
  PRODUCE: "🥬",
};

// Health percentage defaults, used when adding a new item
const healthPercentages = {
  HEALTHY: 75,
  CRITICAL: 20,
  WARNING: 50,
  OPTIMAL: 100,
};

// Receives the new item from FromInventory.vue's "add" event
function handleAddItem(item) {
  inventory.value.unshift({
    name: item.name,
    sku: item.sku,
    category: item.category,
    currentStock: item.currentStock,
    minStock: item.minStock,
    unitPrice: item.unitPrice,
    health: item.health,
    healthPercentage: healthPercentages[item.health] ?? 50,
    icon: categoryIcons[item.category] || "📦",
  });
  showForm.value = false;
}
</script>

<style scoped>
/* Optional styling overrides to get precise match to dashboard vibes */
body {
  background-color: #f8f9fa;
}
</style>
