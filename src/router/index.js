import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'

const routes = [
  // Default route
  { path: '/', redirect: '/preview' },

  // Preview page
  { path: '/preview', component: Preview },

  // Dashboard
  { path: '/dashboard', component: Dashboard },

  { path: '/register', component: Register },

  // Home
  { path: '/home', component: Home },
  { path: '/reset_password', component: ResetPassword },

  // 404
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router