

// API end points 
export const API_ENDPOINTS = {
    // Authentication
    LOGIN: "login",
    Logout: "logout",

    // Patients
    patientsList:"patient",
    patientDetails:"patient",
    CounterCard:"patient/count",
    Financial:"patient/count",
    CptCode:"patient/count",
    TotalPatientsChart:"patient/chart",
    TimeLine:"patient/new",
    
    // Appointments
    TodayAppointment:"appointment/today",
    AppointmentChart:"appointment/summary",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",

    // Staff
    staffList:"staff",
    Specialization:"staff/specialization",
    Network:"staff/network",

    // Communications
    communicationsList:"communication",
    communicationTypes:"communication/type",
    addCommunication:"communication",
    communicationsCount:"communication/count",
    CallStatus:"call/status",
    CallPlanned:"call/staff",

    // Tasks
    addTask:"task",
    tasksList:"task",
    taskStatus:"task/status",
    taskPriority:"task/priority",
    searchTasks:"task/search",

    addAppointment:"appointment",
    seacrhAppointment:"appointment/search",
    // Global Codes
    globalCodesList: 'globalCodeCategory',
    globalCode: 'globalCode',

    // inventory
    inventory: 'inventory',
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };