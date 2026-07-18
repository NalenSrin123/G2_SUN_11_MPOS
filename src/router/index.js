import { createRouter, createWebHistory } from "vue-router";

// Page components
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
import UserSetting from "@/pages/dashboard/setting/UserSetting.vue";
import Design_Product_List from "@/pages/dashboard/Design_Product_List.vue";
import Design_Menu_Category from "@/pages/dashboard/Design_Menu_Category.vue";
import Update_payment from "@/pages/dashboard/Update_payment.vue";
import TableManagement from "@/pages/dashboard/teble_management.vue";
import Overview from "@/pages/dashboard/Overview.vue";
import InventoryList from "@/pages/dashboard/InventoryList.vue";
import FromInventory from "../pages/dashboard/FromInventory.vue";
import DesignPopularChoice from "../pages/home/DesignPopularChoice.vue";
import Design_Payment_Page from "../pages/home/Payment_page.vue";
import Design_History_Page from "../pages/home/Design_History_Page.vue";
import MainMenu from "@/pages/home/main_menu.vue";
import Cart from "@/pages/home/Design_listcartpage.vue";
import Scan_To_pay from "../pages/home/home/Scan_To_pay.vue";
import Product_Detail from "../pages/home/Product_Detail.vue";
import Update_Product from "../pages/dashboard/Update_Product.vue";

// ពិនិត្យថាតើអ្នកប្រើបានចូលគណនីរួចហើយឬនៅ (មាន token ត្រឹមត្រូវ)
function isAuthenticated() {
  return !!localStorage.getItem("auth_token");
}

const routes = [
  // Auth
  { path: "/login", name: "login", component: Login, meta: { guestOnly: true } },
  { path: "/register", name: "register", component: Register, meta: { guestOnly: true } },
  { path: "/verify_otp", component: Verify_otp, meta: { guestOnly: true } },
  { path: "/forgot_password", component: Forgot_Password, meta: { guestOnly: true } },
  { path: "/reset_password", component: ResetPassword, meta: { guestOnly: true } },

  // Dashboard (ត្រូវការចូលគណនីសិន)
  {
    path: "/dashboard",
    component: Sidebar,
    meta: { requiresAuth: true }, // 👈 សម្គាល់ថា dashboard branch ត្រូវការ auth
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
      {
        path: "table_management",
        name: "dashboard-table-management",
        component: TableManagement,
      }, // 👈 លុប route ស្ទួនចេញ (មុននេះមាន ២ដង)
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

  // Home
  {
    path: "/",
    children: [
      { path: "/", component: Home },
      { path: "/home", component: Home },
      { path: "/product-detail", component: Product_Detail },
      { path: "/payment-page", component: Design_Payment_Page },
      { path: "/orderHistory", component: Design_History_Page },
      {
        path: "/popularChoices",
        component: DesignPopularChoice,
      },
      { path: "/main-menu", component: MainMenu },
      { path: "/cart", name: "cart", component: Cart },
      {
        path: "/scan-to-pay",
        component: Scan_To_pay,
      },
      { path: "/update_product", component: Update_Product },
      // 👈 wildcard route ត្រូវតែដាក់ចុងក្រោយបំផុត បើមិនដូច្នេះទេ វានឹងស៊ូតគ្រប់ path មុនគេ
      { path: "/:pathMatch(.*)*", component: NotFound },
    ],
  },
];

/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Navigation guard: ត្រួតពិនិត្យមុននឹងចូលទៅផ្លូវណាមួយដែលត្រូវការ auth
router.beforeEach((to) => {
  const authenticated = isAuthenticated();
  const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  if (requiresAuth && !authenticated) {
    // 🚫 មិនទាន់ចូលគណនី ឬ ចូលគណនីមិនបានសម្រេច -> មិនអាចចូល dashboard បានទេ
    // បញ្ជូនទៅទំព័រ Login ភ្លាមៗ ព្រមទាំងរក្សាទុក path ដើម (to.fullPath) ជា query "redirect"
    // ដើម្បីអាចត្រឡប់មកទំព័រនោះវិញដោយស្វ័យប្រវត្តិ ក្រោយ login ជោគជ័យ
    return { name: "login", query: { redirect: to.fullPath } };
  }

  // Keep authenticated users out of login/register pages.
  if (to.meta.guestOnly && authenticated) return { name: "dashboard" };

  return true;
});

export default router;
