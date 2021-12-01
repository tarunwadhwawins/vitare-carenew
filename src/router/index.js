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
  },
  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '@/components/communications/Communications')
  },
  {
    path: '/manage-care-coordinator',
    name: 'Manage Care Coordinator',
    component: () => import( '@/components/care-coordinator/CareCoordinator')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
