<template>
  <div class="min-h-screen font-sans">
    <!-- Add Product Form — replaces the list entirely -->
    <AddProduct v-if="showForm" @close="showForm = false" @add="handleAddProduct" />

    <Update_Product
      v-else-if="showUpdateForm"
      :product="selectedProduct"
      @close="showUpdateForm = false"
      @update="handleUpdateProduct"
    />

    <!-- Product List — only shown when form is hidden -->
    <template v-else>
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Product List</h1>
          <p class="text-xs sm:text-sm text-gray-400 mt-1">
            Manage and track your restaurant's food and beverage stock levels.
          </p>
        </div>
        <button
          @click="showForm = true"
          class="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl transition w-full sm:w-auto"
        >
          <Plus class="w-4 h-4" /> Create Product
        </button>
      </div>

      <!-- Stat Cards - Responsive Grid -->
      <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div class="border border-gray-400 bg-white rounded-xl p-4 sm:p-5">
          <div class="flex justify-between items-start mb-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-xl flex items-center justify-center"
            >
              <ClipboardList class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </div>
            <span class="text-xs sm:text-sm font-semibold text-emerald-500">+4.2%</span>
          </div>
          <p
            class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-medium"
          >
            Total Products
          </p>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {{ products.length }}
          </p>
        </div>

        <div class="border border-gray-400 bg-white rounded-xl p-4 sm:p-5">
          <div class="flex justify-between items-start mb-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-xl flex items-center justify-center"
            >
              <TriangleAlert class="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
            </div>
            <span class="text-xs sm:text-sm font-semibold text-red-400">-2 today</span>
          </div>
          <p
            class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-medium"
          >
            Out of Stock
          </p>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {{ outOfStockCount }}
          </p>
        </div>

        <div
          class="border border-gray-400 bg-white rounded-xl p-4 sm:p-5 sm:col-span-2 lg:col-span-1"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-200 flex items-center justify-center"
            >
              <TrendingUp class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <span class="text-[10px] sm:text-xs text-gray-400 font-medium"
              >High Demand</span
            >
          </div>
          <p
            class="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest font-medium"
          >
            Top Selling Item
          </p>
          <p class="text-lg sm:text-2xl font-bold text-gray-900 mt-1 truncate">
            Wagyu Ribeye
          </p>
        </div>
      </div> -->

      <!-- Table Card - Horizontal Scroll on Mobile -->
      <div class="border border-gray-400 rounded-xl overflow-hidden">
        <!-- Toolbar - Stack on mobile -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 sm:px-5 py-3 bg-white"
        >
          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div
              class="flex items-center bg-gray-100 gap-2 border border-gray-400 rounded-lg px-3 py-2 w-full sm:w-auto"
            >
              <Search class="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                v-model="search"
                type="text"
                placeholder="Search products..."
                class="text-sm text-gray-600 placeholder-gray-400 outline-none w-full sm:w-44 bg-transparent"
              />
            </div>
            <button
              class="flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
            >
              <SlidersHorizontal class="w-4 h-4" /> Filter
            </button>
          </div>
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto"
          >
            <button
              class="flex items-center justify-center gap-2 border border-gray-400 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
            >
              <Download class="w-4 h-4" /> Export
            </button>
            <span class="text-xs sm:text-sm text-gray-600">
              Showing {{ paginated.length }} of {{ filtered.length }} products
            </span>
          </div>
        </div>

        <!-- Responsive Table Container -->
        <div class="overflow-x-auto">
          <table class="w-full border-t border-gray-100 min-w-[640px]">
            <thead>
              <tr class="bg-gray-100 border-t border-gray-400">
                <th
                  class="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest"
                >
                  Product Name
                </th>
                <th
                  class="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden sm:table-cell"
                >
                  Category
                </th>
                <th
                  class="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest"
                >
                  Price
                </th>
                <th
                  class="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest hidden md:table-cell"
                >
                  Stock Status
                </th>
                <th
                  class="text-right px-4 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-widest"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="p in paginated"
                :key="p.sku"
                class="border-t border-b border-gray-400"
              >
                <td class="px-4 sm:px-5 py-3 sm:py-4">
                  <div class="flex items-center gap-2 sm:gap-3">
                    <img
                      :src="p.image"
                      :alt="p.name"
                      class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div class="min-w-0">
                      <p
                        class="text-sm font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-none"
                      >
                        {{ p.name }}
                      </p>
                      <p class="text-xs text-gray-400">SKU: {{ p.sku }}</p>
                    </div>
                  </div>
                </td>
                <td
                  class="px-4 sm:px-5 py-3 sm:py-4 text-sm text-gray-500 hidden sm:table-cell"
                >
                  {{ p.category.name}}
                </td>
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-sm font-semibold text-gray-800">
                  ${{ p.price }}
                </td>
                <td class="px-4 sm:px-5 py-3 sm:py-4 hidden md:table-cell">
                  <span
                    :class="badge(p.status)"
                    class="text-xs font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap"
                  >
                    {{ p.status }}
                  </span>
                </td>
                <td class="px-4 sm:px-5 py-3 sm:py-4 text-right">
                  <div class="flex justify-end gap-2 sm:gap-3 text-sm text-gray-400">
                    <button class="hover:text-blue-500 transition-colors p-1">
                      <Eye class="w-4 h-4" />
                    </button>
                    <button
                      @click="editProduct(p)"
                      class="hover:text-emerald-500 transition-colors p-1"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteProduct(p.sku)"
                      class="hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination - Wrap on mobile -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 sm:px-5 py-4 border-t border-gray-100 bg-gray-100"
        >
          <button
            @click="page > 1 && page--"
            :disabled="page === 1"
            class="flex items-center justify-center gap-1 border border-gray-400 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
          >
            <ChevronLeft class="w-4 h-4" /> Previous
          </button>

          <!-- Pagination numbers - hide on smallest screens -->
          <div class="hidden sm:flex items-center gap-1">
            <button
              v-for="n in Math.min(totalPages, 5)"
              :key="n"
              @click="page = n"
              :class="
                page === n
                  ? 'bg-blue-500 text-white border-emerald-500'
                  : 'text-gray-500 hover:bg-gray-100 border-gray-200'
              "
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-sm font-semibold border transition-colors"
            >
              {{ n }}
            </button>
            <span v-if="totalPages > 5" class="text-gray-400 px-1">...</span>
            <button
              v-if="totalPages > 5"
              @click="page = totalPages"
              :class="
                page === totalPages
                  ? 'bg-blue-500 text-white border-emerald-500'
                  : 'text-gray-500 hover:bg-gray-100 border-gray-200'
              "
              class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-sm font-semibold border transition-colors"
            >
              {{ totalPages }}
            </button>
          </div>

          <!-- Mobile page indicator -->
          <div class="sm:hidden text-sm text-gray-600">
            Page {{ page }} of {{ totalPages }}
          </div>

          <button
            @click="page < totalPages && page++"
            :disabled="page === totalPages"
            class="flex items-center justify-center gap-1 border border-gray-400 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition w-full sm:w-auto"
          >
            Next <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Barcode FAB - Adjusted for mobile -->
      <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <button
          class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition active:scale-95"
        >
          <ScanBarcode class="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </template>
  </div>
