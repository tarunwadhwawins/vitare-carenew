

// API end points 
export const API_ENDPOINTS = {
    // Authentication
    login: "login",
    logout: "logout",
    refreshToken: "refreshToken",

    // Patients
    patient:"patient",
    patientsList:"patient",
    patientDetails:"patient",
    counterCard:"patient/count",
    financial:"patient/count",
    cptCode:"patient/count",
    totalPatientsChart:"patient/chart",
    timeLine:"patient/new",
    
    // Appointments
    appointment:"appointment",
    todayAppointment:"appointment/today",
    appointmentChart:"appointment/summary",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",
    addAppointment:"appointment",
    seacrhAppointment:"appointment/search",

    // Staff
    staffList:"staff",
    specialization:"staff/specialization",
    network:"staff/network",

    // Communications
    communicationsList:"communication",
    communicationTypes:"communication/type",
    addCommunication:"communication",
    communicationsCount:"communication/count",
    callStatus:"call/status",
    CallPlanned:"call/staff",

    // Tasks
    addTask:"task",
    tasksList:"task",
    taskStatus:"task/status",
    taskPriority:"task/priority",
    searchTasks:"task/search",
    taskTeamMember:'task/staff',
    taskCategory:'task/category',

    
    // Global Codes
    globalCodesList: 'globalCodeCategory',
    globalCode: 'globalCode',
    
    // inventory
    inventory: 'inventory',
    model: 'model',

    // Roles & Permissions
    role: 'role',
    rolesList: 'roleList',
    rolePermissions: 'permissionList',
    roleDetails: 'roleDetails',

    // Notes
    notes: 'patient/notes',

    // timeLogs
    timeLog: 'patient/timeLog',
    deleteTimeLog: 'deleteTimeLog',

    //Thresholds
    getVital:'field',
    generalParameter:'generalParameterGroup',

    

};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };