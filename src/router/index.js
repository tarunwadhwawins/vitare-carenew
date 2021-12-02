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
    name: 'Manage Care Coordinators',
    component: () => import( '@/components/care-coordinator/CareCoordinator')
  },

  {
    path: '/manage-patients',
    name: 'Patients',
    component: () => import( '@/components/patients/Patients')
  },
  {
    path: '/appointment-calendar',
    name: 'Appointmnet Calendar',
    component: () => import( '@/components/appointment-calendar/AppointmentCalendar')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
