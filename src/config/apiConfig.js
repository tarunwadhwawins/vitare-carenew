
// Read api url from env file
const API_URL =  process.env.VUE_APP_API_URL

// API end points 
export const API_ENDPOINTS = {
    LOGIN: "login",
    Logout: "logout",
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
    TotalPatientsChart:"patient/condition",
    AppointmentChart:"patient/condition",
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };