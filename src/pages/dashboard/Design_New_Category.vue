<template>
  <div class="new-category-modal">
    <!-- Card -->
    <div class="card">
      <!-- Header with close button -->
      <div class="card-top">
        <div class="header-with-close">
          <div>
            <h1 class="card-title">
              {{ isEditing ? "Edit category" : "Create new category" }}
            </h1>
            <p class="card-subtitle">
              Define a menu category to organize your restaurant offerings and
              improve kitchen workflow.
            </p>
          </div>
          <button
            class="close-modal-btn"
            @click="handleCancel"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="card-body">
        <!-- Category Name -->
        <div class="field">
          <label class="field-label" for="category-name">Category name</label>
          <input
            id="category-name"
            v-model="categoryName"
            type="text"
            class="text-input"
            placeholder="e.g., Seasonal Entrées"
            autocomplete="off"
          />
          <p class="field-hint">
            This name will appear on your menu and in kitchen reports.
          </p>
        </div>

        <!-- Description -->
        <div class="field">
          <label class="field-label" for="category-description"
            >Description</label
          >
          <textarea
            id="category-description"
            v-model="description"
            class="text-input textarea"
            placeholder="e.g., Fresh, locally sourced seasonal dishes"
            rows="3"
          ></textarea>
          <p class="field-hint">
            Optional description for internal reference or special notes.
          </p>
        </div>

        <!-- is_active toggle (optional) -->
        <div class="field field-inline">
          <label class="field-label" for="is-active">Active status</label>
          <div class="toggle-wrapper">
            <button
              id="is-active"
              class="toggle-btn"
              :class="{ 'is-active': isActive }"
              type="button"
              role="switch"
              :aria-checked="isActive"
              @click="isActive = !isActive"
            >
              <span class="toggle-slider"></span>
              <span class="toggle-label">{{
                isActive ? "Active" : "Inactive"
              }}</span>
            </button>
            <p class="field-hint">Visible on the menu when active.</p>
          </div>
        </div>
      </div>

      <!-- Footer - Responsive button layout -->
      <div class="card-footer">
        <button type="button" class="btn-cancel" @click="handleCancel">
          Cancel
        </button>
        <button
          type="button"
          class="btn-save"
          :disabled="!categoryName.trim() || loading"
          @click="handleSave"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
            />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
          <span class="btn-text">{{
            loading
              ? "Saving..."
              : isEditing
                ? "Update category"
                : "Save category"
          }}</span>
        </button>
      </div>

      <!-- Error message -->
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { updateCategory } from "@/services/api";

