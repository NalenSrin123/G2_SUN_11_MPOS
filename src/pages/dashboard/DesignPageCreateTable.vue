<template>
  <div class="space-y-6 max-w-5xl mx-auto w-full flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
    
    <div class=" w-full">
      <button 
        @click="$emit('back')" 
        class="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition mb-3"
      >
        <span>←</span> Back to List
      </button>
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Add New Table</h1>
      <p class="text-sm text-gray-500 mt-1">
        Register a new physical dining unit to the restaurant floor map.
      </p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-700 tracking-wide">
              Table Number/Name
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Table 42"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              required
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-700 tracking-wide">
              Capacity (Pax)
            </label>
            <div class="relative">
              <input
                v-model.number="form.capacity"
                type="number"
                min="1"
                placeholder="2"
                class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                required
              />
              <Users 
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                :size="16" 
              />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-700 tracking-wide">
              Location
            </label>
            <select
              v-model="form.zone"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition appearance-none cursor-pointer"
            >
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-700 tracking-wide">
              Initial Status
            </label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition appearance-none cursor-pointer"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>

        </div>

        <hr class="border-gray-200 my-2" />

        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            @click="$emit('back')"
            class="px-8 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl text-sm transition"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            class="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition shadow-sm"
          >
            Add Table
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Users } from 'lucide-vue-next';

const emit = defineEmits(['back', 'submit']);

const form = ref({
  name: '',
  capacity: 2,
  zone: 'Indoor', // Adjusted fallback option default to sync with updated list
  status: 'Available'
});

const handleSubmit = () => {
  emit('submit', { ...form.value });
};
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}
</style>