<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Menu Categories</h1>
        <p class="text-slate-500 mt-1">Organize your restaurant offerings into logical groups for easier ordering and reporting.</p>
      </div>
      <button class="btn-primary">
        <span class="text-lg">+</span> Create Category
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="card">
        <p class="text-sm text-slate-500">Total Categories</p>
        <div class="flex items-baseline gap-2 mt-1">
          <span class="text-3xl font-bold text-slate-900">{{ totalCategories }}</span>
          <span class="text-sm text-blue-600 font-medium">+2 this month</span>
        </div>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Total Active Items</p>
        <div class="flex items-baseline gap-2 mt-1">
          <span class="text-3xl font-bold text-slate-900">{{ totalItems }}</span>
          <span class="text-sm text-slate-400">Avg 12.3/cat</span>
        </div>
      </div>
      <div class="card">
        <p class="text-sm text-slate-500">Most Popular</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-xl font-bold text-slate-900">Main Course</span>
          <span class="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded">HOT</span>
        </div>
      </div>
      <div class="card flex justify-between items-center">
        <div>
          <p class="text-sm text-slate-500">Inventory Health</p>
          <span class="text-3xl font-bold text-slate-900 mt-1 block">94%</span>
        </div>
        <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">📊</div>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="flex justify-between items-center px-5 py-3 bg-slate-50 border-b border-slate-200">
        <div class="flex items-center gap-3">
          <span class="text-xs font-semibold text-slate-500 tracking-wide">ACTIVE MENU</span>
          <button @click="showFilter = !showFilter" class="text-xs font-medium text-slate-600 border border-slate-300 rounded-md px-2 py-1 bg-white">Filter</button>
          <input
            v-if="showFilter"
            v-model="searchQuery"
            type="text"
            placeholder="Search category name..."
            class="filter-input"
            @input="page = 1"
          />
        </div>
        <span class="text-xs text-slate-400">Displaying {{ startIdx + 1 }}-{{ endIdx }} of {{ filteredCategories.length }}</span>
      </div>

      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-slate-500 border-b border-slate-100">
            <th class="px-5 py-3 font-medium">Category Name ↓</th>
            <th class="px-5 py-3 font-medium">Description</th>
            <th class="px-5 py-3 font-medium">Items</th>
            <th class="px-5 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in pagedCategories" :key="cat.name" class="table-row">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="icon-tile">
                <component :is="cat.icon" :size="20" />
              </div>
                <span class="font-semibold text-slate-900">{{ cat.name }}</span>
              </div>
            </td>
            <td class="px-5 py-4 text-slate-500">{{ cat.description }}</td>
            <td class="px-5 py-4 font-medium text-slate-700">{{ cat.items }} items</td>
            <td class="px-5 py-4 text-slate-400">•••</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center px-5 py-3 border-t border-slate-100 text-sm">
        <span class="text-slate-400">Showing {{ startIdx + 1 }} to {{ endIdx }} of {{ filteredCategories.length }} categories</span>
        <div class="flex gap-1">
          <button @click="page = Math.max(1, page - 1)" class="page-btn">‹</button>
          <button
            v-for="p in totalPages"
            :key="p"
            @click="page = p"
            :class="['page-btn', { active: page === p }]"
          >{{ p }}</button>
          <button @click="page = Math.min(totalPages, page + 1)" class="page-btn">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Soup, Beef, IceCreamBowl, Wine, Sandwich, Salad, Coffee, Pizza, Baby, Star, UtensilsCrossed } from 'lucide-vue-next'

const categories = ref([
  { name: 'Appetizers', icon: UtensilsCrossed, description: 'Small plates and snacks to start the meal, including tapas', items: 18 },
  { name: 'Main Course', icon: Beef, description: 'Hearty signature dishes, steaks, pasta, and sea-to-table', items: 42 },
  { name: 'Desserts', icon: IceCreamBowl, description: 'Handcrafted sweets, artisanal gelatos, and seasonal fruit', items: 12 },
  { name: 'Beverages', icon: Wine, description: 'Craft cocktails, local wines, organic juices, and premium', items: 24 },
  { name: 'Lunch Specials', icon: Sandwich, description: 'Daily rotating lunch items available from 11 AM to 3 PM.', items: 6 },
  { name: 'Soups & Salads', icon: Salad, description: 'Fresh greens and warm broths for a light start', items: 10 },
  { name: 'Breakfast', icon: Coffee, description: 'Morning favorites served until 11 AM', items: 14 },
  { name: 'Sides', icon: Soup, description: 'Perfect accompaniments to any main dish', items: 8 },
  { name: 'Kids Menu', icon: Baby, description: 'Smaller portions for younger guests', items: 7 },
  { name: 'Pizza', icon: Pizza, description: 'Wood-fired pizzas with house-made dough', items: 9 },
  { name: 'Sandwiches', icon: Sandwich, description: 'Hearty handhelds with artisan bread', items: 11 },
  { name: 'Specials', icon: Star, description: 'Chef curated rotating seasonal specials', items: 5 },
])

const page = ref(1)
const perPage = 5
const showFilter = ref(false)
const searchQuery = ref('')

const filteredCategories = computed(() =>
  categories.value.filter(c =>
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / perPage))
const startIdx = computed(() => (page.value - 1) * perPage)
const endIdx = computed(() => Math.min(startIdx.value + perPage, filteredCategories.value.length))
const pagedCategories = computed(() => filteredCategories.value.slice(startIdx.value, endIdx.value))

const totalCategories = computed(() => categories.value.length)
const totalItems = computed(() => categories.value.reduce((sum, c) => sum + c.items, 0))
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
  transform: translateY(-2px);
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: background-color 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}
.btn-primary:active {
  transform: translateY(0);
}

.icon-tile {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  background-color: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.2s ease;
}
.table-row:hover .icon-tile {
  background-color: #dbeafe;
  transform: scale(1.08);
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background-color 0.15s ease;
}
.table-row:hover {
  background-color: #f8fafc;
}

.page-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  color: #475569;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.page-btn:hover {
  background-color: #eff6ff;
  border-color: #bfdbfe;
  color: #2563eb;
}
.page-btn.active {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.filter-input {
  font-size: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.filter-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
</style>