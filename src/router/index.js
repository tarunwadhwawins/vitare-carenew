import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/',
    name: 'Login',
    component: () => import( '../components/login/Login')
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
