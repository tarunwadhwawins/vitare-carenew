import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/Login'),
    meta: { guestOnly: true }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import( '@/components/Test'),
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import( '@/views/dashboard/Dashboard'),
    meta: { authOnly: true }
  },

  {
    path: '/communications',
    name: 'Communications',
    component: () => import( '@/components/communications/Communications'),
    meta: { authOnly: true }
  },

  {
    path: '/manage-care-coordinator',
    name: 'Manage Care Coordinators',
    component: () => import( '@/views/manage-care-coordinator/ManageCareCoordinator'),
    meta: { authOnly: true }
  },

  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import( '../components/tasks/tasks'),
    meta: { authOnly: true }
  },

  {
    path: '/manage-patients',
    name: 'Patients',
    component: () => import( '@/components/patients/Patients'),
    meta: { authOnly: true }
  },

  {
    path: '/appointment-calendar',
    name: 'Appointmnet Calendar',
    component: () => import( '@/components/appointment-calendar/AppointmentCalendar'),
    meta: { authOnly: true }
  },

  {
    path: '/patients-summary',
    name: 'PatientSummary',
    component: () => import( '@/components/patient-summary/patientsummary'),
    meta: { authOnly: true }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes

})

// router.beforeEach((to, from, next) => {
//   const loggedIn = localStorage.getItem('user');
//   if (!loggedIn) {  
//     next('/login');
  
//   } else {

//     next();
//   }
// });


function isLoggedIn() {
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!isLoggedIn()) {
          next({
              name: "Login",
              // query: { redirect: to.fullPath },

          });
          // all tabs logined user logout with page reload
          // location.reload();
      } else {
          next();
      }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (isLoggedIn()) {
          next({
              name: "Dashboard",
              query: { redirect: to.fullPath }
          });
      } else {
          next();
      }
  } else {
      next(); // make sure to always call next()!
  }
})

export default router
