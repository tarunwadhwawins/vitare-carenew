import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/login',
    // meta: { guestOnly: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/login/Login'),
    // meta: { guestOnly: true }
  },
  {
    path: '/test-employee',
    name: 'EmpDashboard',
    component: () => import( '@/components/Test'),
    meta: { authEmployee: true }
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
    component: () => import( '@/components/communications/Communications'),
    meta: { authAdmin: true }
  },

  {
    path: '/manage-care-coordinator',
    name: 'Manage Care Coordinators',
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
    component: () => import( '@/components/patients/Patients'),
    meta: { authAdmin: true }
  },

  {
    path: '/appointment-calendar',
    name: 'Appointmnet Calendar',
    component: () => import( '@/components/appointment-calendar/AppointmentCalendar'),
    meta: { authAdmin: true }
  },

  {
    path: '/patients-summary',
    name: 'PatientSummary',
    component: () => import( '@/components/patient-summary/patientsummary'),
    meta: { authAdmin: true }
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes

})



function isLoggedIn() {
  // console.log('auth',localStorage.getItem("auth"))
  return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authAdmin) && isLoggedIn()=='MasterLogin') {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!isLoggedIn()=='MasterLogin') {
          next({
              name: "Login",
              query: { redirect: to.fullPath },

          });
          // all tabs logined user logout with page reload
          // location.reload();
      } 
      else {
          next();
      }
  }if (to.matched.some(record => record.meta.authEmployee) && isLoggedIn()=='EmployeeLogin' ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()=='EmployeeLogin' ) {
        next({
            name: "Login",
            query: { redirect: to.fullPath },

        });
        // all tabs logined user logout with page reload
        // location.reload();
    } else {
        next();
    }
}else {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (isLoggedIn()==='MasterLogin') {
          next({
              name: "Dashboard",
              query: { redirect: to.fullPath }
          });
      }if(isLoggedIn()==='EmployeeLogin') {
        next({
          name: "EmpDashboard",
          query: { redirect: to.fullPath }
        });
      }
      else {
        next();
    }
  } 
})

export default router
