<script setup>
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { ShoppingCart } from "lucide-vue-next";

const router = useRouter();

/* ------------------------------------------------------------------ */
/* Header / Popular Choices state (from DesignPopularChoice.vue)       */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Main Menu state (converted from MenuPage.vue Options API)          */
/* ------------------------------------------------------------------ */
const menus = ref([
  {
    id: 1,
    name: "Seared Atlantic Salmon",
    description:
      "Crispy skin salmon, citrus quinoa, asparagus, and saffron sauce.",
    price: 28.0,
    image:
      "https://i.pinimg.com/736x/09/15/d6/0915d6bce8a0c6dcd6c5990b68d7f79c.jpg",
  },
  {
    id: 2,
    name: "Garden Zenith Bowl",
    description:
      "Avocado, heirloom tomatoes, roasted seeds and tahini dressing.",
    price: 22.0,
    image:
      "https://i.pinimg.com/736x/eb/61/e4/eb61e4f1005f16ec9a5c522d10374d85.jpg",
  },
  {
    id: 3,
    name: "The Luxe Burger",
    description: "Wagyu beef, aged cheddar, gold leaf fries and truffle aioli.",
    price: 35.0,
    image:
      "https://i.pinimg.com/736x/9e/23/db/9e23db5ce9f76ae8407beddfdc4ebb6a.jpg",
  },
]);

/* ------------------------------------------------------------------ */
/* Cart state                                                          */
/* ------------------------------------------------------------------ */
const cart = ref([]);

const addToCart = item => {
  const existing = cart.value.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.value.push({ ...item, qty: 1 });
  }
};

const cartCount = computed(() =>
  cart.value.reduce((total, c) => total + c.qty, 0),
);

const cartTotal = computed(() =>
  cart.value.reduce((total, c) => total + Number(c.price) * c.qty, 0),
);

const viewOrder = () => {
  router.push({ name: "cart" });
};
// for product detail page
const goToProductDetail = item => {
  router.push(`/product-detail`);
};
</script>

<template>
  <div
    class="min-h-screen bg-white pb-24 font-sans text-slate-900 selection:bg-blue-100">
    <!-- ================= HEADER ================= -->
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

    <!-- ================= BODY ================= -->
    <main class="mx-auto max-w-6xl px-4 pt-4 lg:px-8">
      <!-- ---- Category filter nav ---- -->
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

      <!-- ---- Popular Choices section ---- -->
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
            @click="goToProductDetail(item)"
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

      <!-- ---- Main Menu section ---- -->
      <section class="mt-10">
        <h2
          class="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
          Main Menu
        </h2>

        <div
          
          v-for="item in menus"
          :key="item.id"
          class="bg-white rounded-2xl p-4 mb-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md">
          <div class="flex items-center justify-between relative">
            <!-- Left Section -->
            <div class="flex gap-3 md:gap-5" @click="goToProductDetail(item)">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-32 h-32 rounded-xl object-cover shrink-0" />

              <div class="flex flex-col justify-between">
                <div>
                  <h3
                    class="font-semibold text-base md:text-lg leading-6 max-w-xs">
                    {{ item.name }}
                  </h3>
                  <p class="text-gray-500 text-sm md:text-base line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>

                <!-- Price -->
                <p class="text-green-800 text-lg md:text-xl font-bold mt-2">
                  ${{ item.price }}.00
                </p>
              </div>
            </div>

            <!-- Add Button -->
            <button
              @click="addToCart(item)"
              class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-800 text-white text-2xl flex items-center justify-center hover:bg-green-700 transition absolute right-0 bottom-0">
              +
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- ================= VIEW ORDER BAR ================= -->
    <button
      @click="viewOrder"
      class="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl bg-emerald-800 px-5 py-4 text-white shadow-lg transition active:scale-[0.98] lg:max-w-lg">
      <span class="flex items-center gap-3">
        <span class="relative">
          <ShoppingCart class="h-5 w-5" />
          <span
            class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
            {{ cartCount }}
          </span>
        </span>
        <span class="text-sm font-semibold lg:text-base">View your order</span>
      </span>
      <span class="text-sm font-bold lg:text-base"
        >${{ cartTotal.toFixed(2) }}</span
      >
    </button>
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
