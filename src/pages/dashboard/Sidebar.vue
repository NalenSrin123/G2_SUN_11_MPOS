<script setup>
import { useRoute } from "vue-router";
// import for logo
import { computed } from "vue";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Settings,
  Search,
  Bell,
  HelpCircle,
} from "lucide-vue-next";

const route = useRoute();

// Navigation items for the sidebar - maps routes to icons and labels
const navItems = [
  { to: "/overview", icon: LayoutDashboard, label: "Overview" },
  { to: "/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/products", icon: Package, label: "Products" },
  { to: "/inventory", icon: Warehouse, label: "Inventory" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

// Convert to uppercase letter at first letter
const pageTitle = computed(() => {
  const path = route.path.replace("/", "") || "overview";
  return path.charAt(0).toUpperCase() + path.slice(1);
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar Section -->
    <aside class="w-[260px] bg-[#F5F6F8] border-r border-gray-200">
      <div class="px-6 pt-5">
        <a href="" class="text-2xl font-bold text-blue-600">Culinary Admin</a>
        <p class="text-xs text-gray-500">Management Portal</p>
      </div>

      <!-- Navigation Links -->
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

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header/Navbar -->
      <header
        class="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6"
      >
        <div class="flex items-center gap-6">
          <!-- Dynamic page title based on current route path -->
          <h2 class="text-2xl font-semibold text-blue-600">
            {{ pageTitle }}
          </h2>

          <!-- Search Bar -->
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

        <!-- Right side navbar icons and user profile -->
        <div class="flex items-center gap-5">
          <a href=""
            ><Bell
              :size="18"
              class="text-gray-500 cursor-pointer hover:text-blue-600"
          /></a>

          <a href="">
            <HelpCircle
              :size="18"
              class="text-gray-500 cursor-pointer hover:text-blue-600"
            />
          </a>

          <div class="w-px h-6 bg-gray-300"></div>

          <!-- User Info -->
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm font-medium">Alex Rivera</p>
              <p class="text-xs text-gray-500">Floor Manager</p>
            </div>

            <a href="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ztrAc-9_3lz9yKylT78HXXyD89WfpMU46w&s"
                alt="profile"
                class="w-10 h-10 rounded-full object-cover"
              />
            </a>
          </div>
        </div>
      </header>

      <!-- Page Content - This renders the current route's component -->
      <main class="flex-1 p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
