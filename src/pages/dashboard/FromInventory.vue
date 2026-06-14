<template>
  <div
    class="min-h-screen px-4 sm:px-6 lg:px-10 py-6 sm:py-8 font-sans"
  >
    <!-- Back Nav -->
    <nav class="mb-5">
      <a
        href="#"
        @click.prevent="handleCancel"
        class="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-blue-500 uppercase hover:opacity-60 transition-opacity"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to Inventory
      </a>
    </nav>

    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7"
    >
      <div>
        <h1
          class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1"
        >
          New Inventory Item
        </h1>
        <p class="text-sm text-slate-500 max-w-md">
          Fill in the details below to add a new ingredient or item to the
          management system.
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <button
          @click="handleCancel"
          class="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-all"
        >
          Cancel
        </button>
        <button
          @click="handleSave"
          :disabled="saving"
          class="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg
            v-if="!saving"
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.5 8.5L6 12L13.5 4.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span
            v-if="saving"
            class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
          />
          {{ saving ? "Saving..." : "Save Item" }}
        </button>
      </div>
    </div>

    <!-- Form Card -->
    <div
      class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 lg:p-9"
    >
      <div
        class="flex flex-col lg:grid lg:grid-cols-[220px_1fr] lg:items-stretch gap-8 lg:gap-12"
      >
        <!-- Photo Upload -->
        <div class="flex flex-col gap-2 lg:h-full">
          <label class="text-sm font-semibold text-slate-700">Item Photo</label>
          <div
            class="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 h-48 sm:h-56 lg:h-auto lg:flex-1 flex items-center justify-center cursor-pointer overflow-hidden transition-all"
            :class="{
              'border-blue-400 bg-blue-50': isDragging,
              'border-solid border-slate-200': previewUrl,
            }"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop"
            @click="$refs.fileInput.click()"
          >
            <img
              v-if="previewUrl"
              :src="previewUrl"
              class="w-full h-full object-cover"
              alt="Preview"
            />
            <div
              v-else
              class="flex flex-col items-center gap-2.5 p-5 text-center"
            >
              <div
                class="w-13 h-13 rounded-xl bg-blue-100 flex items-center justify-center p-3"
              >
                <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
                  <rect
                    x="2"
                    y="6"
                    width="32"
                    height="24"
                    rx="3"
                    stroke="#3B82F6"
                    stroke-width="1.8"
                  />
                  <circle
                    cx="11"
                    cy="14"
                    r="3"
                    stroke="#3B82F6"
                    stroke-width="1.8"
                  />
                  <path
                    d="M2 26L10 18L16 24L22 17L34 26"
                    stroke="#3B82F6"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                  <circle cx="28" cy="10" r="4" fill="#3B82F6" />
                  <path
                    d="M28 8V12M26 10H30"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <p class="text-sm font-semibold text-blue-600">
                Click or drag to upload
              </p>
              <p class="text-xs text-slate-400 leading-relaxed">
                PNG, JPG up to 10MB.<br />High resolution recommended.
              </p>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/png,image/jpeg"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
          <button
            v-if="previewUrl"
            @click.stop="removePhoto"
            class="text-xs font-medium text-red-500 text-left hover:opacity-70 transition-opacity"
          >
            Remove photo
          </button>
        </div>

        <!-- Fields -->
        <div class="flex flex-col gap-5">
          <!-- Item Name -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700"
              >Item Name</label
            >
            <input
              v-model="form.itemName"
              type="text"
              placeholder="e.g. Grass-fed Ribeye Steak"
              class="w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-blue-100"
              :class="
                errors.itemName
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-slate-200 focus:border-blue-400'
              "
            />
            <span v-if="errors.itemName" class="text-xs text-red-500">{{
              errors.itemName
            }}</span>
          </div>

          <!-- SKU + Category -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700">SKU</label>
              <input
                v-model="form.sku"
                type="text"
                placeholder="E.G. MEAT-0042"
                class="px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700"
                >Category</label
              >
              <div class="relative">
                <select
                  v-model="form.category"
                  class="w-full appearance-none px-3.5 py-2.5 pr-9 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                >
                  <option value="" disabled>Select category</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
                <svg
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#6B7280"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Initial Stock + Min Alert -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700"
                >Initial Stock</label
              >
              <div
                class="flex rounded-lg border border-slate-200 overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all"
              >
                <input
                  v-model="form.initialStock"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="flex-1 min-w-0 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none border-none bg-white"
                />
                <select
                  v-model="form.unit"
                  class="px-2.5 py-2.5 border-l border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 outline-none cursor-pointer shrink-0"
                >
                  <option>kg</option>
                  <option>g</option>
                  <option>L</option>
                  <option>pcs</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700"
                >Min. Alert Threshold</label
              >
              <div class="relative">
                <input
                  v-model="form.minAlert"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Set low stock alert"
                  class="w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2"
                  :class="
                    showAlertWarning
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-100 pr-10'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                  "
                />
                <svg
                  v-if="showAlertWarning"
                  class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 2L16.5 15H1.5L9 2Z"
                    stroke="#EF4444"
                    stroke-width="1.6"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 7V10"
                    stroke="#EF4444"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                  <circle cx="9" cy="12.5" r="0.75" fill="#EF4444" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Unit Price + Supplier -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700"
                >Unit Price ($)</label
              >
              <div class="relative">
                <span
                  class="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 pointer-events-none"
                  >$</span
                >
                <input
                  v-model="form.unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  class="w-full pl-7 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700"
                >Supplier</label
              >
              <input
                v-model="form.supplier"
                type="text"
                placeholder="e.g. Artisan Butchery Co."
                class="px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <!-- Description -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-semibold text-slate-700"
              >Item Description</label
            >
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Add detailed notes about the ingredient, storage requirements, or allergen information..."
              class="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-y min-h-[90px]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="opacity-0 translate-y-3"
    >
      <div
        v-if="toast.show"
        class="fixed bottom-5 right-4 sm:bottom-7 sm:right-8 z-50 inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-sm font-medium shadow-lg text-white max-w-xs sm:max-w-none"
        :class="toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'"
      >
        <svg
          v-if="toast.type === 'success'"
          width="17"
          height="17"
          viewBox="0 0 18 18"
          fill="none"
        >
          <circle cx="9" cy="9" r="8" stroke="white" stroke-width="1.6" />
          <path
            d="M5.5 9L7.5 11L12.5 6.5"
            stroke="white"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NewInventoryItem",
  // Emits "close" (cancel / back) and "add" (new item payload),
  // matching what InventoryList.vue listens for: @close, @add
  emits: ["close", "add"],

  data() {
    return {
      saving: false,
      isDragging: false,
      previewUrl: null,
      selectedFile: null,
      form: {
        itemName: "",
        sku: "",
        category: "",
        initialStock: "",
        unit: "kg",
        minAlert: "",
        unitPrice: "",
        supplier: "",
        description: "",
      },
      errors: {},
      categories: [
        "Meat & Poultry",
        "Seafood",
        "Vegetables",
        "Dairy & Eggs",
        "Grains & Pasta",
        "Spices & Herbs",
        "Beverages",
        "Condiments",
        "Other",
      ],
      toast: { show: false, message: "", type: "success" },
    };
  },

  computed: {
    showAlertWarning() {
      return (
        this.form.minAlert !== "" &&
        this.form.initialStock !== "" &&
        parseFloat(this.form.minAlert) > parseFloat(this.form.initialStock)
      );
    },
  },

  methods: {
    handleFileChange(e) {
      const file = e.target.files[0];
      if (file) this.loadFile(file);
    },
    handleDrop(e) {
      this.isDragging = false;
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) this.loadFile(file);
    },
    loadFile(file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removePhoto() {
      this.previewUrl = null;
      this.selectedFile = null;
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
    },
    validate() {
      this.errors = {};
      if (!this.form.itemName.trim())
        this.errors.itemName = "Item name is required.";
      return Object.keys(this.errors).length === 0;
    },
    async handleSave() {
      if (!this.validate()) {
        this.showToast("Please fix the errors before saving.", "error");
        return;
      }
      this.saving = true;
      await new Promise((r) => setTimeout(r, 900));
      this.saving = false;

      // Map this form's fields to the shape InventoryList.vue's
      // handleAddItem() expects (name, sku, category, currentStock, ...)
      const payload = this.toInventoryItem();

      this.showToast("Item saved successfully!", "success");

      // Brief delay so the success toast is visible before closing the form
      setTimeout(() => {
        this.$emit("add", payload);
      }, 400);
    },
    handleCancel() {
      this.$emit("close");
    },
    // Converts this form's data into the inventory row shape used by InventoryList.vue
    toInventoryItem() {
      const stock =
        this.form.initialStock === "" ? 0 : parseFloat(this.form.initialStock);
      const minAlert =
        this.form.minAlert === "" ? 0 : parseFloat(this.form.minAlert);
      const unitPrice =
        this.form.unitPrice === "" ? 0 : parseFloat(this.form.unitPrice);

      return {
        name: this.form.itemName,
        sku: this.form.sku,
        category: this.form.category,
        currentStock: `${stock} ${this.form.unit}`,
        minStock: `${minAlert} ${this.form.unit}`,
        unitPrice,
        // Derive a health status from stock vs. min alert threshold
        health:
          minAlert > 0 && stock <= minAlert
            ? "CRITICAL"
            : minAlert > 0 && stock <= minAlert * 1.5
              ? "WARNING"
              : "HEALTHY",
        photo: this.selectedFile,
        supplier: this.form.supplier,
        description: this.form.description,
      };
    },
    showToast(message, type = "success") {
      this.toast = { show: true, message, type };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },
};
</script>