</template>
<script setup>
import api from "@/services/api.js";
import { ref, computed, watch, onMounted } from "vue";
import {
  ClipboardList,
  TriangleAlert,
  TrendingUp,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  ScanBarcode,
} from "lucide-vue-next";
import AddProduct from "./AddProduct.vue";
import Update_Product from "./Update_Product.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showForm = ref(false);
const showUpdateForm = ref(false);
const selectedProduct = ref(null);
const search = ref("");
const page = ref(1);
const itemsPerPage = 4;

const products = ref([]);
const fetchProducts = async () => {
  try {
    const res = await api.get("/products");

    // console.log("API RESPONSE:", api);

    // support different backend formats
    products.value = res.data.data || res.data || [];
  } catch (error) {
    console.log(error);
    error.value = "Failed to load products";
  }
};

// ================= ON LOAD =================
onMounted(() => {
  fetchProducts();
});
const outOfStockCount = computed(
  () => products.value.filter((p) => p.status === "OUT OF STOCK").length
);

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return products.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / itemsPerPage))
);

const paginated = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filtered.value.slice(start, start + itemsPerPage);
});

watch(filtered, () => {
  if (page.value > totalPages.value) page.value = 1;
});

const badge = (status) =>
  ({
    "IN STOCK": "bg-emerald-200 text-emerald-700",
    "LOW STOCK": "bg-orange-200 text-red-600",
    "OUT OF STOCK": "bg-red-200 text-red-500",
  }[status] ?? "bg-gray-100 text-gray-500");

const handleAddProduct = (newProduct) => {
  products.value.unshift(newProduct);
  showForm.value = false;
};

const editProduct = (product) => {
  selectedProduct.value = product;
  showUpdateForm.value = true;
};

const handleUpdateProduct = (updatedProduct) => {
  const index = products.value.findIndex((p) => p.sku === selectedProduct.value.sku);
  if (index !== -1) {
    products.value[index] = {
      ...products.value[index],
      ...updatedProduct,
    };
  }
  showUpdateForm.value = false;
  selectedProduct.value = null;
};

const deleteProduct = (sku) => {
  products.value = products.value.filter((p) => p.sku !== sku);
};
</script>
