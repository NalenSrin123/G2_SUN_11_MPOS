<template>
  <div class="new-category-modal">
    <!-- Card -->
    <div class="card">
      <!-- Header with close button -->
      <div class="card-top">
        <div class="header-with-close">
          <div>
            <h1 class="card-title">Create new category</h1>
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

        <!-- Category Icon / Image -->
        <div class="field">
          <span class="field-label">Category icon / image</span>

          <div
            class="upload-zone"
            :class="{ 'is-dragging': isDragging, 'has-preview': !!previewUrl }"
            role="button"
            tabindex="0"
            aria-label="Upload category image"
            @click="triggerFileInput"
            @keydown.enter.prevent="triggerFileInput"
            @keydown.space.prevent="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <!-- Image preview -->
            <template v-if="previewUrl">
              <img
                :src="previewUrl"
                alt="Category image preview"
                class="preview-img"
              />
              <button
                class="remove-btn"
                type="button"
                aria-label="Remove image"
                @click.stop="removeFile"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </template>

            <!-- Upload prompt -->
            <template v-else>
              <div class="upload-icon" aria-hidden="true">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="16 16 12 12 8 16" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <path
                    d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
                  />
                </svg>
              </div>
              <p class="upload-main">Click to upload or drag and drop</p>
              <p class="upload-sub">Max. 800 × 400 px</p>
              <div class="badge-row" aria-label="Accepted formats">
                <span class="badge">SVG</span>
                <span class="badge">PNG</span>
                <span class="badge">JPG</span>
                <span class="badge">GIF</span>
              </div>
            </template>
          </div>

          <!-- Hidden file input -->
          <input
            ref="fileInput"
            type="file"
            accept="image/svg+xml,image/png,image/jpeg,image/gif"
            class="sr-only"
            tabindex="-1"
            @change="handleFileChange"
          />

          <p class="field-hint">
            Recommended: square image at least 200 × 200 px for best display.
          </p>
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
          :disabled="!categoryName.trim()"
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
          <span class="btn-text">Save category</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Design_New_Category",

  emits: ["close", "add"],

  data() {
    return {
      categoryName: "",
      imageFile: null,
      previewUrl: null,
      isDragging: false,
    };
  },

  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      const file = event.target.files?.[0];
      if (file) this.loadFile(file);
    },

    handleDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) this.loadFile(file);
    },

    loadFile(file) {
      this.removeFile();
      this.imageFile = file;
      this.previewUrl = URL.createObjectURL(file);
    },

    removeFile() {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl);
      this.imageFile = null;
      this.previewUrl = null;
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
    },

    handleCancel() {
      this.$emit("close");
    },

    handleSave() {
      if (!this.categoryName.trim()) return;
      this.$emit("add", {
        name: this.categoryName.trim(),
        image: this.imageFile,
      });
    },
  },

  beforeUnmount() {
    this.removeFile();
  },
};
</script>

<style scoped>
.new-category-modal {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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

/* Upload Zone */
.upload-zone {
  position: relative;
  border: 1.5px dashed #d1d5db;
  border-radius: 10px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: #f9fafb;
  transition:
    border-color 0.15s,
    background 0.15s;
  outline: none;
  min-height: 180px;
}

@media (min-width: 480px) {
  .upload-zone {
    padding: 38px 20px;
  }
}

@media (min-width: 640px) {
  .upload-zone {
    padding: 44px 24px;
    min-height: 200px;
  }
}

.upload-zone:hover,
.upload-zone:focus-visible {
  border-color: #0d9488;
  background: #f0fdfa;
}

.upload-zone.is-dragging {
  border-color: #0d9488;
  background: #f0fdfa;
}

.upload-zone.has-preview {
  border-style: solid;
  border-color: #0d9488;
  padding: 12px;
}

/* Upload Icon */
.upload-icon {
  width: 44px;
  height: 44px;
  background: #e6f7f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0d9488;
  margin-bottom: 4px;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .upload-icon {
    width: 52px;
    height: 52px;
    margin-bottom: 8px;
  }
}

.upload-main {
  font-size: 13px;
  font-weight: 500;
  color: #111827;
  margin: 0;
  text-align: center;
}

@media (min-width: 640px) {
  .upload-main {
    font-size: 14px;
  }
}

.upload-sub {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
  text-align: center;
}

@media (min-width: 640px) {
  .upload-sub {
    font-size: 12px;
  }
}

/* Format badges */
.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
  justify-content: center;
}

.badge {
  font-size: 10px;
  font-weight: 500;
  padding: 2px 7px;
  border-radius: 4px;
  background: #f3f4f6;
  border: 0.5px solid #e5e7eb;
  color: #6b7280;
}

@media (min-width: 640px) {
  .badge {
    font-size: 11px;
    padding: 3px 8px;
  }
}

/* Image preview */
.preview-img {
  max-width: 100%;
  max-height: 160px;
  object-fit: contain;
  border-radius: 6px;
}

@media (min-width: 640px) {
  .preview-img {
    max-height: 180px;
  }
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s,
    transform 0.15s;
}

.remove-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}

.remove-btn:active {
  transform: scale(0.95);
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
  .upload-zone {
    cursor: pointer;
  }
}
</style>
