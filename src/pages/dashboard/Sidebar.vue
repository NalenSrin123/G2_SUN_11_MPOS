<script setup>
import { useRoute } from "vue-router";
// import for logo
import { computed } from "vue";
import {
  LayoutDashboard,
  ShoppingCart,
  Warehouse,
  TableProperties, // Imported for the tables item
  Search,
  Bell,
  HelpCircle,
  PackageSearch,
  Boxes,
  CreditCard,
  Settings,
} from "lucide-vue-next";

const route = useRoute();

// Navigation items for the sidebar - maps routes to icons and labels
const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
  // { to: "/dashboard/inventory", icon: Warehouse, label: "Inventory" },
  { to: "/dashboard/table", icon: TableProperties, label: "Tables" },
  { to: "/dashboard/product", icon: PackageSearch, label: "Products" },
  { to: "/dashboard/category", icon: Boxes, label: "Categories" },
  // { to: "/dashboard/payment", icon: CreditCard, label: "Payment" },
  { to: "/dashboard/setting", icon: Settings, label: "Setting" },
];

// Convert to uppercase letter at first letter
const pageTitle = computed(() => {
  const activeItem = navItems.find((item) => item.to === route.path);
  return activeItem?.label || "Dashboard";
});
</script>

<template>
  <div class="dashboard-shell flex">
    <aside class="dashboard-sidebar w-[260px]">
      <div class="px-6 pt-5">
        <RouterLink to="/dashboard" class="brand-link"
          >Culinary Admin</RouterLink
        >
        <p class="portal-label">Management Portal</p>
      </div>

      <nav class="mt-10 px-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link w-full flex items-center gap-3 px-4 py-3 mb-2 text-sm transition"
          :class="route.path === item.to ? 'nav-link-active' : 'nav-link-idle'"
        >
          <component :is="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="dashboard-main flex-1 flex flex-col">
      <header
        class="dashboard-topbar h-[72px] flex items-center justify-between px-6"
      >
        <div class="flex items-center gap-6">
          <div class="relative"></div>
        </div>

        <div class="flex items-center gap-5">
          <RouterLink to="/dashboard"
            ><Bell
              :size="18"
              class="text-gray-500 cursor-pointer hover:text-blue-600"
          /></RouterLink>

          <RouterLink to="/dashboard">
            <HelpCircle
              :size="18"
              class="text-gray-500 cursor-pointer hover:text-blue-600"
            />
          </RouterLink>

          <div class="w-px h-6 bg-gray-300"></div>

          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm font-medium">Alex Rivera</p>
              <p class="text-xs text-gray-500">Floor Manager</p>
            </div>

            <RouterLink to="/login">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ztrAc-9_3lz9yKylT78HXXyD89WfpMU46w&s"
                alt="profile"
                class="w-10 h-10 rounded-full object-cover"
              />
            </RouterLink>
          </div>
        </div>
      </header>

      <main class="dashboard-content flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-shell {
  background: var(--dashboard-bg);
  color: var(--dashboard-text);
  font-family: var(--font-sans);
  height: 100dvh;
  min-height: 100dvh;
  overflow: hidden;
}

.dashboard-sidebar {
  background: #f8fafc;
  border-right: 1px solid var(--dashboard-border);
  flex-shrink: 0;
  height: 100dvh;
  overflow: hidden;
}

.dashboard-main {
  height: 100dvh;
  min-width: 0;
  overflow: hidden;
}

.brand-link {
  color: var(--dashboard-blue);
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.15;
}

.portal-label {
  color: var(--dashboard-muted);
  font-size: 0.75rem;
  margin-top: 3px;
}

.nav-link {
  border-radius: 8px;
  font-weight: 500;
}

.nav-link-active {
  background: var(--dashboard-blue);
  color: #fff;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.22);
}

.nav-link-idle {
  color: #334155;
}

.nav-link-idle:hover {
  background: var(--dashboard-surface);
  color: var(--dashboard-blue);
}

.dashboard-topbar {
  background: var(--dashboard-surface);
  border-bottom: 1px solid var(--dashboard-border);
  flex-shrink: 0;
}

.top-search {
  background: #f8fafc;
  border: 1px solid var(--dashboard-border);
  border-radius: 8px;
  color: var(--dashboard-text);
  transition:
    border-color 0.15s,
    box-shadow 0.15s,
    background 0.15s;
}

.top-search:focus {
  background: #fff;
  border-color: var(--dashboard-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.14);
}

.dashboard-content {
  background: var(--dashboard-bg);
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(16px, 2vw, 24px);
}

.dashboard-content :deep(.min-h-screen) {
  min-height: 100%;
}

.dashboard-content :deep(.font-sans) {
  font-family: var(--font-sans) !important;
}

.dashboard-content :deep(.bg-slate-50),
.dashboard-content :deep(.bg-gray-50),
.dashboard-content :deep(.bg-zinc-300) {
  background: transparent !important;
}

.dashboard-content :deep(.bg-white),
.dashboard-content :deep(.bg-zinc-100) {
  background: var(--dashboard-surface) !important;
}

.dashboard-content :deep(.text-gray-900),
.dashboard-content :deep(.text-slate-900),
.dashboard-content :deep(.text-zinc-800) {
  color: var(--dashboard-text) !important;
}

.dashboard-content :deep(.text-gray-500),
.dashboard-content :deep(.text-gray-400),
.dashboard-content :deep(.text-slate-500),
.dashboard-content :deep(.text-slate-400),
.dashboard-content :deep(.text-zinc-500) {
  color: var(--dashboard-muted) !important;
}

.dashboard-content :deep(.border-gray-100),
.dashboard-content :deep(.border-gray-200),
.dashboard-content :deep(.border-gray-300),
.dashboard-content :deep(.border-gray-400),
.dashboard-content :deep(.border-slate-100),
.dashboard-content :deep(.border-slate-200),
.dashboard-content :deep(.border-slate-300),
.dashboard-content :deep(.border-zinc-400),
.dashboard-content :deep(.border-zinc-500) {
  border-color: var(--dashboard-border) !important;
}

.dashboard-content :deep(.rounded-2xl),
.dashboard-content :deep(.rounded-xl) {
  border-radius: var(--dashboard-radius) !important;
}

.dashboard-content :deep(.shadow-sm) {
  box-shadow: var(--dashboard-shadow) !important;
}

.dashboard-content :deep(.bg-blue-500),
.dashboard-content :deep(.bg-blue-600),
.dashboard-content :deep(.bg-blue-800),
.dashboard-content :deep(.bg-blue-900),
.dashboard-content :deep(.bg-\[\#1060FE\]),
.dashboard-content :deep(.bg-\[\#5850ec\]) {
  background: var(--dashboard-blue) !important;
}

.dashboard-content :deep(.hover\:bg-blue-600:hover),
.dashboard-content :deep(.hover\:bg-blue-700:hover),
.dashboard-content :deep(.hover\:bg-\[\#4b43d3\]:hover) {
  background: var(--dashboard-blue-dark) !important;
}

.dashboard-content :deep(.text-blue-500),
.dashboard-content :deep(.text-blue-600),
.dashboard-content :deep(.text-blue-800),
.dashboard-content :deep(.text-\[\#1060FE\]) {
  color: var(--dashboard-blue) !important;
}

.dashboard-content :deep(.bg-blue-50),
.dashboard-content :deep(.bg-indigo-50) {
  background: var(--dashboard-blue-light) !important;
}
</style>
