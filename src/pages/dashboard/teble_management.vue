<template>
  <div class="tm-root">
    <!-- Header -->
    <div class="tm-header">
      <div class="tm-title-block">
        <h1 class="tm-title">Table Management</h1>
        <p class="tm-subtitle">
          Real-time table status and reservation overview.
        </p>
      </div>
      <button class="tm-create-btn">
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
      <div class="tm-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['tm-tab', { active: activeTab === tab }]"
          @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>
      <button class="tm-filter-btn"><span>⇅</span> Filters</button>
      <span class="tm-showing"
        >Showing {{ showingRange }} of {{ filteredTables.length }} tables</span
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
      <table class="tm-table">
        <thead>
          <tr>
            <th>Table Number</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pagedTables" :key="row.id" class="tm-row">
            <td data-label="Table">
              <span class="table-id">{{ row.id }}</span>
              <span class="table-name">{{ row.name }}</span>
            </td>
            <td class="td-cap" data-label="Capacity">{{ row.capacity }} Seats</td>
            <td data-label="Status">
              <span :class="['status-badge', row.status.toLowerCase()]">{{
                row.status
              }}</span>
            </td>
            <td class="td-loc" data-label="Location">
              <!-- Wrapped in loc-content so flex applies to the value, not the cell -->
              <span class="loc-content">
                <span class="loc-icon">
                  <!-- Indoor -->
                  <svg
                    v-if="row.location === 'Indoor'"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 3l9 7h-3v9h-5v-6H11v6H6v-9H3l9-7z" />
                  </svg>
                  <!-- Outdoor -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#000000">
                    <path
                      d="M480-144v-432q-10.69-10.8-26.35-17.4Q438-600 421-600t-33.03 6.3Q371.95-587.4 361-576h-96q5-101 77-170.5T516-816q102 0 174 69.5T767-576h-96q-10.95-11.4-26.97-17.7Q628-600 611-600t-32.65 6.6Q562.69-586.8 552-576v432h-72Zm24-504h25q18-11 39.07-17.5T612-672q14.09 0 27.55 2.5Q653-667 666-662q-24-37-63-59.5T516-744q-48 0-87 22.5T366-662q13-5 26.45-7.5Q405.91-672 420-672q23.21 0 44.6 6.5Q486-659 504-648Zm120 504v-216h216v216h-72v-144h-72v144h-72Zm-444 0v-98q-17.18-4.34-28.64-16.49Q139.91-270.64 138-288L96-624h25q20.32 0 35.77 13.67Q172.23-596.65 174-577l27 217h135q33 0 52.5 19.5T408-288v48h-48v96h-48v-96h-84v96h-48Zm336-504Z" />
                  </svg>
                </span>
                {{ row.location }}
              </span>
            </td>

            <td class="td-actions">
              <button class="action-btn" title="Edit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000">
                  <path
                    d="M216-216h51l375-375-51-51-375 375v51Zm-72 72v-153l498-498q11-11 23.84-16 12.83-5 27-5 14.16 0 27.16 5t24 16l51 51q11 11 16 24t5 26.54q0 14.45-5.02 27.54T795-642L297-144H144Zm600-549-51-51 51 51Zm-127.95 76.95L591-642l51 51-25.95-25.05Z" />
                </svg>
              </button>
              <button class="action-btn" title="More">⋮</button>
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
import { ref, computed } from "vue";

const activeTab = ref("All");
const tabs = ["All", "Indoor", "Outdoor"];
const page = ref(1);
const perPage = 10;

const allTables = ref([
  { id: "T01", name: "Front Window",   capacity: 4,  status: "Available", location: "Indoor"  },
  { id: "T02", name: "Main Floor",     capacity: 2,  status: "Occupied",  location: "Indoor"  },
  { id: "T12", name: "Garden Terrace", capacity: 6,  status: "Reserved",  location: "Outdoor" },
  { id: "T04", name: "Bar Side",       capacity: 2,  status: "Available", location: "Indoor"  },
  { id: "T20", name: "Corner Booth",   capacity: 8,  status: "Occupied",  location: "Indoor"  },
  { id: "T15", name: "Patio Edge",     capacity: 4,  status: "Available", location: "Outdoor" },
  { id: "T07", name: "Mezzanine",      capacity: 6,  status: "Reserved",  location: "Indoor"  },
  { id: "T09", name: "Rooftop Deck",   capacity: 10, status: "Available", location: "Outdoor" },
  { id: "T03", name: "Lounge Left",    capacity: 4,  status: "Occupied",  location: "Indoor"  },
  { id: "T11", name: "Courtyard",      capacity: 6,  status: "Available", location: "Outdoor" },
  { id: "T17", name: "Fireplace Nook", capacity: 2,  status: "Reserved",  location: "Indoor"  },
  { id: "T22", name: "Garden Side",    capacity: 4,  status: "Available", location: "Outdoor" },
]);

