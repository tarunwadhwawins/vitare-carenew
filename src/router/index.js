import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import( '@/components/Test'),
  },
  {
    path: '/',
    name: 'Login',
    component: () => import( '@/components/login/login')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/components/dashboard/dashboard')
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '@/components/communications/Communications')
  },

  {
    path: '/manage-care-coordinator',
    name: 'Manage Care Coordinators',
    component: () => import( '@/components/care-coordinator/manage-care-coordinator')
  },

  {
    path: '/manage-patients',
    name: 'Patients',
    component: () => import( '@/components/patients/patients')
  },
  {
    path: '/appointment-calendar',
    name: 'Appointmnet Calendar',
    component: () => import( '@/components/appoinment-calendar/appointment-calendar')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import( '@/components/login/login')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
