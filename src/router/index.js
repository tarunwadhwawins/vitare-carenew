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
    path: '/questionnaire',
    name: 'Questionnaire',
    component: () => import( '../components/administration/questionnaire/Questionnaire')
  },
  {
    path: '/questionnaire-bank',
    name: 'QuestionnaireBank',
    component: () => import( '../components/administration/questionnaire-bank/QuestionnaireBank')
  },
  {
    path: '/questionnaire-detail',
    name: 'QuestionnaireDetail',
    component: () => import( '../components/administration/questionnaire-detail/QuestionnaireDetail')
  },
  {
    path: '/questionnaire-template',
    name: 'QuestionnaireTemplate',
    component: () => import( '../components/administration/questionnaire-template/QuestionnaireTemplate')
  },
  {
    path: '/questionnaire-create-template',
    name: 'QuestionnaireCreateTemplate',
    component: () => import( '../components/administration/questionnaire-create-template/QuestionnaireCreateTemplate')
  },
  {
    path: '/question-template-detail',
    name: 'QuestionTemplateDetail',
    component: () => import( '../components/administration/question-template-detail/QuestionTemplateDetail')
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import( '../components/administration/resources/Resources')
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: () => import( '../components/administration/form-builder/FormBuilder')
  },
  {
    path: '/form-builder-detail',
    name: 'FormBuilderDetail',
    component: () => import( '../components/administration/form-builder-detail/FormBuilderDetail')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import( '../components/administration/groups/Groups')
  },
  {
    path: '/create-group',
    name: 'CreateGroups',
    component: () => import( '../components/administration/create-group/CreateGroups')
  },
  {
    path: '/form-list',
    name: 'FormList',
    component: () => import( '../components/administration/form-list/FormList')
  },
  {
    path: '/create-form',
    name: 'CreateForm',
    component: () => import( '../components/administration/create-form/CreateForm')
  },
  {
    path: '/question-template-details',
    name: 'QuestionTemplateDetails',
    component: () => import( '../components/question-template-details/QuestionTemplateDetails')
  },
  {
    path: '/questionnaire-templates',
    name: 'QuestionnaireTemplates',
    component: () => import( '../components/questionnaire-templates/QuestionnaireTemplates')
  },


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
