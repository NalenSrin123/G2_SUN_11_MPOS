<template>
  <div class="min-h-screen font-sans">
    <!-- Header -->
    <div class="mb-7">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-1">
        <div class="flex items-center gap-3 min-w-0">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            Update Product
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
                  @click="form.stock = Math.min(999999, form.stock + 1)"
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
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import api from "../../services/api";

export default {
  name: "UpdateProduct",
  props: {
    // Pass the whole product object selected from the list.
    // (productId kept for backwards compatibility / optional API fallback fetch)
    product: {
      type: Object,
      default: null,
    },
    productId: {
      type: [String, Number],
      default: null,
    },
  },
  emits: ["close", "update"],
  setup(props, { emit }) {
    const saving = ref(false);
    const categories = ref([]);
    const loadingCategories = ref(true);

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

    // Keep a reference to the original record's identifier so we know
    // which product to update on save.
    const originalId = ref(null);

    onMounted(async () => {
      await fetchCategories();
      loadProductIntoForm();
    });

    // If the parent swaps which product is being edited while this
    // component stays mounted, refresh the form.
    watch(
      () => props.product,
      () => loadProductIntoForm(),
    );

    function loadProductIntoForm() {
      const p = props.product;
      if (!p) return;

      // Update strictly by id.
      originalId.value = p.id ?? props.productId ?? null;

      form.name = p.name ?? "";
      form.description = p.description ?? "";
      form.price = p.price !== undefined && p.price !== null ? String(p.price) : "";
      form.stock = p.stock !== undefined && p.stock !== null ? Number(p.stock) : 0;
      form.image = p.image ?? "";

      // is_active may come as a boolean, or be inferred from a status string
      if (typeof p.is_active === "boolean") {
        form.is_active = p.is_active;
      } else if (p.status) {
        form.is_active = p.status !== "OUT OF STOCK";
      } else {
        form.is_active = true;
      }

      // category_id may already be present, or we may only have a
      // category *name* (e.g. from mock/list data) that needs matching
      // against the loaded categories list.
      if (p.category_id) {
        form.category_id = p.category_id;
      } else if (p.category) {
        matchCategoryByName(p.category);
      } else {
        form.category_id = "";
      }
    }

    function matchCategoryByName(categoryName) {
      const match = categories.value.find(
        (c) => c.name?.toLowerCase() === categoryName.toLowerCase(),
      );
      form.category_id = match ? match.id : "";
    }

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
                response.data[key][0].id &&
                response.data[key][0].name
              ) {
                categoriesData = response.data[key];
                break;
              }
            }
          }
        }

        categoriesData = categoriesData.filter((cat) => cat.id && cat.name);
        categories.value = categoriesData;

        // If the product's category came in as a name (not an id) and
        // categories only just finished loading, resolve it now.
        if (!form.category_id && props.product?.category) {
          matchCategoryByName(props.product.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        categories.value = [];
      } finally {
        loadingCategories.value = false;
      }
    }

    function validate() {
      errors.name = "";
      errors.category_id = "";
      errors.price = "";

      if (!form.name.trim()) {
        errors.name = "Product name is required.";
      } else if (form.name.trim().length > 255) {
        errors.name = "Product name cannot exceed 255 characters.";
      }

      if (!form.category_id) {
        errors.category_id = "Please select a category.";
      }

      const priceValue = parseFloat(form.price);
      if (form.price === "" || isNaN(priceValue) || priceValue < 0) {
        errors.price = "Please enter a valid price.";
      } else if (priceValue > 999999.99) {
        errors.price = "Price cannot exceed $999,999.99.";
      } else if (String(form.price).includes(".") && String(form.price).split(".")[1]?.length > 2) {
        errors.price = "Price can only have up to 2 decimal places.";
      }

      return !(errors.name || errors.category_id || errors.price);
    }

    async function handleSave() {
      if (categories.value.length === 0 && !loadingCategories.value) {
        alert("⚠️ No categories available. Please add categories first.");
        return;
      }

      if (!validate()) {
        const firstError = document.querySelector(".border-red-400");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      if (!originalId.value) {
        alert("❌ Missing product id — cannot update.");
        return;
      }

      saving.value = true;

      try {
        const payload = {
          name: form.name.trim(),
          description: form.description.trim() || null,
          category_id: Number(form.category_id),
          price: parseFloat(form.price),
          stock: Number(form.stock) || 0,
          image: form.image.trim() || null,
          is_active: form.is_active,
        };

        // Update strictly by id: PUT /products/{id}
        const response = await api.put(`/products/${originalId.value}`, payload);
        const result = response.data;

        alert("✅ Product updated successfully!");
        emit("update", result?.data ?? result ?? payload);
      } catch (error) {
        console.error("❌ Error updating product:", error);

        if (error.response) {
          if (error.response.status === 422) {
            const validationErrors = error.response.data.errors;
            if (validationErrors) {
              Object.keys(validationErrors).forEach((key) => {
                if (errors.hasOwnProperty(key)) {
                  errors[key] = validationErrors[key][0];
                }
              });
              const errorMessages = Object.values(validationErrors).flat().join("\n");
              alert(`❌ Validation Error:\n${errorMessages}`);
            }
          } else if (error.response.status === 500) {
            const errorMessage = error.response.data.message || "";
            if (errorMessage.includes("Numeric value out of range")) {
              errors.price = "Price is too high. Maximum value is $999,999.99.";
              alert("❌ Price is too high. Maximum value is $999,999.99.");
            } else if (
              errorMessage.includes("Duplicate entry") ||
              errorMessage.includes("unique")
            ) {
              errors.name = "A product with this name already exists.";
              alert("❌ A product with this name already exists.");
            } else {
              alert(`❌ Server error: ${errorMessage || "Please try again later."}`);
            }
          } else {
            alert(
              `❌ Failed to update product: ${
                error.response.data.message || "Server error"
              }`,
            );
          }
        } else if (error.request) {
          alert("❌ Network error. Please check your connection.");
        } else {
          alert("❌ Failed to update product. Please try again.");
        }
      } finally {
        saving.value = false;
      }
    }

    function handleCancel() {
      emit("close");
    }

    return {
      form,
      errors,
      categories,
      saving,
      loadingCategories,
      handleSave,
      handleCancel,
    };
  },
};
</script>