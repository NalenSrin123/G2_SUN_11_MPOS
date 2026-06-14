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
  { to: "/dashboard/inventory", icon: Warehouse, label: "Inventory" },
  { to: "/dashboard/table", icon: TableProperties, label: "Tables" }, 
  { to: "/dashboard/product",icon: PackageSearch , label: "Products" },
  { to: "/dashboard/category", icon: Boxes, label: "Categories"},
  { to: "/dashboard/payment", icon: CreditCard ,label: "Payment"},
  { to: "/dashboard/setting",icon: Settings, label: "Setting" }
];

// Convert to uppercase letter at first letter
const pageTitle = computed(() => {
  const activeItem = navItems.find((item) => item.to === route.path);
  return activeItem?.label || "Dashboard";
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <aside class="w-[260px] bg-[#F5F6F8] border-r border-gray-200">
      <div class="px-6 pt-5">
        <RouterLink to="/dashboard" class="text-2xl font-bold text-blue-600">Culinary Admin</RouterLink>
        <p class="text-xs text-gray-500">Management Portal</p>
      </div>

      <nav class="mt-10 px-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg text-sm transition"
          :class="
            route.path === item.to
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-white'
          "
        >
          <component :is="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header
        class="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6"
      >
        <div class="flex items-center gap-6">
          <h2 class="text-2xl font-semibold text-blue-600">
            {{ pageTitle }}
          </h2>

          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              :size="16"
            />

            <input
              type="text"
              placeholder="Search..."
              class="w-[340px] pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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

      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>