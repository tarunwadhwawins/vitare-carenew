

// API end points 
export const API_ENDPOINTS = {
    LOGIN: "login",
    Logout: "logout",
    CallPlanned:"call/staff",
    communicationsList:"communication",
    patientsList:"patient",
    staffList:"staff",
    patientDetails:"patient",
    
    TodayAppointment:"appointment/today",
    CallStatus:"call/status",
    CounterCard:"patient/count",
    Financial:"patient/count",
    CptCode:"patient/count",
    Network:"staff/network",
    Specialization:"staff/specialization",
    TotalPatientsChart:"patient/chart",
    AppointmentChart:"appointment/summary",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",
    communicationTypes:"communication/type",
    addCommunication:"communication",
    TimeLine:"patient/new",
    communicationsCount:"communication/count",
    searchCommunications:"communication/search",

    addTask:"task",
    tasksList:"task",
    taskStatus:"task/status",
    taskPriority:"task/priority",
    searchTasks:"task/search",
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };