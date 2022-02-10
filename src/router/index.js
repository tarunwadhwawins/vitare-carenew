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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { authAdmin: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/views/dashboard/Dashboard'),
    meta: { authAdmin: true }
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '../components/communications/Communications'),
    meta: { authAdmin: true }
  },

  {
    path: '/manage-care-coordinator',
    name: 'ManageCareCoordinators', 
    component: () => import( '@/views/manage-care-coordinator/ManageCareCoordinator'),
    meta: { authAdmin: true }
  },

  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import( '../components/tasks/tasks'),
    meta: { authAdmin: true }
  },

  {
    path: '/manage-patients',
    name: 'Patients',
    component: () => import( '@/views/patients/Patients') ,
    meta: { authAdmin: true }
  },

  {
    path: '/appointment-calendar',
    name: 'AppointmnetCalendar',
    component: () => import( '@/views/appoinment-calendar/AppointmentCalendar'),
    meta: { authAdmin: true }
  },

  {
    path: '/patients-summary',
    name: 'PatientSummary',
    component: () => import( '../components/patients/patientSummary/PatientSummary'),
    meta: { authAdmin: true }
  },
  
  {
    path: '/coordinator-summary',
    name: 'CoordinatorSummary',
    component: () => import( '../components/coordinator-summary/Coordinatorsummary'),
    meta: { authAdmin: true }
  },
  {
    path: '/time-tracking-report',
    name: 'TimeTrackingReport',
    component: () => import( '../components/time-tracking-report/TimeTrackingReport'),
    meta: { authAdmin: true }
  },
  {
    path: '/thresholds',
    name: 'Thresholds',
    component: () => import( '../components/thresholds/Thresholds'),
    meta: { authAdmin: true }
  },
  {
    path: '/time-log-report',
    name: 'TimeLogReport',
    component: () => import( '../components/time-log-report/TimeLogReport'),
    meta: { authAdmin: true }
  },
  {
    path: '/video-call',
    name: 'videoCall',
    component: () => import( '../components/video-call/videoCall'),
    meta: { authAdmin: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import( '../components/reset-password/ResetPassword'),
    meta: { authAdmin: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import( '../components/forgot-password/ForgotPassword'),
    meta: { authAdmin: true }
  },

  {
    path: '/',
    name: 'Login',
    component: () => import( '@/views/login/Login')
  },

  {
    path: '/admin-dashboard',
    name: 'admin',
    component: () => import( '../components/administration/dashboard/Dashboard'),
    meta: { authAdmin: true }
  },

  {
    path: '/manage-staff',
    name: 'Manage Staff',
    component: () => import( '../components/administration/manage-staff/Managestaff'),
    meta: { authAdmin: true }
  },
  {
    path: '/care-coordinator',
    name: 'ManageCareCoordinator',
    component: () => import( '../components/administration/care-coordinator/ManageCareCoordinator'),
    meta: { authAdmin: true }
  },

  {
    path: '/reports',
    name: 'Reports',
    component: () => import( '../components/administration/reports/Reports'),
    meta: { authAdmin: true }
  },

  {
    path: '/templates',
    name: 'Templates',
    component: () => import( '../components/administration/templates/Templates'),
    meta: { authAdmin: true }
  },

  {
    path: '/global-codes',
    name: 'Global Codes',
    component: () => import( '../components/administration/globalCodes/Globalcode'),
    meta: { authAdmin: true }
  },

  {
    path: '/manage-programs',
    name: 'Manage Program',
    component: () => import( '../components/administration/manage-programs/Manageprogram'),
    meta: { authAdmin: true }
  },

  {
    path: '/providers',
    name: 'Manage Providers',
    component: () => import( '../components/administration/providers/Providers'),
    meta: { authAdmin: true }
  },

  {
    path: '/provider-summary',
    name: 'Provider Summary',
    component: () => import( '../components/administration/providers/ProviderSummary'),
    meta: { authAdmin: true }
  },

  {
    path: '/roles-and-permissions',
    name: 'Roles & Permissions',
    component: () => import( '../components/administration/rolesAndPermissions/RolesAndPermissions'),
    meta: { authAdmin: true }
  },
  {
    path: '/cpt-codes',
    name: 'CPT Codes',
    component: () => import( '../components/administration/cpt-codes/Cptcodes'),
    meta: { authAdmin: true }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import( '../components/administration/inventory/Inventory'),
    meta: { authAdmin: true }
  },

  {
    path: '/test',
    name: 'Test',
    component: () => import( '../components/Test.vue'),
    meta: { authAdmin: false  }
  },
  {
    path: '/test-list',
    name: 'Test List',
    component: () => import( '../components/TestList.vue'),
    meta: { authAdmin: true }
  },
  {
    path: '/scroll',
    name: 'Scroll',
    component: () => import( '../components/Scroll.vue'),
    meta: { authAdmin: true }
  },
  {
    path: '/infinite-scroll',
    name: 'Infinite Scroll',
    component: () => import( '../components/InfiniteScroll.vue'),
    meta: { authAdmin: true }
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
function isLoggedIn() {
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
if (to.matched.some(record => record.meta.authAdmin) ) {
  
    if (!isLoggedIn()) {
     
        next({
            name: "Login",
            query: { redirect: to.fullPath },

        });
    } else {
        next();
    }
}else{
  if (isLoggedIn()) {
    console.log("login",isLoggedIn())
      next({
          name: "Dashboard",
          query: { redirect: to.fullPath },

      });
  } else {
      next();
  }
}
})
export default router
