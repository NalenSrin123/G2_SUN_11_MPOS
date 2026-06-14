import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Sidebar from '@/pages/dashboard/Sidebar.vue'
import Orders from '@/pages/dashboard/Design_Orders_Page.vue'
import Register from '@/pages/auth/Register.vue'
import Login from '@/pages/auth/Login.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import Forgot_Password from '@/pages/auth/Forgot_Password.vue'
import FromInventory from '@/pages/dashboard/FromInventory.vue'
import Verify_otp from '@/pages/auth/Verify_OTP.vue'
import InventoryList from '@/pages/dashboard/InventoryList.vue'
import AddProduct from '../pages/dashboard/AddProduct.vue'
import DesignPageCreateTable from '../pages/dashboard/DesignPageCreateTable.vue'
import UserSetting from '../pages/dashboard/setting/UserSetting.vue'
import Design_Product_List from '../pages/dashboard/Design_Product_List.vue'
import Design_Menu_Category from '../pages/dashboard/Design_Menu_Category.vue'
import Update_payment from '../pages/dashboard/update_payment.vue'
/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [
  // Default route
  { path: '/', redirect: '/preview' },

  // Preview page
  { path: '/preview', component: Preview },

  // Dashboard
  {
    path: '/dashboard',
    component: Sidebar,
    children: [
      { path: '', name: 'dashboard', component: Dashboard },
      { path: 'orders', name: 'dashboard-orders', component: Orders },
      { path: 'inventory', name: 'dashboard-inventory', component: FromInventory },
    ],
  },
  { path: '/item', redirect: '/dashboard/inventory' },
  {
    path: '/inventory_list' , component: InventoryList
  },
  {
    path:'/add_new_products',component:AddProduct
  },
  {
    path:'/create_table',
    component:DesignPageCreateTable,
  },
  {
    path: '/setting' , component: UserSetting
    
  },
  {path: '/productlist',component: Design_Product_List},
  {path:'/menu_category',component:Design_Menu_Category},
  {
    path: '/update_payment' , component: Update_payment
  },

  /**
   * Authentication routes
   */
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/verify_otp', component: Verify_otp },
  { path: '/forgot_password', component: Forgot_Password },
  { path: '/reset_password', component: ResetPassword },

  // Home
  { path: '/home', component: Home },

  // 404
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
