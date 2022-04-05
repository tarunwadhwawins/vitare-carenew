// import router from "../../router/index"
// import {enCodeString} from "@/commonMethods/commonMethod";

export const getVideoDetails = (state, data) => {
    state.getVideoDetails = data[0]
 }

 
 export const acceptVideoCallDetails = (state, data) => {
    state.acceptVideoCallDetails = data
 }

 

 export const conferenceId = (state, data) => {
   state.conferenceId = data
   // router.push({ name: 'videoCall', params: { id: enCodeString(state.conferenceId) } })
}