export default {
  name: "Design_New_Category",

  props: {
    category: {
      type: Object,
      default: null,
    },
  },

  emits: ["close", "add", "update"],

  data() {
    return {
      categoryName: this.category?.name || "",
      description: this.category?.description || "",
      isActive: this.category?.is_active ?? true,
      loading: false,
      error: null,
    };
  },

  computed: {
    isEditing() {
      return !!this.category?.id;
    },
  },

  watch: {
    category: {
      immediate: true,
      handler(nextCategory) {
        this.categoryName = nextCategory?.name || "";
        this.description = nextCategory?.description || "";
        this.isActive = nextCategory?.is_active ?? true;
        this.error = null;
      },
    },
  },

  methods: {
    handleCancel() {
      this.$emit("close");
    },

    async handleSave() {
      if (!this.categoryName.trim()) return;

      this.loading = true;
      this.error = null;

      try {
        const payload = {
          name: this.categoryName.trim(),
          description: this.description.trim() || null,
          is_active: this.isActive,
        };

        const { data } = this.isEditing
          ? await updateCategory(this.category.id, payload)
          : await api.post("/categories", payload);

        this.$emit(this.isEditing ? "update" : "add", data);
        this.$emit("close");
      } catch (err) {
        this.error = err.response?.data?.message || `Failed to ${
          this.isEditing ? "update" : "create"
        } category.`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.new-category-modal {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
}

/* Card */
.card {
  background: #ffffff;
  overflow: hidden;
}

/* Header with close button */
.header-with-close {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.close-modal-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.close-modal-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.card-top {
  padding: 20px 20px 16px;
  border-bottom: 0.5px solid #e5e7eb;
}

@media (min-width: 640px) {
  .card-top {
    padding: 24px 28px 20px;
  }
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
  letter-spacing: -0.2px;
}

@media (min-width: 640px) {
  .card-title {
    font-size: 20px;
  }
}

.card-subtitle {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

@media (min-width: 640px) {
  .card-subtitle {
    font-size: 13px;
    line-height: 1.6;
  }
}

/* Card Body */
.card-body {
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 640px) {
  .card-body {
    padding: 24px 28px;
    gap: 26px;
  }
}

/* Form Fields */
.field {
  display: flex;
  flex-direction: column;
}

.field-label {
  display: block;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #374151;
  margin-bottom: 6px;
}

@media (min-width: 640px) {
  .field-label {
    font-size: 11px;
    letter-spacing: 0.6px;
    margin-bottom: 8px;
  }
}

.field-hint {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 6px;
  line-height: 1.4;
}

@media (min-width: 640px) {
  .field-hint {
    font-size: 12px;
    margin-top: 7px;
  }
}

.text-input {
  width: 100%;
  padding: 10px 12px;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  background: #f9fafb;
  outline: none;
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}

.text-input.textarea {
  resize: vertical;
  min-height: 80px;
}

@media (min-width: 640px) {
  .text-input {
    padding: 10px 14px;
  }
}

.text-input::placeholder {
  color: #9ca3af;
}
.text-input:hover {
  border-color: #9ca3af;
}
.text-input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.12);
  background: #ffffff;
}

/* Inline field for toggle */
.field-inline {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}

.field-inline .field-label {
  margin-bottom: 0;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-wrapper .field-hint {
  margin-top: 0;
}

/* Toggle button */
.toggle-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #e5e7eb;
  border: none;
  border-radius: 24px;
  padding: 0;
  width: 48px;
  height: 26px;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.toggle-btn .toggle-slider {
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.toggle-btn.is-active {
  background: #0d9488;
}

.toggle-btn.is-active .toggle-slider {
  transform: translateX(22px);
}

.toggle-label {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-left: 56px;
  white-space: nowrap;
}

.toggle-btn.is-active .toggle-label {
  color: #0d9488;
}

/* Card footer */
.card-footer {
  padding: 16px 20px 20px;
  border-top: 0.5px solid #e5e7eb;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

@media (min-width: 480px) {
  .card-footer {
    flex-direction: row;
    justify-content: flex-end;
    padding: 16px 24px 22px;
  }
}

@media (min-width: 640px) {
  .card-footer {
    padding: 18px 28px 24px;
  }
}

/* Error message */
.error-msg {
  color: #ef4444;
  font-size: 12px;
  text-align: center;
  padding: 0 20px 12px;
  margin: 0;
}

/* Buttons */
.btn-cancel {
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: #374151;
  background: transparent;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  width: 100%;
  text-align: center;
}

@media (min-width: 480px) {
  .btn-cancel {
    width: auto;
    padding: 8px 20px;
  }
}

.btn-cancel:hover {
  background: #f3f4f6;
  color: #111827;
  border-color: #9ca3af;
}

.btn-cancel:active {
  transform: scale(0.98);
}

.btn-save {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: #ffffff;
  background: #5a62f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  width: 100%;
}

@media (min-width: 480px) {
  .btn-save {
    width: auto;
    padding: 8px 20px;
  }
}

.btn-save:hover:not(:disabled) {
  background: #4131f3;
  transform: translateY(-1px);
}

.btn-save:active:not(:disabled) {
  transform: translateY(0);
}

.btn-save:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Hide button text on very small screens if needed */
@media (max-width: 360px) {
  .btn-text {
    display: none;
  }
  .btn-save svg {
    margin: 0;
  }
  .btn-save {
    padding: 8px 12px;
  }
}

/* Touch optimization for mobile */
@media (max-width: 640px) {
  button {
    min-height: 44px;
  }
}
</style>
