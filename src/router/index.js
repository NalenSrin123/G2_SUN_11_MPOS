import { createRouter, createWebHistory } from 'vue-router'

import Dashboard   from '@/pages/dashboard/Dashboard.vue'
import Login       from '@/pages/auth/Login.vue'
import Register    from '@/pages/auth/Register.vue'
import Preview     from '@/pages/preview/Preview.vue'
import Home        from '@/pages/home/Home.vue'
import NotFound    from '@/pages/NotFound.vue'
import Design_New_Category from '@/pages/dashboard/categories/Design_New_Category.vue'

function isAuthenticated() {
  return !!localStorage.getItem('auth_token')
}

const routes = [

  { path: '/', redirect: '/dashboard/categories/new' },

  { path: '/preview',   component: Preview },
  { path: '/dashboard', component: Dashboard },

  {
    path: '/dashboard/categories/new',
    component: Design_New_Category,
    meta: { requiresAuth: false }, 
  },

  { path: '/login',    component: Login },
  { path: '/register', component: Register },
  { path: '/home',     component: Home },

  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router