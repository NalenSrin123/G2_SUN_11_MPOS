<template>
  <DesignPageCreateTable
    v-if="showForm"
    @back="showForm = false"
    @submit="handleCreateTable"
  />
  <div v-else class="tm-root">
    <!-- Header -->
    <div class="tm-header">
      <div class="tm-title-block">
        <h1 class="tm-title">Table Management</h1>
        <p class="tm-subtitle">
          Real-time table status and reservation overview.
        </p>
      </div>
      <button @click="showForm = true" class="tm-create-btn">
        <span class="btn-icon">⊕</span> Create Table
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="tm-stats">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <span class="stat-label">{{ stat.label }}</span>
        <div class="stat-value-row">
          <span class="stat-value">{{ stat.value }}</span>
          <span v-if="stat.badge" :class="['stat-badge', stat.badgeType]">{{
            stat.badge
          }}</span>
        </div>
        <span class="stat-sub">{{ stat.sub }}</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="tm-filters-bar">
      <button class="tm-filter-btn"><span>⇅</span> Filters</button>
      <span class="tm-showing"
        >Showing {{ showingRange }} of {{ allTables.length }} tables</span
      >
      <div class="tm-pagination">
        <button class="pg-btn" @click="prevPage" :disabled="page === 1">
          ‹
        </button>
        <button class="pg-btn" @click="nextPage" :disabled="page >= totalPages">
          ›
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="tm-table-wrap">
      <p v-if="loading" class="tm-state-msg">Loading tables...</p>
      <p v-else-if="error" class="tm-state-msg tm-error">{{ error }}</p>
      <table v-else class="tm-table">
        <thead>
          <tr>
            <th>Table Number</th>
            <th>QR Code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in pagedTables" :key="row.id" class="tm-row">
            <td data-label="Table">
              <span class="table-id">T{{ row.tableNumber }}</span>
            </td>
            <td data-label="QR Code" class="td-qr">{{ row.qrCode }}</td>
            <td data-label="Status">
              <span :class="['status-badge', row.status.toLowerCase()]">{{
                row.status
              }}</span>
            </td>
            <td class="td-actions">
              <button class="action-btn" title="Edit" @click="handleEdit(row)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path
                    d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z"
                  />
                </svg>
              </button>
              <button
                class="action-btn"
                title="Delete"
                @click="handleDelete(row)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path
                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Load More -->
    <div class="tm-load-more">
      <button class="load-more-btn" @click="loadMore" v-if="page < totalPages">
        Load More Tables ∨
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "../../services/api.js";
import DesignPageCreateTable from "./DesignPageCreateTable.vue";

const page = ref(1);
const perPage = 10;

const showForm = ref(false);
const loading = ref(false);
const error = ref(null);

const allTables = ref([]);

const stats = ref([
  {
    label: "TOTAL CAPACITY",
    value: "142",
    badge: "+8",
    badgeType: "up",
    sub: "",
  },
  {
    label: "AVAILABLE NOW",
    value: "12",
    badge: null,
    badgeType: "",
    sub: "Tables",
  },
  {
    label: "OCCUPANCY RATE",
    value: "84%",
    badge: "-2%",
    badgeType: "down",
    sub: "",
  },
  {
    label: "RESERVED TODAY",
    value: "28",
    badge: null,
    badgeType: "",
    sub: "Bookings",
  },
]);

async function fetchTables() {
  loading.value = true;
  error.value = null;
  try {
    const res = await api.get("/tables");
    allTables.value = res.data.map((t) => ({
      id: t.id,
      tableNumber: t.table_number,
      qrCode: t.qr_code,
      status: t.status,
    }));
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to load tables.";
    console.error("Fetch tables error:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchTables);

const totalPages = computed(() => Math.ceil(allTables.value.length / perPage));

const pagedTables = computed(() =>
  allTables.value.slice((page.value - 1) * perPage, page.value * perPage),
);

const showingRange = computed(() => {
  const start = (page.value - 1) * perPage + 1;
  const end = Math.min(page.value * perPage, allTables.value.length);
  return allTables.value.length === 0 ? "0" : `${start}–${end}`;
});

function prevPage() {
  if (page.value > 1) page.value--;
}
function nextPage() {
  if (page.value < totalPages.value) page.value++;
}
function loadMore() {
  if (page.value < totalPages.value) page.value++;
}

const handleCreateTable = async (newTable) => {
  try {
    await api.post("/tables", {
      table_number: newTable.tableNumber ?? newTable.table_number,
      status: newTable.status ?? "closed",
    });
    await fetchTables();
    showForm.value = false;
    page.value = 1;
  } catch (err) {
    console.error("Create table error:", err);
  }
};

function handleEdit(row) {
  // TODO: open edit form / modal with row data
  console.log("Edit table:", row);
}

async function handleDelete(row) {
  if (!confirm(`Delete table T${row.tableNumber}?`)) return;
  try {
    await api.delete(`/tables/${row.id}`);
    await fetchTables();
  } catch (err) {
    console.error("Delete table error:", err);
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tm-root {
  --surface: var(--dashboard-surface);
  --blue: var(--dashboard-blue);
  --blue-dk: var(--dashboard-blue-dark);
  --blue-lt: var(--dashboard-blue-light);
  --text: var(--dashboard-text);
  --muted: var(--dashboard-muted);
  --border: var(--dashboard-border);
  --green: var(--dashboard-green);
  --red: var(--dashboard-red);

  font-family: var(--font-sans);
  min-height: 100%;
  color: var(--text);
}

/* ── Header ── */
.tm-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.tm-title {
  font-size: clamp(1.2rem, 2.5vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.4px;
}
.tm-subtitle {
  font-size: clamp(0.75rem, 1.2vw, 0.85rem);
  color: var(--muted);
  margin-top: 2px;
}
.tm-create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.18s;
}
.tm-create-btn:hover {
  background: var(--blue-dk);
}
.btn-icon {
  font-size: 1rem;
}

/* ── Stats ── */
.tm-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: var(--surface);
  border-radius: var(--dashboard-radius);
  box-shadow: var(--dashboard-shadow);
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #aaa;
  text-transform: uppercase;
}
.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
}
.stat-value {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text);
  font-family: var(--font-mono);
}
.stat-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 99px;
}
.stat-badge.up {
  background: #dcfce7;
  color: #166534;
}
.stat-badge.down {
  background: #fef9c3;
  color: #854d0e;
}
.stat-sub {
  font-size: 0.8rem;
  color: #999;
}

/* ── Filter Bar ── */
.tm-filters-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--dashboard-radius) var(--dashboard-radius) 0 0;
  padding: 0.85rem 1.25rem;
  border-bottom: none;
}
.tm-filter-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 7px;
  padding: 0.3rem 0.8rem;
  font-size: 0.82rem;
  font-family: inherit;
  color: #555;
  cursor: pointer;
  transition: border-color 0.15s;
}
.tm-filter-btn:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.tm-showing {
  font-size: 0.78rem;
  color: #aaa;
  margin-left: auto;
}
.tm-pagination {
  display: flex;
  gap: 0.25rem;
}
.pg-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #e0e0da;
  background: #fff;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #555;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.15s;
}
.pg-btn:hover:not(:disabled) {
  background: #f5f5f0;
}
.pg-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

