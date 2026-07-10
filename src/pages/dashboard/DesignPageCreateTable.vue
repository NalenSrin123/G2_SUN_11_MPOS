<template>
  <div class="space-y-6 mx-auto w-full flex flex-col items-center justify-center">
    <div class="w-full">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        Add New Table
      </h1>
      <p class="text-sm text-gray-500 mt-1">
        Register a new physical dining unit to the restaurant floor map.
      </p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full">
      <div v-if="errorMessage" class="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl whitespace-pre-line">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 gap-x-6 gap-y-5">
          <div class="flex flex-col gap-2">
            <label class="text-xs font-bold text-gray-700 tracking-wide">
              Table Number
            </label>
            <input
              v-model.number="form.table_number"
              type="number"
              min="1"
              placeholder="e.g. 5"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition disabled:opacity-50 disabled:bg-gray-50"
              :disabled="isLoading"
              required
            />
          </div>
        </div>

        <hr class="border-gray-200 my-2" />

        <div class="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            @click="$emit('back')"
            class="px-8 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-xl text-sm transition disabled:opacity-50"
            :disabled="isLoading"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            {{ isLoading ? 'Adding...' : 'Add Table' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["back", "submit-success"]);

const form = reactive({
  table_number: null,
});

const isLoading = ref(false);
const errorMessage = ref("");

const handleSubmit = async () => {
  if (isLoading.value) return;

  const parsedNumber = parseInt(form.table_number, 10);
  if (!form.table_number || isNaN(parsedNumber) || parsedNumber < 1) {
    errorMessage.value = "Please enter a valid table number greater than 0.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("https://g2-sun-11-mpos-back-gjyx.onrender.com/api/v1/tables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        table_number: parsedNumber,
      }),
    });

    const data = await response.json().catch(() => null);
    
    // Log response data to check validation messages in your dev tools console
    console.log("Server Response Status:", response.status);
    console.log("Server Response Body Data:", data);

    if (!response.ok) {
      if (response.status === 422 || response.status === 400) {
        // If the backend says what field failed validation, format it nicely
        if (data && data.detail) {
          if (Array.isArray(data.detail)) {
            throw new Error(data.detail.map(err => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join('\n'));
          }
          throw new Error(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
        }
        
        throw new Error(data?.message || data?.error || `The table number might be taken or invalid.`);
      }
      
      throw new Error(data?.message || data?.error || `Server responded with status: ${response.status}`);
    }

    if (data) {
      form.table_number = null;
      emit("submit-success", data);
    }
    
  } catch (error) {
    console.error("Error details:", error);
    errorMessage.value = error.message || "Failed to create table. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>