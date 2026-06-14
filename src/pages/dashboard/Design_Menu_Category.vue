<template>
  <div class="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
    <!-- Show Form when showForm is true, otherwise show Categories -->
    <div v-if="showForm">
      <design_-new_-category
        @close="showForm = false"
        @add="handleAddProduct"
      />
    </div>

    <!-- Categories View (hidden when form is shown) -->
    <div v-else>
      <!-- Header - Responsive stacking -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 lg:mb-8"
      >
        <div>
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
            Menu Categories
          </h1>
          <p class="text-sm sm:text-base text-slate-500 mt-1">
            Organize your restaurant offerings into logical groups for easier
            ordering and reporting.
          </p>
        </div>
        <button
          @click="showForm = true"
          class="btn-primary w-full sm:w-auto justify-center sm:justify-start"
        >
          <span class="text-lg">+</span> Create Category
        </button>
      </div>

      <!-- Stat Cards - Fully responsive grid (1, 2, 4 columns) -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8"
      >
        <!-- Total Categories -->
        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Total Categories</p>
          <div class="flex flex-wrap items-baseline justify-between gap-2 mt-1">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">{{
              totalCategories
            }}</span>
            <span
              class="text-xs sm:text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full"
              >+2</span
            >
          </div>
        </div>

        <!-- Total Items -->
        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Total Active Items</p>
          <div class="flex flex-wrap items-baseline justify-between gap-2 mt-1">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">{{
              totalItems
            }}</span>
            <span class="text-xs sm:text-sm text-slate-400">Avg 12.3/cat</span>
          </div>
        </div>

        <!-- Most Popular -->
        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Most Popular</p>
          <div class="flex flex-wrap items-center gap-2 mt-1">
            <span
              class="text-base sm:text-lg lg:text-xl font-bold text-slate-900 truncate"
              >Main Course</span
            >
            <span
              class="text-[10px] sm:text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full"
              >HOT</span
            >
          </div>
        </div>

        <!-- Inventory Health -->
        <div class="card group flex justify-between items-center">
          <div>
            <p class="text-xs sm:text-sm text-slate-500">Inventory Health</p>
            <span
              class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 block"
              >94%</span
            >
          </div>
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-base sm:text-lg transition-all group-hover:scale-110 group-hover:bg-emerald-100"
          >
            📊
          </div>
        </div>
      </div>

      <!-- Main Table Card -->
      <div
        class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
      >
        <!-- Toolbar - Responsive stacking -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 sm:px-5 py-3 bg-slate-50/80 border-b border-slate-200"
        >
          <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span
              class="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide bg-slate-200/50 px-2 py-0.5 rounded"
              >ACTIVE MENU</span
            >

            <!-- Filter Toggle Button -->
            <button
              @click="showFilter = !showFilter"
              class="text-xs font-medium text-slate-600 border border-slate-300 rounded-md px-2.5 py-1 bg-white hover:bg-slate-50 transition-colors"
            >
              {{ showFilter ? "✕ Hide" : "🔍 Filter" }}
            </button>

            <!-- Search Input - Conditionally shown -->
            <transition name="fade">
              <input
                v-if="showFilter"
                v-model="searchQuery"
                type="text"
                placeholder="Search category name..."
                class="filter-input flex-1 sm:w-48"
                @input="page = 1"
                autofocus
              />
            </transition>
          </div>

          <span
            class="text-xs text-slate-400 w-full sm:w-auto text-left sm:text-right"
          >
            Showing {{ startIdx + 1 }}-{{ endIdx }} of
            {{ filteredCategories.length }}
          </span>
        </div>

        <!-- Responsive Table - Horizontal scroll on mobile -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm min-w-[500px]">
            <thead>
              <tr
                class="text-left text-slate-500 border-b border-slate-100 bg-slate-50/30"
              >
                <th class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm">
                  Category
                </th>
                <th
                  class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm hidden md:table-cell"
                >
                  Description
                </th>
                <th
                  class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm text-center sm:text-left"
                >
                  Items
                </th>
                <th
                  class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm text-right"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cat in pagedCategories"
                :key="cat.name"
                class="table-row group transition-colors"
              >
                <!-- Category Name with Icon -->
                <td class="px-4 sm:px-5 py-3 sm:py-4">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div class="icon-tile w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
                      <component
                        :is="cat.icon"
                        :size="16"
                        class="sm:w-[18px] sm:h-[18px]"
                      />
                    </div>
                    <span
                      class="font-semibold text-slate-900 text-sm sm:text-base break-words"
                      >{{ cat.name }}</span
                    >
                  </div>
                </td>

                <!-- Description - Hidden on mobile -->
                <td
                  class="px-4 sm:px-5 py-3 sm:py-4 text-slate-500 text-xs sm:text-sm hidden md:table-cell"
                >
                  <span class="line-clamp-2">{{ cat.description }}</span>
                </td>

                <!-- Items Count -->
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-center sm:text-left">
                  <span
                    class="inline-flex items-center justify-center min-w-[3rem] px-2 py-0.5 bg-slate-100 rounded-full text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    {{ cat.items }}
                  </span>
                </td>

                <!-- Actions Menu -->
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-right">
                  <button
                    class="action-dots p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <span
                      class="text-slate-400 group-hover:text-slate-600 text-lg leading-none"
                      >⋮</span
                    >
                  </button>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredCategories.length === 0">
                <td colspan="4" class="px-4 sm:px-5 py-12 text-center">
                  <div class="text-slate-400">
                    <span class="text-4xl opacity-50">🔍</span>
                    <p class="mt-2 text-sm">
                      No categories found matching "{{ searchQuery }}"
                    </p>
                    <button
                      @click="
                        searchQuery = '';
                        showFilter = false;
                      "
                      class="mt-2 text-xs text-blue-500 hover:text-blue-600 underline"
                    >
                      Clear search
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination - Fully responsive -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/30"
        >
          <!-- Info text -->
          <span class="text-xs text-slate-400 order-2 sm:order-1">
            Showing
            <span class="font-medium text-slate-600">{{ startIdx + 1 }}</span>
            to <span class="font-medium text-slate-600">{{ endIdx }}</span> of
            <span class="font-medium text-slate-600">{{
              filteredCategories.length
            }}</span>
            categories
          </span>

          <!-- Pagination Controls -->
          <div class="flex gap-1 order-1 sm:order-2 flex-wrap justify-center">
            <!-- Previous Button -->
            <button
              @click="page = Math.max(1, page - 1)"
              :disabled="page === 1"
              class="page-btn"
              aria-label="Previous page"
            >
              <span class="hidden sm:inline">‹ Prev</span>
              <span class="sm:hidden">‹</span>
            </button>

            <!-- First page (if far) -->
            <button
              v-if="totalPages > 5 && page > 3"
              @click="page = 1"
              :class="['page-btn', { active: page === 1 }]"
            >
              1
            </button>
            <span v-if="totalPages > 5 && page > 3" class="px-1 text-slate-300"
              >...</span
            >

            <!-- Page numbers (dynamic range) -->
            <button
              v-for="p in visiblePages"
              :key="p"
              @click="page = p"
              :class="['page-btn', { active: page === p }]"
            >
              {{ p }}
            </button>

            <!-- Last page (if far) -->
            <span
              v-if="totalPages > 5 && page < totalPages - 2"
              class="px-1 text-slate-300"
              >...</span
            >
            <button
              v-if="totalPages > 5 && page < totalPages - 2"
              @click="page = totalPages"
              :class="['page-btn', { active: page === totalPages }]"
            >
              {{ totalPages }}
            </button>

            <!-- Next Button -->
            <button
              @click="page = Math.min(totalPages, page + 1)"
              :disabled="page === totalPages"
              class="page-btn"
              aria-label="Next page"
            >
              <span class="hidden sm:inline">Next ›</span>
              <span class="sm:hidden">›</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Quick Stats Bar (visible only on small screens) -->
      <div
        class="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 sm:hidden"
      >
        <div class="flex justify-between items-center text-xs text-slate-500">
          <div class="text-center flex-1">
            <span class="block font-bold text-slate-800">{{
              totalCategories
            }}</span>
            <span>Categories</span>
          </div>
          <div class="w-px h-6 bg-slate-200"></div>
          <div class="text-center flex-1">
            <span class="block font-bold text-slate-800">{{ totalItems }}</span>
            <span>Total Items</span>
          </div>
          <div class="w-px h-6 bg-slate-200"></div>
          <div class="text-center flex-1">
            <span class="block font-bold text-emerald-600">94%</span>
            <span>Health</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Soup,
  Beef,
  IceCreamBowl,
  Wine,
  Sandwich,
  Salad,
  Coffee,
  Pizza,
  Baby,
  Star,
  UtensilsCrossed,
} from "lucide-vue-next";

// Category data
const categories = ref([
  {
    name: "Appetizers",
    icon: UtensilsCrossed,
    description:
      "Small plates and snacks to start the meal, including tapas, bruschetta, and shareable bites",
    items: 18,
  },
  {
    name: "Main Course",
    icon: Beef,
    description:
      "Hearty signature dishes, steaks, pasta, and sea-to-table specialties",
    items: 42,
  },
  {
    name: "Desserts",
    icon: IceCreamBowl,
    description:
      "Handcrafted sweets, artisanal gelatos, and seasonal fruit selections",
    items: 12,
  },
  {
    name: "Beverages",
    icon: Wine,
    description:
      "Craft cocktails, local wines, organic juices, and premium spirits",
    items: 24,
  },
  {
    name: "Lunch Specials",
    icon: Sandwich,
    description: "Daily rotating lunch items available from 11 AM to 3 PM",
    items: 6,
  },
  {
    name: "Soups & Salads",
    icon: Salad,
    description: "Fresh greens and warm broths for a light and healthy start",
    items: 10,
  },
  {
    name: "Breakfast",
    icon: Coffee,
    description:
      "Morning favorites served until 11 AM, including eggs, pancakes, and more",
    items: 14,
  },
  {
    name: "Sides",
    icon: Soup,
    description: "Perfect accompaniments to any main dish",
    items: 8,
  },
  {
    name: "Kids Menu",
    icon: Baby,
    description:
      "Smaller portions for younger guests, with fun and healthy options",
    items: 7,
  },
  {
    name: "Pizza",
    icon: Pizza,
    description: "Wood-fired pizzas with house-made dough and fresh toppings",
    items: 9,
  },
  {
    name: "Sandwiches",
    icon: Sandwich,
    description: "Hearty handhelds with artisan bread and premium fillings",
    items: 11,
  },
  {
    name: "Specials",
    icon: Star,
    description: "Chef curated rotating seasonal specials",
    items: 5,
  },
]);

// Reactive state
const page = ref(1);
const perPage = 5;
const showFilter = ref(false);
const searchQuery = ref("");
const showForm = ref(false);

// Computed properties
const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCategories.value.length / perPage)),
);
const startIdx = computed(() => (page.value - 1) * perPage);
const endIdx = computed(() =>
  Math.min(startIdx.value + perPage, filteredCategories.value.length),
);
const pagedCategories = computed(() =>
  filteredCategories.value.slice(startIdx.value, endIdx.value),
);

const totalCategories = computed(() => categories.value.length);
const totalItems = computed(() =>
  categories.value.reduce((sum, c) => sum + c.items, 0),
);

// Visible page numbers for pagination (responsive)
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = page.value;
  const delta = window.innerWidth < 640 ? 1 : 2;

  const range = [];
  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  if (total <= 1) return [1];
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const result = [1, ...range];
  if (!result.includes(total)) result.push(total);
  return result;
});

// Watch to reset page when search changes
import { watch } from "vue";
import Design_New_Category from "./Design_New_Category.vue";

watch(searchQuery, () => {
  page.value = 1;
});

// Function to handle adding a new category
const handleAddProduct = (newCategory) => {
  categories.value.push({
    name: newCategory.name,
    icon: UtensilsCrossed,
    description: "New category added",
    items: 0,
  });
  showForm.value = false;
};
</script>

<style scoped>
/* Card Styles */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

@media (max-width: 640px) {
  .card {
    padding: 0.875rem;
  }
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  border-color: #cbd5e1;
}

/* Button Primary */
.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Icon Tile */
.icon-tile {
  border-radius: 0.5rem;
  background-color: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.table-row:hover .icon-tile {
  background-color: #dbeafe;
  transform: scale(1.05);
}

/* Table Row */
.table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;
}

.table-row:hover {
  background-color: #fafbff;
}

/* Action Dots */
.action-dots {
  cursor: pointer;
}

/* Page Button */
.page-btn {
  min-width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  font-size: 0.813rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  color: #475569;
  transition: all 0.15s ease;
  background-color: white;
  cursor: pointer;
  padding: 0 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 640px) {
  .page-btn {
    min-width: 1.75rem;
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.375rem;
  }
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn:hover:not(:disabled) {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
}

.page-btn.active {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #ffffff;
}

/* Filter Input */
.filter-input {
  font-size: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  padding: 0.375rem 0.625rem;
  transition: all 0.15s ease;
  background-color: white;
}

.filter-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