const stats = [
  { label: "TOTAL CAPACITY", value: "142", badge: "+8",  badgeType: "up",   sub: ""        },
  { label: "AVAILABLE NOW",  value: "12",  badge: null,  badgeType: "",     sub: "Tables"  },
  { label: "OCCUPANCY RATE", value: "84%", badge: "~2%", badgeType: "down", sub: ""        },
  { label: "RESERVED TODAY", value: "28",  badge: null,  badgeType: "",     sub: "Bookings"},
];

const filteredTables = computed(() => {
  if (activeTab.value === "All") return allTables.value;
  return allTables.value.filter(t => t.location === activeTab.value);
});

const totalPages = computed(() =>
  Math.ceil(filteredTables.value.length / perPage),
);

const pagedTables = computed(() =>
  filteredTables.value.slice((page.value - 1) * perPage, page.value * perPage),
);

const showingRange = computed(() => {
  const start = (page.value - 1) * perPage + 1;
  const end = Math.min(page.value * perPage, filteredTables.value.length);
  return `${start}–${end}`;
});

function prevPage() { if (page.value > 1) page.value--; }
function nextPage() { if (page.value < totalPages.value) page.value++; }
function loadMore()  { if (page.value < totalPages.value) page.value++; }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.tm-root {
  font-family: "DM Sans", sans-serif;
  background: #f5f5f0;
  min-height: 100vh;
  padding: 2rem clamp(1rem, 4vw, 3rem);
  color: #1a1a18;
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
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #111;
}
.tm-subtitle {
  font-size: 0.85rem;
  color: #888;
  margin-top: 0.2rem;
}
.tm-create-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: #1a6840;
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
.tm-create-btn:hover { background: #155534; }
.btn-icon { font-size: 1rem; }

/* ── Stats ── */
.tm-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: #fff;
  border: 1px solid #e8e8e2;
  border-radius: 12px;
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
  color: #111;
  font-family: "DM Mono", monospace;
}
.stat-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 99px;
}
.stat-badge.up   { background: #dcfce7; color: #166534; }
.stat-badge.down { background: #fef9c3; color: #854d0e; }
.stat-sub { font-size: 0.8rem; color: #999; }

/* ── Filter Bar ── */
.tm-filters-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  background: #fff;
  border: 1px solid #e8e8e2;
  border-radius: 12px 12px 0 0;
  padding: 0.85rem 1.25rem;
  border-bottom: none;
}
.tm-tabs {
  display: flex;
  gap: 0.3rem;
  background: #f5f5f0;
  border-radius: 8px;
  padding: 0.25rem;
}
.tm-tab {
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 500;
  font-family: inherit;
  color: #666;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.tm-tab.active {
  background: #fff;
  color: #111;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}
.tm-filter-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid #e0e0da;
  background: #fff;
  border-radius: 7px;
  padding: 0.3rem 0.8rem;
  font-size: 0.82rem;
  font-family: inherit;
  color: #555;
  cursor: pointer;
  transition: border-color 0.15s;
}
.tm-filter-btn:hover { border-color: #bbb; }
.tm-showing {
  font-size: 0.78rem;
  color: #aaa;
  margin-left: auto;
}
.tm-pagination { display: flex; gap: 0.25rem; }
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
.pg-btn:hover:not(:disabled) { background: #f5f5f0; }
.pg-btn:disabled { opacity: 0.35; cursor: default; }

/* ── Table ── */
.tm-table-wrap {
  background: #fff;
  border: 1px solid #e8e8e2;
  border-radius: 0 0 12px 12px;
  overflow-x: auto;
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
.tm-row:last-child { border-bottom: none; }
.tm-row:hover { background: #fafaf7; }
.tm-table td {
  padding: 0.95rem 1.25rem;
  vertical-align: middle;
  font-size: 0.875rem;
}
.table-id {
  font-family: "DM Mono", monospace;
  font-size: 0.8rem;
  font-weight: 500;
  color: #1a6840;
  background: #f0faf5;
  padding: 0.18rem 0.55rem;
  border-radius: 5px;
  margin-right: 0.6rem;
}
.table-name { font-weight: 500; color: #222; }
.td-cap { color: #666; }

.status-badge {
  display: inline-block;
  padding: 0.22rem 0.75rem;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 600;
}
.status-badge.available { background: #dcfce7; color: #166534; }
.status-badge.occupied  { background: #fef3c7; color: #92400e; }
.status-badge.reserved  { background: #e0f2fe; color: #075985; }

/* loc-content holds the icon + text; td-loc is just a plain cell on desktop */
.td-loc { color: #555; }
.loc-content {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  white-space: nowrap;
}
.loc-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.td-actions { text-align: right; }
.action-btn {
  background: none;
  border: none;
  color: #bbb;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.3rem 0.4rem;
  border-radius: 5px;
  transition: color 0.15s, background 0.15s;
  line-height: 1;
}
.action-btn:hover { color: #555; background: #f0f0ea; }

/* ── Load More ── */
.tm-load-more {
  display: flex;
  justify-content: center;
  padding: 1.25rem 0 0.5rem;
}
.load-more-btn {
  background: none;
  border: none;
  color: #1a6840;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: background 0.15s;
}
.load-more-btn:hover { background: #f0faf5; }


/* ═══════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════ */

/* Tablet — stats drop to 2-col, table still scrolls horizontally */
@media (max-width: 900px) {
  .tm-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile — 640px breakpoint */
@media (max-width: 640px) {
  .tm-root {
    padding: 1.25rem 1rem;
  }

  /* Header: stack vertically, button full width */
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

  /* Stats: 2×2 */
  .tm-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  /* Filter bar: tabs fill own row, filter btn + pagination share row below */
  .tm-filters-bar {
    padding: 0.75rem 1rem;
    row-gap: 0.5rem;
  }
  .tm-tabs {
    width: 100%;
    order: -1; /* always first */
  }
  .tm-tab {
    flex: 1;
    text-align: center;
    padding: 0.35rem 0.4rem;
  }
  .tm-showing { display: none; }
  .tm-filter-btn { flex-shrink: 0; }
  .tm-pagination { margin-left: auto; }
  .pg-btn { width: 32px; height: 32px; }

  /* ── Table → card layout ── */
  .tm-table-wrap {
    overflow-x: unset;   /* no horizontal scroll */
  }
  .tm-table {
    min-width: unset;
    width: 100%;
  }
  /* Kill the thead */
  .tm-table thead {
    display: none;
  }
  /* Block-ify table/tbody so tr can become a grid */
  .tm-table,
  .tm-table tbody {
    display: block;
    width: 100%;
  }

  /* Each row is a 2-col card */
  .tm-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name    name"
      "cap     status"
      "loc     actions";
    column-gap: 1rem;
    row-gap: 0.6rem;
    padding: 1rem;
    border-bottom: 1px solid #e8e8e2;
  }
  .tm-row:last-child { border-bottom: none; }

  /* Every cell: flex column → small label on top, value below */
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

  /* Name cell — full width, horizontal, no label */
  .tm-table td:first-child {
    grid-area: name;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid #f0f0ea;
  }
  .tm-table td:first-child::before { display: none; }

  /* Capacity */
  .td-cap { grid-area: cap; }

  /* Status (3rd td, no unique class in original) */
  .tm-table td:nth-child(3) { grid-area: status; }
  
  /* Location */
  .td-loc { grid-area: loc; }

  /* Actions — bottom-right, no label, buttons in a row */
  .td-actions {
    grid-area: actions;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    text-align: right;
  }
  .td-actions::before { display: none; }

  /* Bigger touch targets on action buttons */
  .action-btn { padding: 0.45rem 0.5rem; }

  /* loc-content wraps comfortably on narrow cards */
  .loc-content { white-space: normal; }
}

/* Small phones ≤ 400px — single column card */
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
      "name"
      "status"
      "cap"
      "loc"
      "actions";
    row-gap: 0.5rem;
  }
  .td-actions {
    justify-content: flex-start;
  }
}
</style>