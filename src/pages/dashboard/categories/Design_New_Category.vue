<template>
  <div class="page">

    <!-- HeadCategory -->
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <span>Inventory</span>
      <span class="sep" aria-hidden="true">›</span>
      <span>Categories</span>
      <span class="sep" aria-hidden="true">›</span>
      <span class="active" aria-current="page">New category</span>
    </nav>

    <!-- Card -->
    <div class="card">

      <!-- Header -->
      <div class="card-top">
        <h1 class="card-title">Create new category</h1>
        <p class="card-subtitle">
          Define a menu category to organize your restaurant offerings and improve kitchen workflow.
        </p>
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
          <p class="field-hint">This name will appear on your menu and in kitchen reports.</p>
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
              <img :src="previewUrl" alt="Category image preview" class="preview-img" />
              <button
                class="remove-btn"
                type="button"
                aria-label="Remove image"
                @click.stop="removeFile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </template>

            <!-- Upload prompt -->
            <template v-else>
              <div class="upload-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.8"
                  stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 16 12 12 8 16"/>
                  <line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
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

          <p class="field-hint">Recommended: square image at least 200 × 200 px for best display.</p>
        </div>

      </div>

      <!-- Footer -->
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Save category
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NewCategory',

  emits: ['save', 'cancel'],

  data() {
    return {
      categoryName: '',
      imageFile:    null,
      previewUrl:   null,
      isDragging:   false,
    }
  },

  methods: {

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileChange(event) {
      const file = event.target.files?.[0]
      if (file) this.loadFile(file)
    },

    handleDrop(event) {
      this.isDragging = false
      const file = event.dataTransfer.files?.[0]
      if (file && file.type.startsWith('image/')) this.loadFile(file)
    },

    loadFile(file) {
      this.removeFile()
      this.imageFile  = file
      this.previewUrl = URL.createObjectURL(file)
    },

    removeFile() {
      if (this.previewUrl) URL.revokeObjectURL(this.previewUrl)
      this.imageFile  = null
      this.previewUrl = null
      if (this.$refs.fileInput) this.$refs.fileInput.value = ''
    },

    handleCancel() {
      this.$emit('cancel')
    },

    handleSave() {
      if (!this.categoryName.trim()) return
      this.$emit('save', {
        name:  this.categoryName.trim(),
        image: this.imageFile,
      })
    },
  },

  beforeUnmount() {
    this.removeFile()
  },
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

.page {
  min-height: 100vh;
  background: #f3f4f6;
  padding: 28px 24px 56px;
  font-family: 'Inter', system-ui, sans-serif;
  color: #111827;
}

/* ── Breadcrumb ── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 20px;
  letter-spacing: 0.2px;
}
.breadcrumb .sep    { color: #9ca3af; }
.breadcrumb .active { color: #111827; font-weight: 500; }

.card {
  max-width: 780px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  border: 0.5px solid #e5e7eb;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
}

.card-top {
  padding: 28px 32px 22px;
  border-bottom: 0.5px solid #e5e7eb;
}
.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 6px;
  letter-spacing: -0.2px;
}
.card-subtitle {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.card-body {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}
.field { display: flex; flex-direction: column; }

.field-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #374151;
  margin-bottom: 8px;
}

.field-hint {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 7px;
  line-height: 1.5;
}
.text-input {
  width: 100%;
  padding: 10px 14px;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  color: #111827;
  background: #f9fafb;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.text-input::placeholder { color: #9ca3af; }
.text-input:hover  { border-color: #9ca3af; }
.text-input:focus  {
  border-color: #0d9488;
  box-shadow: 0 0 0 3px rgba(13,148,136,0.12);
  background: #ffffff;
}

.upload-zone {
  position: relative;
  border: 1.5px dashed #d1d5db;
  border-radius: 10px;
  padding: 44px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: #f9fafb;
  transition: border-color 0.15s, background 0.15s;
  outline: none;
  min-height: 200px;
}
.upload-zone:hover,
.upload-zone:focus-visible { border-color: #0d9488; background: #f0fdfa; }
.upload-zone.is-dragging   { border-color: #0d9488; background: #f0fdfa; }
.upload-zone.has-preview   {
  border-style: solid;
  border-color: #0d9488;
  padding: 12px;
}

/* ── Upload ── */
.upload-icon {
  width: 52px;
  height: 52px;
  background: #e6f7f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0d9488;
  margin-bottom: 4px;
  flex-shrink: 0;
}
.upload-main {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}
.upload-sub {
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
}

/* ── Format badges ── */
.badge-row {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}
.badge {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 4px;
  background: #f3f4f6;
  border: 0.5px solid #e5e7eb;
  color: #6b7280;
}

/* ── Image preview ── */
.preview-img {
  max-width: 100%;
  max-height: 180px;
  object-fit: contain;
  border-radius: 6px;
}
.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.remove-btn:hover { background: rgba(0,0,0,0.75); }

/* ── Card footer ── */
.card-footer {
  padding: 18px 32px 24px;
  border-top: 0.5px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

/* ── Buttons ── */
.btn-cancel {
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  color: #374151;
  background: transparent;
  border: 0.5px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.btn-cancel:hover {
  background: #f3f4f6;
  color: #111827;
  border-color: #9ca3af;
}

.btn-save {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  color: #e5e3e3;
  background: #5a62f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, opacity 0.15s;
}
.btn-save:hover:not(:disabled) { background: #4131f3; }
.btn-save:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* ── Responsive ── */
@media (max-width: 560px) {
  .page { padding: 16px 12px 40px; }
  .card-top,
  .card-body,
  .card-footer { padding-left: 18px; padding-right: 18px; }
  .upload-zone { padding: 32px 16px; }
}
</style>