import { createRouter, createWebHistory } from "vue-router";

// Page components
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import Sidebar from "@/pages/dashboard/Sidebar.vue";
import Orders from "@/pages/dashboard/Design_Orders_Page.vue";
import Register from "@/pages/auth/Register.vue";
import Login from "@/pages/auth/Login.vue";
import Preview from "@/pages/preview/Preview.vue";
import Home from "@/pages/home/Home.vue";
import NotFound from "@/pages/NotFound.vue";
import ResetPassword from "@/pages/auth/ResetPassword.vue";
import Forgot_Password from "@/pages/auth/Forgot_Password.vue";
import Verify_otp from "@/pages/auth/Verify_OTP.vue";
import AddProduct from "@/pages/dashboard/AddProduct.vue";
import DesignPageCreateTable from "@/pages/dashboard/DesignPageCreateTable.vue";
import UserSetting from "@/pages/dashboard/setting/UserSetting.vue";
import Design_Product_List from "@/pages/dashboard/Design_Product_List.vue";
import Design_Menu_Category from "@/pages/dashboard/Design_Menu_Category.vue";
import Update_payment from "@/pages/dashboard/Update_payment.vue";
import TableManagement from "@/pages/dashboard/teble_management.vue";
import Overview from "@/pages/dashboard/Overview.vue";
import InventoryList from "@/pages/dashboard/InventoryList.vue";
import FromInventory from "../pages/dashboard/FromInventory.vue";
import DesignPopularChoice from '../pages/home/DesignPopularChoice.vue'
import Design_Payment_Page from '../pages/home/Payment_page.vue'
import Design_History_Page from '../pages/home/Design_History_Page.vue'
import MainMenu from '@/pages/home/main_menu.vue'
import Cart from '@/pages/home/Design_listcartpage.vue'
import Scan_To_pay from '../pages/home/home/Scan_To_pay.vue'
import Product_Detail from '../pages/home/Product_Detail.vue'
function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}
const routes = [
  //Auth
  {
    path:"/auth",
    children:[
      { path: "/login", component: Login },
      { path: "/register", component: Register },
      { path: "/verify_otp", component: Verify_otp },
      { path: "/forgot_password", component: Forgot_Password },
      { path: "/reset_password", component: ResetPassword },
    ]
  },
  // Dashboard
  {
    path: "/dashboard",
    component: Sidebar,
    children: [
      { path: "", name: "dashboard", component: Overview },
      { path: "orders", name: "dashboard-orders", component: Orders },
      {
        path: "inventory",
        name: "dashboard-inventory",
        component: InventoryList,
      },
      { path: "table", name: "dashboard-table", component: TableManagement },
      {
        path: "product",
        name: "dashboard-product",
        component: Design_Product_List,
      },
      {
        path: "category",
        name: "dashboard-category",
        component: Design_Menu_Category,
      },
      {
        path: "payment",
        name: "dashboard-payment",
        component: Update_payment,
      },
      {
        path: "setting",
        name: "dashboard-setting",
        component: UserSetting,
      },
      { path: "table_management", component: TableManagement },
      { path: 'table_management', component: TableManagement },
    ],
  },

  // {
  //   path: "/add_new_products",
  //   component: AddProduct,
  // },
  // {
  //   path: "/create_table",
  //   component: DesignPageCreateTable,
  // },
  // {
  //   path: "/setting",
  //   component: UserSetting,
  // },
  // { path: "/productlist", component: Design_Product_List },
  // { path: "/menu_category", component: Design_Menu_Category },
  // {
  //   path: "/update_payment",
  //   component: Update_payment,
  // },

  // {
  //   path: "/dashboard/categories/new",
  //   component: Design_New_Category,
  //   meta: { requiresAuth: false },
  // },
//  Public
  {
    path:"/",
    children:[
      { path: '/home', component: Home },
      { path: '/product-detail', component: Product_Detail },
      {path :'/payment-page' ,component:Design_Payment_Page},

      { path: '/orderHistory', component: Design_History_Page },
      { path: '/:pathMatch(.*)*', component: NotFound },
      {
        path: '/popularChoices',
        component:DesignPopularChoice,
      },
      { path: '/main-menu', component: MainMenu },
      { path: '/cart', name: 'cart', component: Cart },
      {
        path: '/scan-to-pay' , component: Scan_To_pay
      },
    ]
  },
]
/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
