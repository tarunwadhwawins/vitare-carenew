import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

const routes = [
  // {
  //   path: '/',`
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/views/dashboard/Dashboard')
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '../components/communications/Communications')
  },

  {
    path: '/manage-care-coordinator',
    name: 'ManageCareCoordinators', 
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
    component: () => import( '@/views/patients/Patients') 
  },

  {
    path: '/appointment-calendar',
    name: 'AppointmnetCalendar',
    component: () => import( '@/views/appoinment-calendar/AppointmentCalendar')
  },

  {
    path: '/patients-summary',
    name: 'PatientSummary',
    component: () => import( '../components/patient-summary/patientsummary')
  },
  
  {
    path: '/corrdinator-summary',
    name: 'CoordinatorSummary',
    component: () => import( '../components/coordinator-summary/Coordinatorsummary')
  },
  {
    path: '/time-tracking-report',
    name: 'TimeTrackingReport',
    component: () => import( '../components/time-tracking-report/TimeTrackingReport')
  },
  {
    path: '/thresholds',
    name: 'Thresholds',
    component: () => import( '../components/thresholds/Thresholds')
  },
  {
    path: '/time-log-report',
    name: 'TimeLogReport',
    component: () => import( '../components/time-log-report/TimeLogReport')
  },
  {
    path: '/video-call',
    name: 'videoCall',
    component: () => import( '../components/video-call/videoCall')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import( '../components/reset-password/ResetPassword')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import( '../components/forgot-password/ForgotPassword')
  },

  {
    path: '/',
    name: 'Login',
    component: () => import( '@/views/login/Login')
  },

  {
    path: '/admin-dashboard',
    name: 'admin',
    component: () => import( '../components/administration/dashboard/Dashboard')
  },

  {
    path: '/manage-staff',
    name: 'Manage Staff',
    component: () => import( '../components/administration/manage-staff/Managestaff')
  },
  {
    path: '/care-coordinator',
    name: 'ManageCareCoordinator',
    component: () => import( '../components/administration/care-coordinator/ManageCareCoordinator')
  },

  {
    path: '/reports',
    name: 'Reports',
    component: () => import( '../components/administration/reports/Reports')
  },

  {
    path: '/templates',
    name: 'Templates',
    component: () => import( '../components/administration/templates/Templates')
  },

  {
    path: '/global-codes',
    name: 'Global Codes',
    component: () => import( '../components/administration/global-codes/Globalcode')
  },

  {
    path: '/manage-programs',
    name: 'Manage Program',
    component: () => import( '../components/administration/manage-programs/Manageprogram')
  },

  {
    path: '/manage-providers',
    name: 'Manage Providers',
    component: () => import( '../components/administration/manage-providers/Manageproviders')
  },

  {
    path: '/provider-summary',
    name: 'Provider Summary',
    component: () => import( '../components/administration/provider-summary/Providersummary')
  },

  {
    path: '/roles-permission',
    name: 'Roles Permission',
    component: () => import( '../components/administration/roles-permissions/Rolespermissions')
  },
  {
    path: '/cpt-codes',
    name: 'CPT Codes',
    component: () => import( '../components/administration/cpt-codes/Cptcodes')
  },

  {
    path: '/test',
    name: 'Test',
    component: () => import( '../components/Test.vue')
  },
  {
    path: '/test-list',
    name: 'Test List',
    component: () => import( '../components/TestList.vue')
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
