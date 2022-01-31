
// Read api url from env file
const API_URL =  process.env.VUE_APP_API_URL

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
    TotalPatientsChart:"count/patient",
    AppointmentChart:"count/appointment",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",
    communicationTypes:"communication/type",
    addCommunication:"communication",
    TimeLine:"patient/new",
    communicationsCount:"communication/count",

    addTask:"task",
    tasksList:"task",
    taskStatus:"task/status",
    taskPriority:"task/priority",
    searchTasks:"task/search",
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };