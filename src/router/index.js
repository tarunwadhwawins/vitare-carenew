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
    component: () => import( '../components/dashboard/Dashboard')
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '../components/communications/Communications')
  },

  {
    path: '/manage-care-coordinator',
    name: 'ManageCareCoordinators',
    component: () => import( '../components/care-coordinator/ManageCareCoordinator')
  },

  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import( '../components/tasks/tasks')
  },

  {
    path: '/manage-patients',
    name: 'Patients',
    component: () => import( '../components/patients/Patients')
  },

  {
    path: '/appointment-calendar',
    name: 'AppointmnetCalendar',
    component: () => import( '../components/appoinment-calendar/AppointmentCalendar')
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
    path: '/',
    name: 'Login',
    component: () => import( '../components/login/Login')
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
    path: '/roles-permission',
    name: 'Roles Permission',
    component: () => import( '../components/administration/roles-permissions/Rolespermissions')
  },
  {
    path: '/cpt-codes',
    name: 'CPT Codes',
    component: () => import( '../components/administration/cpt-codes/Cptcodes')
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
