import { createRouter, createWebHistory } from 'vue-router'

// ── Layouts ────────────────────────────────────────────────────────────────────
// Uncomment and adjust paths to match your actual layout files
// import DashboardLayout from '@/layouts/DashboardLayout.vue'
// import AuthLayout from '@/layouts/AuthLayout.vue'

// ── Route definitions ──────────────────────────────────────────────────────────
const routes = [

  // ── Auth ─────────────────────────────────────────────────────────────────────
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: { layout: 'auth', requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/auth/Register.vue'),
    meta: { layout: 'auth', requiresGuest: true },
  },

  // ── Home / Landing ────────────────────────────────────────────────────────────
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/Home.vue'),
    meta: { layout: 'default' },
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────────
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/dashboard/Dashboard.vue'),
    meta: { layout: 'dashboard', requiresAuth: true },
  },
  {
    path: '/dashboard/orders',
    name: 'Orders',
    component: () => import('../pages/dashboard/OrdersPage.vue'),
    meta: { layout: 'dashboard', requiresAuth: true },
  },

  // ── Preview ───────────────────────────────────────────────────────────────────
  {
    path: '/preview',
    name: 'Preview',
    component: () => import('@/pages/preview/Preview.vue'),
    meta: { layout: 'default' },
  },

  // ── 404 ───────────────────────────────────────────────────────────────────────
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
]

// ── Create router ──────────────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// ── Navigation guards ──────────────────────────────────────────────────────────
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_token') // adjust to your auth logic

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }

  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router