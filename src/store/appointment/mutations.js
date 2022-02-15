import { responseConvert } from "../../commonMethods/commonMethod"

export const addStaff = async (state, data) => {
  state.addStaff = data;
}

export const errorMsg = (state, data) => {
  state.errorMsg = data
}
export const successMsg = (state, data) => {
  state.successMsg = data
}
export const searchAppointmentSuccess = async (state, data) => {

  if (data.key == 3) {
    state.searchAppointmentRecords = responseConvert(state.weekName, data.data, 'dddd')
  } else {
    let officeTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]
    state.searchAppointmentRecords = responseConvert(officeTime, data.data, 'hh:00 A')
  }

}
export const GetWeekName = (state, date) => {
  let from = date.from
  let dayName = []
  for (var i = 0; i < 7; i++) {
    var day = from.add(1, 'days');
    dayName.push(day.format('dddd'))
  }
  state.weekName = dayName
}
export const calendarDateSelect = (state, date) => {
  state.calendarDate = date
}
export const latestAppointmentSuccess = (state, data) => {
  state.latestAppointment = data
}
