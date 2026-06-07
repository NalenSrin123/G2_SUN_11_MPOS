<template>
  <div class="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 font-sans">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-gray-400 mb-4">
      <span class="hover:text-[#1060FE] cursor-pointer">Inventory</span>
      <span>›</span>
      <span class="hover:text-[#1060FE] cursor-pointer">Products</span>
      <span>›</span>
      <span class="text-gray-700 font-medium">Add New</span>
    </nav>

    <!-- Header -->
    <div class="mb-7">
      <!-- Row 1: Back + Title -->
      <div class="flex items-center gap-3 mb-3">
        <button
          @click="$emit('back')"
          class="flex items-center gap-1.5 text-[#1060FE] text-sm font-medium hover:underline whitespace-nowrap shrink-0"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M5 12l7-7M5 12l7 7" />
          </svg>
          Back to List
        </button>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
          Add New Product
        </h1>
      </div>
      <!-- Row 2: Actions (full-width on mobile, right-aligned) -->
      <div class="flex gap-2 sm:hidden">
        <button
          @click="handleCancel"
          class="flex-1 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:border-[#1060FE] hover:text-[#1060FE] transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleSave"
          :disabled="saving"
          class="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white bg-[#1060FE] rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          <svg
            v-if="saving"
            class="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          {{ saving ? "Saving..." : "Save Product" }}
        </button>
      </div>
      <!-- Desktop actions: inline with title row (override) -->
      <div
        class="hidden sm:flex sm:absolute sm:top-6 sm:right-6 lg:right-8 gap-2"
      >
        <button
          @click="handleCancel"
          class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:border-[#1060FE] hover:text-[#1060FE] transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleSave"
          :disabled="saving"
          class="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#1060FE] rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors whitespace-nowrap"
        >
          <svg
            v-if="saving"
            class="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          {{ saving ? "Saving..." : "Save Product" }}
        </button>
      </div>
    </div>

    <!-- Body -->
    <div
      class="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-5 items-start"
    >
      <!-- Left Column -->
      <div class="flex flex-col gap-5 w-full">
        <!-- General Information -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 class="text-base font-bold text-gray-900 mb-6">
            General Information
          </h2>

          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >Product Name</label
            >
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g. Wagyu Beef Burger"
              class="w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none transition-all placeholder-gray-300"
              :class="
                errors.name
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100'
              "
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500">
              {{ errors.name }}
            </p>
          </div>

          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >Description</label
            >
            <textarea
              v-model="form.description"
              placeholder="Briefly describe the product ingredients and features..."
              rows="5"
              class="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none resize-y transition-all placeholder-gray-300 focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100"
            ></textarea>
          </div>

          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >Category</label
            >
            <div class="relative">
              <select
                v-model="form.category"
                class="w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none appearance-none transition-all cursor-pointer pr-9"
                :class="[
                  errors.category
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100',
                  form.category ? 'text-gray-900' : 'text-gray-400',
                ]"
              >
                <option value="" disabled>Select Category</option>
                <option
                  v-for="cat in categories"
                  :key="cat"
                  :value="cat"
                  class="text-gray-900"
                >
                  {{ cat }}
                </option>
              </select>
              <svg
                class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <p v-if="errors.category" class="mt-1 text-xs text-red-500">
              {{ errors.category }}
            </p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >SKU</label
            >
            <input
              v-model="form.sku"
              type="text"
              placeholder="RP-00123"
              class="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-all placeholder-gray-300 focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <!-- Inventory Settings -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2
            class="flex items-center gap-2 text-base font-bold text-gray-900 mb-6"
          >
            <svg
              class="w-[18px] h-[18px] text-[#1060FE] shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Inventory Settings
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5"
                >Stock Quantity</label
              >
              <div
                class="flex border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#1060FE] focus-within:ring-2 focus-within:ring-blue-100 transition-all"
              >
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  class="flex-1 min-w-0 px-3.5 py-2.5 text-sm outline-none"
                />
                <div class="flex flex-col border-l border-gray-200 shrink-0">
                  <button
                    @click="form.stock++"
                    class="flex-1 px-2.5 bg-gray-50 hover:bg-blue-50 hover:text-[#1060FE] text-gray-400 text-[9px] transition-colors"
                  >
                    ▲
                  </button>
                  <button
                    @click="form.stock = Math.max(0, form.stock - 1)"
                    class="flex-1 px-2.5 bg-gray-50 hover:bg-blue-50 hover:text-[#1060FE] text-gray-400 text-[9px] border-t border-gray-200 transition-colors"
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5"
                >Low Stock Alert Threshold</label
              >
              <input
                v-model.number="form.threshold"
                type="number"
                min="0"
                class="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-all focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100"
              />
              <p class="mt-1.5 text-xs text-gray-400">
                We'll notify you when stock falls below this level.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-5 w-full">
        <!-- Product Image -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 class="text-base font-bold text-gray-900 mb-4">Product Image</h2>
          <div
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop"
            @click="$refs.fileInput.click()"
            class="relative rounded-xl border-2 border-dashed min-h-[180px] lg:min-h-[480px] flex items-center justify-center cursor-pointer overflow-hidden transition-all"
            :class="
              isDragging
                ? 'border-[#1060FE] bg-blue-50'
                : 'border-gray-200 hover:border-[#1060FE] hover:bg-blue-50/40'
            "
          >
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="w-full h-[180px] lg:h-[480px] object-cover"
            />
            <div v-else class="text-center p-6">
              <div
                class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3"
              >
                <svg
                  class="w-6 h-6 text-[#1060FE]"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  viewBox="0 0 24 24"
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
                </svg>
              </div>
              <p class="text-sm font-semibold text-gray-800 mb-1">
                Click or drag to upload
              </p>
              <p class="text-xs text-gray-400">PNG, JPG or WEBP (Max 5MB)</p>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFile"
              class="hidden"
            />
          </div>
          <button
            v-if="imagePreview"
            @click="imagePreview = null"
            class="mt-3 w-full py-2 text-xs font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            Remove Image
          </button>
        </div>

        <!-- Price -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <label class="block text-xs font-semibold text-gray-600 mb-1.5"
            >Price</label
          >
          <div
            class="flex items-center border rounded-lg overflow-hidden transition-all"
            :class="
              errors.price
                ? 'border-red-400 ring-2 ring-red-100'
                : 'border-gray-200 focus-within:border-[#1060FE] focus-within:ring-2 focus-within:ring-blue-100'
            "
          >
            <span
              class="px-3.5 py-2.5 bg-gray-50 border-r border-gray-200 text-sm font-semibold text-gray-500 shrink-0"
              >$</span
            >
            <input
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="flex-1 min-w-0 px-3.5 py-2.5 text-sm outline-none placeholder-gray-300"
            />
          </div>
          <p v-if="errors.price" class="mt-1 text-xs text-red-500">
            {{ errors.price }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "AddNewProduct",
  emits: ["back", "save"],
  setup(props, { emit }) {
    const saving = ref(false);
    const isDragging = ref(false);
    const imagePreview = ref(null);
    const fileInput = ref(null);
    const categories = [
      "Burgers",
      "Beverages",
      "Sides",
      "Desserts",
      "Salads",
      "Specials",
    ];
    const form = reactive({
      name: "",
      description: "",
      category: "",
      sku: "",
      stock: 0,
      threshold: 5,
      price: "",
    });
    const errors = reactive({ name: "", category: "", price: "" });

    function validate() {
      errors.name = form.name.trim() ? "" : "Product name is required.";
      errors.category = form.category ? "" : "Please select a category.";
      errors.price =
        form.price !== "" && Number(form.price) >= 0
          ? ""
          : "Please enter a valid price.";
      return !errors.name && !errors.category && !errors.price;
    }

    async function handleSave() {
      if (!validate()) return;
      saving.value = true;
      await new Promise((r) => setTimeout(r, 1200));
      saving.value = false;
      emit("save", { ...form, image: imagePreview.value });
    }

    function handleCancel() {
      Object.assign(form, {
        name: "",
        description: "",
        category: "",
        sku: "",
        stock: 0,
        threshold: 5,
        price: "",
      });
      imagePreview.value = null;
      Object.assign(errors, { name: "", category: "", price: "" });
    }

    function handleFile(e) {
      const f = e.target.files[0];
      if (f) loadImage(f);
    }
    function handleDrop(e) {
      isDragging.value = false;
      const f = e.dataTransfer.files[0];
      if (f?.type.startsWith("image/")) loadImage(f);
    }
    function loadImage(file) {
      const r = new FileReader();
      r.onload = (e) => {
        imagePreview.value = e.target.result;
      };
      r.readAsDataURL(file);
    }

    return {
      form,
      errors,
      categories,
      saving,
      isDragging,
      imagePreview,
      fileInput,
      handleSave,
      handleCancel,
      handleFile,
      handleDrop,
    };
  },
};
</script>
