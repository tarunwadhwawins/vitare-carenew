export const callPerStaffSuccess = (state, count) => {
    state.callPerStaffName=count.map((item) => {return item.staff})
    state.callPerStaffCount = count.map((item) => {return item.count });
    //console.log(state.callPerStaffName)
}
// export const callQueueSuccess = (state, count) => {
//     state.callPerStaffName=count.map((item) => {return item.staff})
//     state.callPerStaffCount = count.map((item) => {return item.count });
//     //console.log(state.callPerStaffName)
// }
// export const waittinRoomSuccess = (state, count) => {
//     state.callPerStaffName=count.map((item) => {return item.staff})
//     state.callPerStaffCount = count.map((item) => {return item.count });
//     //console.log(state.callPerStaffName)
// }
// export const communicationTypeSuccess = (state, count) => {
//     state.callPerStaffName=count.map((item) => {return item.staff})
//     state.callPerStaffCount = count.map((item) => {return item.count });
//     //console.log(state.callPerStaffName)
// }
export const failure = (state, error) => {
    state.errorMsg = error;
}