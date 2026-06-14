<template>
  <div class="flex items-center space-x-1">
    <div
      class="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600"
    >
      <i class="fas fa-bell text-lg"></i>
    </div>
    <h2 class="text-xl font-bold text-gray-800">Alert Settings</h2>
  </div>

  <div class="space-y-1">
    <div class="flex items-start justify-between">
      <div class="pr-4">
        <h3 class="font-semibold text-gray-800">New Orders</h3>
        <p class="mt-1 text-sm text-gray-500 leading-relaxed">
          Real-time push notifications for incoming guest orders.
        </p>
      </div>
      <button
        @click="settings.newOrders = !settings.newOrders"
        type="button"
        :class="settings.newOrders ? 'bg-blue-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
      >
        <span
          :class="settings.newOrders ? 'translate-x-5' : 'translate-x-0'"
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        />
      </button>
    </div>

    <div class="flex items-start justify-between">
      <div class="pr-4">
        <h3 class="font-semibold text-gray-800">Low Stock Alerts</h3>
        <p class="mt-1 text-sm text-gray-500 leading-relaxed">
          Critical warnings when inventory dips below 15%.
        </p>
      </div>
      <button
        @click="settings.lowStock = !settings.lowStock"
        type="button"
        :class="settings.lowStock ? 'bg-blue-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
      >
        <span
          :class="settings.lowStock ? 'translate-x-5' : 'translate-x-0'"
          class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        />
      </button>
    </div>

    <div class="flex items-start justify-between">
      <div class="pr-4">
        <h3 class="font-semibold text-gray-800">System Reports</h3>
        <p class="mt-1 text-sm text-gray-500 leading-relaxed">
          Weekly analytical digests sent to admin email.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const settings = reactive({
  newOrders: true,
  lowStock: true,
});
</script>
