
// Read api url from env file
const API_URL =  process.env.VUE_APP_API_URL

// API end points 
export const API_ENDPOINTS = {
    LOGIN: "login",
    Logout: "logout",
    CallPerStaff:"call/staff",
    communicationsList:"communication",
    patientsList:"patient",
    
};

// export const getApiUrl = key => {
//     return API_URL + API_ENDPOINTS[key];
// };