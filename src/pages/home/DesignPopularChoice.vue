<script setup>
import { ref, computed, nextTick } from "vue";

const activeCategory = ref("All");
const searchQueries = ref("");
const isMobileSearchOpen = ref(false);
const mobileSearchInput = ref(null);

const categories = ["All", "Starters", "Main Course", "Desserts", "Drinks"];

// Focus input automatically when mobile search bar expands
const toggleMobileSearch = async () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  if (isMobileSearchOpen.value) {
    await nextTick();
    mobileSearchInput.value?.focus();
  } else {
    searchQueries.value = ""; // Clear search when closing
  }
};

// Enhanced Mock Data including category fields
const menuItems = ref([
  {
    id: 1,
    name: "Wagyu Ribeye Steak",
    category: "Main Course",
    tag: "Bestseller",
    description: "Melt-in-your-mouth precision with truffle butter.",
    price: "$85.00",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    name: "Truffle Fettuccine",
    category: "Main Course",
    tag: "",
    description: "Rich, creamy artisanal pasta with shaved wild truffles.",
    price: "$32.00",
    image:
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 3,
    name: "Midnight Orchid",
    category: "Drinks",
    tag: "Signature",
    description: "Botanical gin cocktail infused with butterfly pea flower.",
    price: "$18.00",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 4,
    name: "Pan-Seared Scallops",
    category: "Starters",
    tag: "Fresh",
    description: "Served over a velvety parsnip puree with crispy pancetta.",
    price: "$24.00",
    image:
      "https://images.unsplash.com/photo-1532636875304-0c8fe119ff9e?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 5,
    name: "Heirloom Burrata",
    category: "Starters",
    tag: "Vegetarian",
    description:
      "Blistered tomatoes, aged balsamic glaze, and fresh basil oil.",
    price: "$19.00",
    image:
      "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 6,
    name: "Deconstructed Mille-Feuille",
    category: "Desserts",
    tag: "Chef Choice",
    description:
      "Caramelized puff pastry, Madagascar vanilla bean pastry cream.",
    price: "$16.00",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 7,
    name: "Lava Cake Extravaganza",
    category: "Desserts",
    tag: "Popular",
    description: "70% dark chocolate fondant served with raspberry coulis.",
    price: "$15.00",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
  {
    id: 8,
    name: "Smoked Rosemary Old Fashioned",
    category: "Drinks",
    tag: "",
    description: "Premium bourbon, Angostura bitters, smoked table-side.",
    price: "$21.00",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=500&q=80",
    featured: false,
  },
]);

const filteredItems = computed(() => {
  return menuItems.value.filter(item => {
    const matchesCategory =
      activeCategory.value === "All" || item.category === activeCategory.value;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQueries.value.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(searchQueries.value.toLowerCase());

    return matchesCategory && matchesSearch;
  });
});
</script>

<template>
  <div
    class="min-h-screen bg-white pb-8 font-sans text-slate-900 selection:bg-blue-100">
    <header
      class="sticky top-0 z-50 bg-white shadow-sm transition-shadow duration-300 lg:bg-white/90 lg:backdrop-blur-md">
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 lg:px-8 lg:py-6">
        <h1 class="text-2xl font-bold text-blue-600 lg:text-3xl">LuxeDine</h1>

        <div class="hidden flex-1 justify-center max-w-md lg:flex">
          <div
            class="flex w-full items-center rounded-xl bg-slate-50 px-4 py-2.5 border border-slate-100 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <i class="fas fa-search mr-3 text-slate-400"></i>
            <input
              type="text"
              v-model="searchQueries"
              placeholder="Search for delicacies..."
              class="w-full text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent" />
          </div>
        </div>

        <div class="flex items-center gap-4 lg:gap-5">
          <button
            @click="toggleMobileSearch"
            class="text-xl transition duration-200 active:scale-95 lg:hidden"
            :class="
              isMobileSearchOpen
                ? 'text-blue-600 hover:text-red-600'
                : 'text-blue-600 hover:text-blue-700'
            "
            :aria-label="isMobileSearchOpen ? 'Close search' : 'Open search'">
            <i
              :class="
                isMobileSearchOpen ? 'fas fa-times' : 'fas fa-search'
              "></i>
          </button>

          <button
            class="relative text-xl text-blue-600 transition duration-200 active:scale-95 hover:text-blue-700"
            aria-label="Notifications">
            <i class="fas fa-bell"></i>
            <span
              class="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </div>

      <div
        v-show="isMobileSearchOpen"
        class="border-t border-slate-100 bg-white px-4 py-3 shadow-inner lg:hidden transition-all duration-200">
        <div
          class="flex w-full items-center rounded-xl bg-slate-50 px-4 py-2.5 border border-slate-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <i class="fas fa-search mr-3 text-slate-400"></i>
          <input
            ref="mobileSearchInput"
            type="text"
            v-model="searchQueries"
            placeholder="Search for delicacies..."
            class="w-full text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent" />
          <button
            v-if="searchQueries"
            @click="searchQueries = ''"
            class="text-slate-400 hover:text-slate-600 ml-2">
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 pt-4 lg:px-8">
      <nav class="mb-6 overflow-x-auto no-scrollbar lg:mb-8">
        <div class="flex gap-3 pb-1">
          <button
            v-for="category in categories"
            :key="category"
            @click="activeCategory = category"
            :class="[
              'rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            ]">
            {{ category }}
          </button>
        </div>
      </nav>

      <section>
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900 lg:text-2xl">
            {{ activeCategory }} Choices
          </h2>
          <span
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {{ filteredItems.length }}
            {{ filteredItems.length === 1 ? "item" : "items" }} found
          </span>
        </div>

        <div
          v-if="filteredItems.length === 0"
          class="flex flex-col items-center justify-center py-12 text-slate-400">
          <i class="fas fa-utensils text-4xl mb-3 opacity-50"></i>
          <p class="text-sm">No delicious items match your criteria.</p>
        </div>

        <div v-else class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            :class="[
              'relative flex items-end overflow-hidden rounded-2xl bg-cover bg-center shadow-sm border border-slate-100 transition-all duration-200',
              'h-45 lg:h-65 lg:cursor-pointer lg:hover:-translate-y-1 lg:hover:shadow-blue-100 lg:hover:shadow-xl',
              item.featured && activeCategory === 'All'
                ? 'col-span-2 h-55 lg:col-span-3 lg:h-85'
                : '',
            ]"
            :style="{
              backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.95) 10%, rgba(15,23,42,0.2) 60%), url(${item.image})`,
            }">
            <div class="w-full p-4 text-white">
              <span
                v-if="item.tag"
                class="absolute top-4 left-4 rounded-full bg-blue-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                {{ item.tag }}
              </span>

              <div class="flex flex-col">
                <span
                  class="text-[10px] uppercase font-bold tracking-widest text-blue-300 opacity-90 mb-0.5"
                  v-if="activeCategory === 'All'">
                  {{ item.category }}
                </span>
                <h3 class="font-semibold text-white text-base lg:text-xl">
                  {{ item.name }}
                </h3>
                <p
                  class="text-xs opacity-85 mt-0.5 mb-2 lg:text-sm line-clamp-1 lg:line-clamp-none">
                  {{ item.description }}
                </p>
                <span class="font-bold text-sm lg:text-base">{{
                  item.price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
