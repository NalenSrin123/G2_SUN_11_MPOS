import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import Forgot_Password from '@/pages/auth/Forgot_Password.vue'
import FromInventory from '@/pages/dashboard/FromInventory.vue'






// Dashboard page components for sidebar navigation
//=======================================================================================
import Overview from '@/pages/dashboard/components/Overview.vue'
import Order from '@/pages/dashboard/components/Order.vue'
import Product from '@/pages/dashboard/components/Product.vue'
import Inventory from '@/pages/dashboard/components/Inventory.vue'
import Setting from '@/pages/dashboard/components/Setting.vue'
//========================================================================================




const routes = [
  // Default route
  { path: '/', redirect: '/preview' },

  // Preview page
  { path: '/preview', component: Preview },

  // Dashboard
  { path: '/dashboard', component: Dashboard },

  {
    path: '/item' , component: FromInventory
  },

  /**
   * Authentication routes
   */
  { path: '/register', component: Register },

  // Home
  { path: '/home', component: Home },
  { path: '/reset_password', component: ResetPassword },

  // 404
  { path: '/:pathMatch(.*)*', component: NotFound },
  {
    path:"/ResetPassword",
    component:ResetPassword,

    path: '/forgot_password',
    component:Forgot_Password
  }
]


/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router