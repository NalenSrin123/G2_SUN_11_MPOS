<template>
  <h2 class="text-xl font-bold text-gray-800">System Status</h2>

  <div class="space-y-4">
    <div class="p-4 bg-slate-50/70 border border-slate-100 rounded-xl">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs font-bold tracking-wider text-blue-900"
          >STORAGE USAGE</span
        >
        <span class="text-sm font-bold text-blue-600"
          >{{ system.storage }}%</span
        >
      </div>
      <div class="w-full bg-gray-200/70 h-2.5 rounded-full overflow-hidden">
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          :style="{ width: system.storage + '%' }"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div
        class="p-4 border border-gray-100 rounded-xl text-center bg-white shadow-xs"
      >
        <span class="block text-xs font-bold tracking-wider text-gray-500 mb-1"
          >UPTIME</span
        >
        <span class="text-lg font-bold text-blue-950/90"
          >{{ system.uptime }}%</span
        >
      </div>

      <div
        class="p-4 border border-gray-100 rounded-xl text-center bg-white shadow-xs"
      >
        <span class="block text-xs font-bold tracking-wider text-gray-500 mb-1"
          >VERSION</span
        >
        <span class="text-lg font-bold text-gray-700"
          >v{{ system.version }}</span
        >
      </div>
    </div>

    <hr class="border-gray-100 my-2" />

    <button
      @click="handleSignOut"
      type="button"
      class="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors py-1 focus:outline-none"
    >
      <i class="fas fa-sign-out-alt"></i>
      <span>Sign Out of All Sessions</span>
    </button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Reactive state containing exact metrics from screenshot
const system = reactive({
  storage: 82,
  uptime: 99.9,
  version: "4.2.0",
});

const handleSignOut = () => {
  console.log("Clearing active user sessions...");
};
</script>
