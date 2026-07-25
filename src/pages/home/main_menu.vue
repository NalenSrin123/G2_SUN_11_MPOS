
<!-- <script setup>
import DesignPopularChoice from './DesignPopularChoice.vue'
</script> -->
<template>
  <!-- Call the Pupolar choice -->


  <div class="w-full flex justify-center bg-gray-200 min-h-screen">
    <div class="w-full max-w-md md:max-w-2xl lg:max-w-4xl p-4 md:p-6">
      <!-- Title -->
      <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">
        Main Menu
      </h1>

      <!-- Menu List -->
      <div
        v-for="item in menus"
        :key="item.id"
        class="bg-white rounded-2xl p-4 mb-5 shadow-sm">
        <div class="flex items-center justify-between relative">
          <!-- Left Section -->
          <div class="flex gap-3 md:gap-5">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-32 h-32 rounded-xl object-cover shrink-0" />

            <div class="flex flex-col justify-between">
              <div>
                <h2
                  class="font-semibold text-base md:text-lg leading-6 max-w-xs">
                  {{ item.name }}
                </h2>

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
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuPage",

  data() {
    return {
      menus: [
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
          description:
            "Wagyu beef, aged cheddar, gold leaf fries and truffle aioli.",
          price: 35.0,
          image:
            "https://i.pinimg.com/736x/9e/23/db/9e23db5ce9f76ae8407beddfdc4ebb6a.jpg",
        },
      ],
    };
  },

  methods: {
    addToCart(item) {
      alert(`${item.name} added to cart`);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
</style>
