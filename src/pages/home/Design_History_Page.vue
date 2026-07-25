<template>
  <div
    class="min-h-screen w-full bg-emerald-50 px-4 sm:px-8 py-6 pb-10 relative"
  >
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-6">
      <button class="text-gray-700">
        <ArrowLeftIcon class="w-5 h-5" />
      </button>
      <h1 class="text-emerald-600 font-semibold text-lg">Savoury</h1>
      <button class="text-gray-700">
        <BellIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Header -->
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
        Order History
      </h2>
      <p class="text-sm sm:text-base text-gray-500 mb-6">
        Manage and track your gourmet experiences
      </p>

      <!-- Active order -->
      <div class="flex items-center gap-2 mb-2">
        <p class="text-xs font-semibold text-emerald-600 tracking-wide">
          ACTIVE ORDER
        </p>
        <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
      </div>

      <div
        v-for="order in activeOrders"
        :key="order.id"
        v-if="activeOrders.length"
        class="bg-white border border-gray-100 border-l-4 border-l-emerald-500 rounded-xl p-4 sm:p-6 mb-4 shadow-sm"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-semibold text-gray-900">{{ order.id }}</span>
          <span
            class="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
          >
            {{ order.status }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <UtensilsIcon class="w-4 h-4 text-emerald-600" />
          {{ order.note }}
        </p>
        <div class="flex items-center justify-between gap-3">
          <span class="text-2xl font-bold text-gray-900">
            ${{ order.total.toFixed(2) }}
          </span>
          <button
            class="bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-700 transition whitespace-nowrap"
            @click="$emit('track-order', order.id)"
          >
            Track Order
          </button>
        </div>
      </div>
      <!-- Past orders -->
      <p class="text-xs font-semibold text-gray-500 tracking-wide mb-2">
        PAST ORDERS
      </p>

      <div class="flex flex-col gap-4">
        <div
          v-for="order in pastOrders"
          :key="order.id"
          class="bg-white rounded-xl shadow-sm p-4"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <p class="font-semibold text-gray-900">{{ order.id }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ order.date }}</p>
            </div>
            <span
              class="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              {{ order.status }}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <img
              :src="order.image"
              :alt="order.items"
              class="w-16 h-16 rounded-lg object-cover bg-gray-100 shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-800 leading-snug">
                {{ order.items }}
              </p>
              <p class="text-sm font-semibold text-gray-900 mt-1">
                ${{ order.total.toFixed(2) }}
              </p>
            </div>
            <button
              class="flex items-center justify-center gap-1 border border-emerald-200 text-emerald-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-50 transition shrink-0"
              @click="$emit('reorder', order.id)"
            >
              <RefreshCwIcon class="w-3.5 h-3.5" />
              <span>Reorder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeft as ArrowLeftIcon,
  Bell as BellIcon,
  Utensils as UtensilsIcon,
  RefreshCw as RefreshCwIcon,
} from "lucide-vue-next";

defineEmits(["track-order", "reorder"]);

const activeOrders = [
  {
    id: "#ORD-1024",
    status: "In Progress",
    note: "Preparing your meal",
    total: 32.77,
  },
];

const pastOrders = [
  {
    id: "#ORD-982",
    date: "June 12, 2023",
    status: "Completed",
    items: "Wagyu Sando, Iced Tea",
    total: 45.0,
    image:
      "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=200&h=200&fit=crop",
  },
  {
    id: "#ORD-955",
    date: "June 05, 2023",
    status: "Completed",
    items: "Ribeye Steak, Wine",
    total: 128.0,
    image:
      "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=200&h=200&fit=crop",
  },
  {
    id: "#ORD-1004",
    date: "June 18, 2023",
    status: "Pending",
    items: "Truffle Pasta, Sparkling Water",
    total: 62.5,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=200&fit=crop",
  },
  {
    id: "#ORD-1021",
    date: "June 20, 2023",
    status: "Cancelled",
    items: "Grilled Salmon, Lemonade",
    total: 38.75,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop",
  },
];
</script>
