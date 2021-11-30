import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/components/login/Login')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/components/dashboard/Dashboard')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
