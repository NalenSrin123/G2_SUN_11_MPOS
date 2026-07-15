<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { getProducts } from "../../services/api";

import "swiper/css";
import "swiper/css/pagination";

const router = useRouter();

// Swiper
const modules = [Pagination];

// Data
const items = ["Medium Rare", "Medium", "Medium Well"];
const activeIndex = ref(0);

// Product state
const product = ref(null);
const loading = ref(true);
const error = ref(null);

// Counter
const countNum = ref(1);
const countPlus = () => {
  countNum.value++;
};
const countMinus = () => {
  if (countNum.value > 1) countNum.value--;
};

// Build image url
const productImage = computed(() => {
  if (!product.value || !product.value.image) {
    return "https://i.pinimg.com/736x/31/9a/05/319a05ad3a2868bd0f42bcdfdb4d17ba.jpg";
  }
  return product.value.image;
});

// Fetch products and just show the first one
const fetchProductDetail = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await getProducts();
    const list = res.data ?? res;

    if (!list || list.length === 0) {
      error.value = "No products found.";
      product.value = null;
    } else {
      product.value = list[0];
    }
  } catch (err) {
    console.error("Failed to fetch product detail:", err);
    error.value = "Failed to load product detail.";
  } finally {
    loading.value = false;
  }
};

const goHome = () => {
  router.push("/home");
};

onMounted(() => {
  fetchProductDetail();
});
</script>

<template>
  <!-- Top Navbar -->
  <div
    class="fixed top-0 w-full flex z-50 bg-white h-14 items-center justify-between px-4 shadow-sm"
  >
    <i
      class="fa-solid fa-arrow-left text-blue-500 text-lg cursor-pointer"
      @click="router.back()"
    ></i>
    <h1 class="text-xl font-semibold text-blue-500">Mazarkaberk</h1>
    <i class="fa-regular fa-bell text-lg text-gray-500"></i>
  </div>

  <!-- Loading State -->
  <div
    v-if="loading"
    class="mt-14 min-h-screen flex items-center justify-center"
  >
    <p class="text-gray-500 text-lg">Loading product...</p>
  </div>

  <!-- Error State -->
  <div
    v-else-if="error"
    class="mt-14 min-h-screen flex items-center justify-center"
  >
    <p class="text-red-500 text-lg">{{ error }}</p>
  </div>

  <!-- Main Content -->
  <div v-else class="bg-blue-100/50 mt-14 min-h-screen pb-28">
    <!-- Hero Image -->
    <div class="relative shadow-md h-60 md:h-80 w-full overflow-hidden">
      <img
        class="h-full w-full object-cover"
        :src="productImage"
        :alt="product?.name"
      />
      <div
        class="absolute top-4 right-4 rounded-full text-white px-4 py-1 bg-blue-500 text-sm shadow"
      >
        {{ product?.name }}
      </div>
    </div>

    <!-- Product Info -->
    <div class="mt-5 px-3">
      <h2 class="text-2xl font-bold text-gray-800">{{ product?.name }}</h2>
      <p class="text-gray-500 mt-1">{{ product?.description }}</p>
      <div class="flex items-center justify-between mt-3">
        <span class="text-2xl font-bold text-blue-600"
          >${{ product?.price }}</span
        >
        <span
          class="text-sm px-3 py-1 rounded-full"
          :class="
            product?.stock > 0
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          "
        >
          {{
            product?.stock > 0 ? `${product.stock} in stock` : "Out of stock"
          }}
        </span>
      </div>
    </div>

    <!-- Swiper Options -->
    <div class="mt-5 px-3">
      <Swiper
        :modules="modules"
        :breakpoints="{
          320: { slidesPerView: 2.2, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 20 },
        }"
        class="h-full"
      >
        <SwiperSlide v-for="(item, index) in items" :key="index">
          <button
            @click="activeIndex = index"
            :class="[
              'w-full py-3 rounded-2xl transition-all duration-200 font-medium',
              activeIndex === index
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300',
            ]"
          >
            {{ item }}
          </button>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Special Instructions -->
    <div class="mt-9 px-3 max-w-4xl mx-auto">
      <h1 class="text-2xl font-semibold mb-3 text-gray-700">
        Special Instructions
      </h1>
      <textarea
        class="h-32 w-full border border-blue-400 p-4 rounded-2xl bg-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="E.g. No salt, allergies, or sauce on the side..."
      ></textarea>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div
    class="fixed bottom-0 w-full bg-white flex gap-3 justify-between items-center px-4 py-3 shadow-2xl"
  >
    <div
      class="flex items-center justify-between w-[35%] bg-gray-200 rounded-2xl px-3 py-2 text-lg text-gray-700"
    >
      <button @click="countMinus" class="px-2 font-bold">-</button>
      <span class="font-semibold">{{ countNum }}</span>
      <button @click="countPlus" class="px-2 font-bold">+</button>
    </div>
    <button
      class="w-[60%] bg-blue-700 hover:bg-blue-800 text-white rounded-2xl py-3 font-medium flex items-center justify-center gap-2"
    >
      <i class="fa-solid fa-cart-shopping"></i>
      Add to Cart
    </button>
  </div>
</template>
