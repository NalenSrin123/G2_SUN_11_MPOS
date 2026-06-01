/*
|--------------------------------------------------------------------------
| File: router/index.js
|--------------------------------------------------------------------------
|
| Description:
| Defines the application routes and navigation behavior using Vue Router.
|
| Responsibilities:
| - Map URL paths to page components
| - Configure default entry route
| - Organize public and feature routes
|
| Notes:
| - The root path ("/") currently redirects to "/preview" for demo purposes
| - Update the root route to Home when moving to production
|
*/

import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'





// Dashboard page components for sidebar navigation
//=======================================================================================
import Overview from '@/pages/dashboard/components/Overview.vue'
import Order from '@/pages/dashboard/components/Order.vue'
import Product from '@/pages/dashboard/components/Product.vue'
import Inventory from '@/pages/dashboard/components/Inventory.vue'
import Setting from '@/pages/dashboard/components/Setting.vue'
//========================================================================================




/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [
  /**
   * Default entry route
   * Redirects "/" to "/preview" to showcase the project structure
   */
  { path: '/', redirect: '/preview' },

  /**
   * Preview page (landing/demo screen)
   * Displays project structure and navigation examples
   */
  { path: '/preview', component: Preview },

  /**
   * Main application dashboard
   * Typically requires authentication (can add guards later)
   */
  { path: '/dashboard', component: Dashboard },




   /**
   * Dashboard feature routes (for sidebar navigation)
   */
  //====================================================================
  { path: '/overview', component: Overview },
  { path: '/orders', component: Order },
  { path: '/products', component: Product },
  { path: '/inventory', component: Inventory },
  { path: '/settings', component: Setting },
  //====================================================================




  /**
   * Authentication routes
   */
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  /**
   * Optional home route (disabled for now)
   * Uncomment when switching from preview to real landing page
   */
  // { path: '/', component: Home },
  { path: '/home', component: Home },

  /**
   * Catch-all route
   * Displays a styled 404 page for unknown paths
   */
  { path: '/:pathMatch(.*)*', component: NotFound },
]

/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router