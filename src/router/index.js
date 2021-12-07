import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( '@/components/Test'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/Login')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/views/dashboard/Dashboard')
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '@/components/communications/Communications')
  },

  {
    path: '/manage-care-coordinator',
    name: 'Manage Care Coordinators',
    component: () => import( '@/views/manage-care-coordinator/ManageCareCoordinator')
  },

  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import( '../components/tasks/tasks')
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
  },

  {
    path: '/patients-summary',
    name: 'PatientSummary',
    component: () => import( '@/components/patient-summary/patientsummary')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
