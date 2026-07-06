<template>
  <div class="min-h-screen font-sans">
    <!-- Header -->
    <div class="mb-7">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-1">
        <div class="flex items-center gap-3 min-w-0">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            Add New Product
          </h1>
        </div>
        <div class="flex gap-2 shrink-0">
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
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            {{ saving ? "Saving..." : "Save Product" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-5 items-start">
      <!-- Left Column -->
      <div class="flex flex-col gap-5 w-full">
        <!-- General Information -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 class="text-base font-bold text-gray-900 mb-6">General Information</h2>

          <div class="mb-5">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >Product Name</label
            >
            <input
              v-model="form.name"
              type="text"
              maxlength="255"
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
              <div
                v-if="loadingCategories"
                class="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400"
              >
                Loading categories...
              </div>

              <select
                v-else
                v-model="form.category_id"
                class="w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none appearance-none transition-all cursor-pointer pr-9"
                :class="[
                  errors.category_id
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100',
                  form.category_id ? 'text-gray-900' : 'text-gray-400',
                ]"
              >
                <option value="" disabled>Select Category</option>
                <option
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.id"
                  class="text-gray-900"
                >
                  {{ cat.name }}
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
            <p v-if="errors.category_id" class="mt-1 text-xs text-red-500">
              {{ errors.category_id }}
            </p>
            <p
              v-if="categories.length === 0 && !loadingCategories"
              class="mt-1 text-xs text-amber-600"
            >
              ⚠️ No categories available. Please add categories first.
            </p>
          </div>
        </div>

        <!-- Inventory Settings -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 class="flex items-center gap-2 text-base font-bold text-gray-900 mb-6">
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
                max="999999"
                class="flex-1 min-w-0 px-3.5 py-2.5 text-sm outline-none"
              />
              <div class="flex flex-col border-l border-gray-200 shrink-0">
                <button
                  @click="form.stock = Math.min(999999, (Number(form.stock) || 0) + 1)"
                  class="flex-1 px-2.5 bg-gray-50 hover:bg-blue-50 hover:text-[#1060FE] text-gray-400 text-[9px] transition-colors"
                >
                  ▲
                </button>
                <button
                  @click="form.stock = Math.max(0, (Number(form.stock) || 0) - 1)"
                  class="flex-1 px-2.5 bg-gray-50 hover:bg-blue-50 hover:text-[#1060FE] text-gray-400 text-[9px] border-t border-gray-200 transition-colors"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-5 w-full">
        <!-- Product Image URL -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 class="text-base font-bold text-gray-900 mb-4">Product Image</h2>
          <div class="mb-4">
            <label class="block text-xs font-semibold text-gray-600 mb-1.5"
              >Image URL</label
            >
            <input
              v-model="form.image"
              type="url"
              placeholder="https://example.com/image.jpg"
              class="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none transition-all focus:border-[#1060FE] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div
            v-if="form.image"
            class="relative rounded-xl border border-gray-200 overflow-hidden"
          >
            <img
              :src="form.image"
              class="w-full h-[180px] lg:h-[280px] object-cover"
              alt="Product preview"
              @error="form.image = ''"
            />
          </div>
          <p v-else class="text-xs text-gray-400 text-center py-8">
            Enter image URL above to preview
          </p>
        </div>

        <!-- Price -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <label class="block text-xs font-semibold text-gray-600 mb-1.5">Price</label>
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
              max="999999.99"
              step="0.01"
              placeholder="0.00"
              class="flex-1 min-w-0 px-3.5 py-2.5 text-sm outline-none placeholder-gray-300"
            />
          </div>
          <p v-if="errors.price" class="mt-1 text-xs text-red-500">
            {{ errors.price }}
          </p>
          <p class="mt-1 text-xs text-gray-400">Maximum price: $999,999.99</p>
        </div>

        <!-- Active Status -->
        <div class="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <label class="block text-xs font-semibold text-gray-600 mb-1.5">Status</label>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-sm font-medium text-gray-700">Active Product</span>
              <p class="text-xs text-gray-400">Visible to customers</p>
            </div>
            <button
              @click="form.is_active = !form.is_active"
              :class="[
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
                form.is_active ? 'bg-[#1060FE]' : 'bg-gray-300',
              ]"
            >
              <span
                :class="[
                  'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
                  form.is_active ? 'translate-x-6' : 'translate-x-1',
                ]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Modal -->
    <div
      v-if="modal.show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div class="text-center">
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            :class="{
              'bg-green-100': modal.type === 'success',
              'bg-red-100': modal.type === 'error',
              'bg-yellow-100': modal.type === 'warning',
            }"
          >
            <svg
              v-if="modal.type === 'success'"
              class="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg
              v-else-if="modal.type === 'error'"
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" stroke-linecap="round" />
            </svg>
            <svg
              v-else
              class="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 9v2M12 15h.01M12 12h.01" stroke-linecap="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          <!-- Title & Message -->
          <h3 class="text-lg font-bold text-gray-900 mb-2">{{ modal.title }}</h3>
          <p class="text-sm text-gray-600 whitespace-pre-line">{{ modal.message }}</p>

          <!-- Button -->
          <div class="mt-6">
            <button
              @click="handleModalConfirm"
              class="w-full px-4 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors"
              :class="{
                'bg-[#1060FE] hover:bg-blue-700': modal.type === 'success',
                'bg-red-500 hover:bg-red-600': modal.type === 'error',
                'bg-yellow-500 hover:bg-yellow-600': modal.type === 'warning',
              }"
            >
              {{ modal.buttonText || "OK" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

export default {
  name: "AddNewProduct",
  emits: ["close", "add"],
  setup(props, { emit }) {
    const router = useRouter();
    const saving = ref(false);
    const categories = ref([]);
    const loadingCategories = ref(true);

    // ✅ Modal
    const modal = reactive({
      show: false,
      type: "",
      title: "",
      message: "",
      buttonText: "OK",
      onConfirm: null,
    });

    const form = reactive({
      name: "",
      description: "",
      category_id: "",
      price: "",
      stock: 0,
      image: "",
      is_active: true,
    });

    const errors = reactive({
      name: "",
      category_id: "",
      price: "",
    });

    // ============================================
    // MODAL HELPERS
    // ============================================
    const showModal = ({ type, title, message, buttonText = "OK", onConfirm = null }) => {
      modal.show = true;
      modal.type = type;
      modal.title = title;
      modal.message = message;
      modal.buttonText = buttonText;
      modal.onConfirm = onConfirm;
    };

    const closeModal = () => {
      modal.show = false;
      modal.onConfirm = null;
    };

    const handleModalConfirm = () => {
      if (modal.onConfirm) {
        modal.onConfirm();
      }
      closeModal();
    };

    // ============================================
    // FETCH CATEGORIES
    // ============================================
    onMounted(async () => {
      await fetchCategories();
    });

    async function fetchCategories() {
      loadingCategories.value = true;
      try {
        const response = await api.get("/categories");
        let categoriesData = [];

        if (Array.isArray(response.data)) {
          categoriesData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          categoriesData = response.data.data;
        } else if (response.data && Array.isArray(response.data.categories)) {
          categoriesData = response.data.categories;
        } else if (response.data && Array.isArray(response.data.results)) {
          categoriesData = response.data.results;
        } else if (response.data && typeof response.data === "object") {
          for (const key in response.data) {
            if (Array.isArray(response.data[key]) && response.data[key].length > 0) {
              if (
                response.data[key][0] &&
                response.data[key][0].id != null &&
                response.data[key][0].name
              ) {
                categoriesData = response.data[key];
                break;
              }
            }
          }
        }

        categories.value = categoriesData
          .filter((cat) => cat && cat.id != null && cat.name)
          .map((cat) => ({ ...cat, id: Number(cat.id) }));
      } catch (error) {
        console.error("Error fetching categories:", error);
        categories.value = [];
      } finally {
        loadingCategories.value = false;
      }
    }

    // ============================================
    // VALIDATION
    // ============================================
    function validate() {
      errors.name = "";
      errors.category_id = "";
      errors.price = "";

      if (!form.name.trim()) {
        errors.name = "Product name is required.";
      } else if (form.name.trim().length > 255) {
        errors.name = "Product name cannot exceed 255 characters.";
      }

      if (
        form.category_id === "" ||
        form.category_id === null ||
        form.category_id === undefined
      ) {
        errors.category_id = "Please select a category.";
      }

      const priceStr = String(form.price ?? "").trim();
      const priceValue = parseFloat(priceStr);

      if (priceStr === "" || isNaN(priceValue) || priceValue < 0) {
        errors.price = "Please enter a valid price.";
      } else if (priceValue > 999999.99) {
        errors.price = "Price cannot exceed $999,999.99.";
      } else if (priceStr.includes(".") && priceStr.split(".")[1]?.length > 2) {
        errors.price = "Price can only have up to 2 decimal places.";
      }

      return !(errors.name || errors.category_id || errors.price);
    }

    // ============================================
    // NAVIGATE TO PRODUCT LIST - FIXED ✅
    // ============================================
    function goToProductList() {
      try {
        // ✅ ប្រើ Route name តាម Router របស់អ្នក
        router.push({ name: "dashboard-product" }).catch((e) => {
          console.error("Navigation by name failed:", e);
          // Fallback: ប្រើ path
          router.push("/dashboard/product").catch((e2) => {
            console.error("Navigation by path failed:", e2);
            window.location.href = "/dashboard/product";
          });
        });
      } catch (e) {
        console.error("Navigation exception:", e);
        window.location.href = "/dashboard/product";
      }
    }

    // ============================================
    // SAVE PRODUCT
    // ============================================
    async function handleSave() {
      if (saving.value) return;

      if (!loadingCategories.value && categories.value.length === 0) {
        showModal({
          type: "warning",
          title: "No Categories Available",
          message: "Please add categories first before creating a product.",
          buttonText: "OK",
        });
        return;
      }

      if (!validate()) {
        await nextTick();
        const firstError = document.querySelector(".border-red-400");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      saving.value = true;

      try {
        const payload = {
          name: form.name.trim(),
          description: form.description?.trim() || null,
          category_id: Number(form.category_id),
          price: parseFloat(form.price),
          stock: Number(form.stock) || 0,
          image: form.image?.trim() || null,
          is_active: !!form.is_active,
        };

        const response = await api.post("/products", payload, { timeout: 15000 });
        const result = response.data;

        saving.value = false;

        // ✅ Show success modal
        showModal({
          type: "success",
          title: "✅ Product Created!",
          message: "Product has been created successfully.",
          buttonText: "Go to Product List",
          onConfirm: () => {
            // Emit events
            emit("add", result);
            resetForm();
            emit("close");

            // Navigate to product list
            setTimeout(() => {
              goToProductList();
            }, 100);
          },
        });
      } catch (error) {
        saving.value = false;
        handleSaveError(error);
      }
    }

    // ============================================
    // ERROR HANDLING
    // ============================================
    function handleSaveError(error) {
      console.error("Error creating product:", error);

      if (!error.response) {
        showModal({
          type: "error",
          title: "Network Error",
          message: error.request
            ? "Please check your internet connection."
            : "Failed to create product. Please try again.",
          buttonText: "OK",
        });
        return;
      }

      const { status, data } = error.response;

      if (status === 422) {
        const validationErrors = data?.errors;
        if (validationErrors && typeof validationErrors === "object") {
          Object.keys(validationErrors).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              const messages = validationErrors[key];
              errors[key] = Array.isArray(messages) ? messages[0] : String(messages);
            }
          });
          const errorMessages = Object.values(validationErrors).flat().join("\n");
          showModal({
            type: "error",
            title: "Validation Error",
            message: errorMessages,
            buttonText: "OK",
          });
        } else {
          showModal({
            type: "error",
            title: "Validation Error",
            message: data?.message || "Please check your input.",
            buttonText: "OK",
          });
        }
        return;
      }

      if (status === 500) {
        const errorMessage = data?.message || "";
        if (errorMessage.includes("Numeric value out of range")) {
          errors.price = "Price is too high. Maximum value is $999,999.99.";
          showModal({
            type: "error",
            title: "Price Error",
            message: "Price is too high. Maximum value is $999,999.99.",
            buttonText: "OK",
          });
        } else if (
          errorMessage.includes("Duplicate entry") ||
          errorMessage.includes("unique")
        ) {
          errors.name = "A product with this name already exists.";
          showModal({
            type: "error",
            title: "Duplicate Product",
            message:
              "A product with this name already exists. Please use a different name.",
            buttonText: "OK",
          });
        } else {
          showModal({
            type: "error",
            title: "Server Error",
            message: errorMessage || "Please try again later.",
            buttonText: "OK",
          });
        }
        return;
      }

      showModal({
        type: "error",
        title: "Failed to Create Product",
        message: data?.message || "Please try again.",
        buttonText: "OK",
      });
    }

    // ============================================
    // RESET FORM
    // ============================================
    function resetForm() {
      Object.assign(form, {
        name: "",
        description: "",
        category_id: "",
        price: "",
        stock: 0,
        image: "",
        is_active: true,
      });
      Object.assign(errors, {
        name: "",
        category_id: "",
        price: "",
      });
    }

    function handleCancel() {
      resetForm();
      emit("close");
    }

    return {
      form,
      errors,
      categories,
      saving,
      loadingCategories,
      modal,
      handleSave,
      handleCancel,
      closeModal,
      handleModalConfirm,
      fetchCategories,
    };
  },
};
</script>