/* ── Table ── */
.tm-table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0 0 var(--dashboard-radius) var(--dashboard-radius);
  overflow-x: auto;
}
.tm-state-msg {
  padding: 2rem 1.25rem;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
}
.tm-error {
  color: #b91c1c;
}
.tm-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}
.tm-table thead th {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #aaa;
  padding: 0.85rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid #f0f0ea;
  white-space: nowrap;
}
.tm-row {
  border-bottom: 1px solid #f5f5f0;
  transition: background 0.12s;
}
.tm-row:last-child {
  border-bottom: none;
}
.tm-row:hover {
  background: #fafaf7;
}
.tm-table td {
  padding: 0.95rem 1.25rem;
  vertical-align: middle;
  font-size: 0.875rem;
}
.table-id {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--blue);
  background: var(--blue-lt);
  padding: 0.18rem 0.55rem;
  border-radius: 5px;
}
.td-qr {
  color: #666;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.status-badge {
  display: inline-block;
  padding: 0.22rem 0.75rem;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 600;
}
.status-badge.available,
.status-badge.open {
  background: #dcfce7;
  color: #166534;
}
.status-badge.occupied {
  background: #fef3c7;
  color: #92400e;
}
.status-badge.reserved {
  background: #e0f2fe;
  color: #075985;
}
.status-badge.closed {
  background: #f1f5f9;
  color: #475569;
}

.td-actions {
  text-align: right;
}
.action-btn {
  background: none;
  border: none;
  color: #bbb;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem 0.4rem;
  border-radius: 5px;
  transition:
    color 0.15s,
    background 0.15s;
  line-height: 1;
}
.action-btn:hover {
  color: #555;
  background: #f0f0ea;
}

/* ── Load More ── */
.tm-load-more {
  display: flex;
  justify-content: center;
  padding: 1.25rem 0 0.5rem;
}
.load-more-btn {
  background: none;
  border: none;
  color: var(--blue);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: background 0.15s;
}
.load-more-btn:hover {
  background: var(--blue-lt);
}

/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */

@media (max-width: 900px) {
  .tm-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tm-root {
    padding: 1.25rem 1rem;
  }

  .tm-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
  .tm-create-btn {
    width: 100%;
    padding: 0.7rem 1rem;
  }

  .tm-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .tm-filters-bar {
    padding: 0.75rem 1rem;
    row-gap: 0.5rem;
  }
  .tm-showing {
    display: none;
  }
  .tm-pagination {
    margin-left: auto;
  }
  .pg-btn {
    width: 32px;
    height: 32px;
  }

  .tm-table-wrap {
    overflow-x: unset;
  }
  .tm-table {
    min-width: unset;
    width: 100%;
  }
  .tm-table thead {
    display: none;
  }
  .tm-table,
  .tm-table tbody {
    display: block;
    width: 100%;
  }

  .tm-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "table   table"
      "qr      status"
      "actions actions";
    column-gap: 1rem;
    row-gap: 0.6rem;
    padding: 1rem;
    border-bottom: 1px solid #e8e8e2;
  }
  .tm-row:last-child {
    border-bottom: none;
  }

  .tm-table td {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-size: 0.875rem;
    vertical-align: unset;
  }
  .tm-table td::before {
    content: attr(data-label);
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #aaa;
  }

  .tm-table td:first-child {
    grid-area: table;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid #f0f0ea;
  }
  .tm-table td:first-child::before {
    display: none;
  }

  .td-qr {
    grid-area: qr;
  }
  .tm-table td:nth-child(3) {
    grid-area: status;
  }

  .td-actions {
    grid-area: actions;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
  }
  .td-actions::before {
    display: none;
  }

  .action-btn {
    padding: 0.45rem 0.5rem;
  }
}

@media (max-width: 400px) {
  .tm-stats {
    gap: 0.5rem;
  }
  .stat-card {
    padding: 0.85rem 0.9rem;
  }
  .tm-row {
    grid-template-columns: 1fr;
    grid-template-areas:
      "table"
      "status"
      "qr"
      "actions";
    row-gap: 0.5rem;
  }
  .td-actions {
    justify-content: flex-start;
  }
}
</style>
