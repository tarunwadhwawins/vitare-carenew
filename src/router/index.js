import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( '@/components/Test'),
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
  {
    path: '/manage-patients',
    name: 'Manage Patients',
    component: () => import( '@/components/patients/Patients')
  },
  {
    path: '/appointment-calendar',
    name: 'Appointment Calendar',
    component: () => import( '@/components/appointment-calendar/AppointmentCalendar')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
