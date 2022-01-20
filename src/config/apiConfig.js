
// Read api url from env file
const API_URL =  process.env.VUE_APP_API_URL

// API end points 
export const API_ENDPOINTS = {
    LOGIN: "login",
    Logout: "logout",
    CallPerStaff:"call/staff",
    communicationsList:"communication",
    patientsList:"patient",
    patientDetails:"patient",
    
    TodayAppointment:"appointment/today",
    CallStatus:"call/status",
    TotalPaitient:"patient/total",
    ActivePaitient:"patient/active",
    InActivePaitient:"patient/inActive",
    AbnormalPaitient:"patient/abnormal",
    NewPaitient:"patient/new",
    CriticalPaitient:"patient/critical",
    PatientCondition:"patient/condition",
    Financial:"patient/condition",
    CptCode:"patient/condition",
    Network:"staff/network",
    Specialization:"staff/specialization",
    TotalPatientsChart:"count/patient",
    AppointmentChart:"count/appointment",
    futureAppointments:"appointment/future",
    newRequests:"appointment/new",
    communicationTypes:"communication/type",
    addCommunication:"communication/1",
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };