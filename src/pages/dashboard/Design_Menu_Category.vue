<template>
  <div class="min-h-screen font-sans">
    <div v-if="showForm">
      <Design_New_Category
        :category="selectedCategory"
        @close="closeForm"
        @add="handleCategoryCreated"
        @update="handleCategoryUpdated"
      />
    </div>

    <div v-else>
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 lg:mb-8">
        <div>
          <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Menu Categories</h1>
          <p class="text-sm sm:text-base text-slate-500 mt-1">
            Organize your restaurant offerings into logical groups for easier ordering and reporting.
          </p>
        </div>
        <button
          @click="openCreateForm"
          class="btn-primary w-full sm:w-auto justify-center sm:justify-start"
        >
          <span class="text-lg">+</span> Create Category
        </button>
      </div>

      <!-- Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Total Categories</p>
          <div class="flex flex-wrap items-baseline justify-between gap-2 mt-1">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">{{ totalCategories }}</span>
            <span class="text-xs sm:text-sm text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">+2</span>
          </div>
        </div>

        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Total Active Items</p>
          <div class="flex flex-wrap items-baseline justify-between gap-2 mt-1">
            <span class="text-2xl sm:text-3xl font-bold text-slate-900">{{ totalItems }}</span>
            <span class="text-xs sm:text-sm text-slate-400">Avg 12.3/cat</span>
          </div>
        </div>

        <div class="card group">
          <p class="text-xs sm:text-sm text-slate-500">Most Popular</p>
          <div class="flex flex-wrap items-center gap-2 mt-1">
            <span class="text-base sm:text-lg lg:text-xl font-bold text-slate-900 truncate">Main Course</span>
            <span class="text-[10px] sm:text-xs font-semibold bg-orange-500 text-white px-2 py-0.5 rounded-full">HOT</span>
          </div>
        </div>

        <div class="card group flex justify-between items-center">
          <div>
            <p class="text-xs sm:text-sm text-slate-500">Inventory Health</p>
            <span class="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 block">94%</span>
          </div>
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-base sm:text-lg transition-all group-hover:scale-110 group-hover:bg-emerald-100">
            📊
          </div>
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <!-- Toolbar -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 sm:px-5 py-3 bg-slate-50/80 border-b border-slate-200">
          <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span class="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wide bg-slate-200/50 px-2 py-0.5 rounded">ACTIVE MENU</span>
            <button
              @click="showFilter = !showFilter"
              class="text-xs font-medium text-slate-600 border border-slate-300 rounded-md px-2.5 py-1 bg-white hover:bg-slate-50 transition-colors"
            >
              {{ showFilter ? "✕ Hide" : "🔍 Filter" }}
            </button>
            <transition name="fade">
              <input
                v-if="showFilter"
                v-model="searchQuery"
                type="text"
                placeholder="Search category name..."
                class="filter-input flex-1 sm:w-48"
                autofocus
              />
            </transition>
          </div>
          <span class="text-xs text-slate-400 w-full sm:w-auto text-left sm:text-right">
            Showing {{ startIdx + 1 }}-{{ endIdx }} of {{ filteredCategories.length }}
          </span>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm min-w-125">
            <thead>
              <tr class="text-left text-slate-500 border-b border-slate-100 bg-slate-50/30">
                <th class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm">Category</th>
                <th class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm hidden md:table-cell">Description</th>
                <th class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm text-center sm:text-left">Items</th>
                <th class="px-4 sm:px-5 py-3 font-semibold text-xs sm:text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cat in pagedCategories"
                :key="cat.id"
                class="table-row group transition-colors"
              >
                <!-- Category Name -->
                <td class="px-4 sm:px-5 py-3 sm:py-4">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <div class="icon-tile w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
                      <component :is="cat.icon" :size="16" class="sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span class="font-semibold text-slate-900 text-sm sm:text-base break-words">{{ cat.name }}</span>
                  </div>
                </td>

                <!-- Description -->
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-slate-500 text-xs sm:text-sm hidden md:table-cell">
                  <span class="line-clamp-2">{{ cat.description }}</span>
                </td>

                <!-- Items Count -->
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-center sm:text-left">
                  <span class="inline-flex items-center justify-center min-w-[3rem] px-2 py-0.5 bg-slate-100 rounded-full text-xs sm:text-sm font-semibold text-slate-700">
                    {{ cat.items }}
                  </span>
                </td>

                <td class="px-4 sm:px-5 py-3 sm:py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      @click="editCategory(cat)"
                      class="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      @click="handleDelete(cat.id)"
                      class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:bg-red-100 transition"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredCategories.length === 0">
                <td colspan="4" class="px-4 sm:px-5 py-12 text-center">
                  <div class="text-slate-400">
                    <span class="text-4xl opacity-50">🔍</span>
                    <p class="mt-2 text-sm">No categories found matching "{{ searchQuery }}"</p>
                    <button
                      @click="searchQuery = ''; showFilter = false;"
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

        <!-- Pagination -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-5 py-3 border-t border-slate-100 bg-slate-50/30">
          <span class="text-xs text-slate-400 order-2 sm:order-1">
            Showing
            <span class="font-medium text-slate-600">{{ startIdx + 1 }}</span> to
            <span class="font-medium text-slate-600">{{ endIdx }}</span> of
            <span class="font-medium text-slate-600">{{ filteredCategories.length }}</span>
            categories
          </span>

          <div class="flex gap-1 order-1 sm:order-2 flex-wrap justify-center">
            <button @click="page = Math.max(1, page - 1)" :disabled="page === 1" class="page-btn">
              <span class="hidden sm:inline">‹ Prev</span>
              <span class="sm:hidden">‹</span>
            </button>

            <button v-if="totalPages > 5 && page > 3" @click="page = 1" :class="['page-btn', { active: page === 1 }]">1</button>
            <span v-if="totalPages > 5 && page > 3" class="px-1 text-slate-300">...</span>

            <button
              v-for="p in visiblePages"
              :key="p"
              @click="page = p"
              :class="['page-btn', { active: page === p }]"
            >{{ p }}</button>

            <span v-if="totalPages > 5 && page < totalPages - 2" class="px-1 text-slate-300">...</span>
            <button v-if="totalPages > 5 && page < totalPages - 2" @click="page = totalPages" :class="['page-btn', { active: page === totalPages }]">{{ totalPages }}</button>

            <button @click="page = Math.min(totalPages, page + 1)" :disabled="page === totalPages" class="page-btn">
              <span class="hidden sm:inline">Next ›</span>
              <span class="sm:hidden">›</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Quick Stats Bar -->
      <div class="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 sm:hidden">
        <div class="flex justify-between items-center text-xs text-slate-500">
          <div class="text-center flex-1">
            <span class="block font-bold text-slate-800">{{ totalCategories }}</span>
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
import { ref, computed, watch, onMounted , onBeforeUnmount} from "vue";
import api, { deleteCategory } from "@/services/api";

// Import Icons
import {
  Soup, Beef, IceCreamBowl, Wine, Sandwich,
  Salad, Coffee, Pizza, Baby, Star, UtensilsCrossed,
} from "lucide-vue-next";
import Design_New_Category from "./Design_New_Category.vue";

// fetch api

const getIconComponent = (name) => {
  if (!name) return UtensilsCrossed;
  return iconMap[name.toLowerCase()] || UtensilsCrossed;
};

// Component reactive state variables
const categories = ref([]);
const isLoading = ref(false);
const page = ref(1);
const perPage = 5;
const showFilter = ref(false);
const searchQuery = ref("");
const showForm = ref(false);
const selectedCategory = ref(null);

const closeForm = () => {
  showForm.value = false;
  selectedCategory.value = null;
};

const openCreateForm = () => {
  selectedCategory.value = null;
  showForm.value = true;
};

const refreshCategories = async () => {
  await fetchCategories();
};

const handleDelete = async (id) => {
  if (!window.confirm("Delete this category?")) return;

  try {
    await deleteCategory(id);
    categories.value = categories.value.filter((c) => c.id !== id);
    if (page.value > totalPages.value) page.value = totalPages.value;
    await refreshCategories();
  } catch (error) {
    alert("Delete failed");
  }
};

// 2. Network Endpoint Request Handling Logic
const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/categories", {
      params: {
        // Only append query value if text data is present in input element
        search: searchQuery.value.trim() || undefined,
      },
    });
    if (response.data && response.data.success) {
      categories.value = response.data.data;
    }
  } catch (error) {
    console.error("Error connecting to server categories route structural model endpoint:", error);
  } finally {
    isLoading.value = false;
  }
};

// Mount component actions lifecycle
onMounted(() => {
  fetchCategories();
});

// Pagination Computeds
// Computed properties
const filteredCategories = computed(() =>
  categories.value.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCategories.value.length / perPage))
);
const startIdx = computed(() => (page.value - 1) * perPage);
const endIdx   = computed(() =>
  Math.min(startIdx.value + perPage, filteredCategories.value.length)
);
const pagedCategories = computed(() =>
  filteredCategories.value.slice(startIdx.value, endIdx.value)
);

const totalCategories = computed(() => categories.value.length);
const totalItems      = computed(() =>
  categories.value.reduce((sum, c) => sum + c.items, 0)
);

const visiblePages = computed(() => {
  const total   = totalPages.value;
  const current = page.value;
  const delta   = window.innerWidth < 640 ? 1 : 2;

  if (total <= 1) return [1];
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const start = Math.max(2, current - delta);
  const end   = Math.min(total - 1, current + delta);
  const range = [];
  for (let i = start; i <= end; i++) range.push(i);

  const result = [1, ...range];
  if (!result.includes(total)) result.push(total);
  return result;
});

// Watch to reset page when search changes
watch(searchQuery, () => {
  page.value = 1;
  fetchCategories();
});

const handleCategoryCreated = (newCategory) => {
  const cat = newCategory?.data ?? newCategory;

  if (!cat?.name) return;

  closeForm();
  fetchCategories();
};

const editCategory = (cat) => {
  selectedCategory.value = { ...cat };
  showForm.value = true;
};

const handleCategoryUpdated = () => {
  closeForm();
  fetchCategories();
};
</script>

<style scoped>
/* ── Card ── */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s ease;
}
@media (max-width: 640px) { .card { padding: 0.875rem; } }
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,.05);
  transform: translateY(-2px);
  border-color: #cbd5e1;
}

/* ── Primary button ── */
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
.btn-primary:hover  { background-color: #1d4ed8; transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }

/* ── Icon tile ── */
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
.table-row:hover .icon-tile { background-color: #dbeafe; transform: scale(1.05); }

/* ── Table row ── */
.table-row { border-bottom: 1px solid #f1f5f9; transition: background-color 0.15s ease; }
.table-row:hover { background-color: #fafbff; }

/* ── Pagination button ── */
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
  .page-btn { min-width: 1.75rem; height: 1.75rem; font-size: 0.75rem; padding: 0 0.375rem; }
}
.page-btn:disabled         { opacity: 0.4; cursor: not-allowed; }
.page-btn:hover:not(:disabled) { background-color: #eff6ff; border-color: #bfdbfe; color: #2563eb; }
.page-btn.active           { background-color: #2563eb; border-color: #2563eb; color: #ffffff; }

/* ── Filter input ── */
.filter-input {
  font-size: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  padding: 0.375rem 0.625rem;
  transition: all 0.15s ease;
  background-color: white;
}
.filter-input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }

/* ── Utilities ── */
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade transition animation styles */
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
