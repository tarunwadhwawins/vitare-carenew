import { timeStampToTime, dateFormat } from "../../commonMethods/commonMethod"
import moment from "moment"
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

  let record = []
  if (data.key == 3) {

    state.weekName.forEach(element => {
      let obj = data.data.find(appointment => (moment(dateFormat(appointment.date))).format('dddd') === element)
      if (typeof obj === 'undefined') {
        let value_obj = {
          "time": element,
          "data": [],

        };
        record.push(value_obj);
      } else {
        let value_obj_get = {
          "time": element,
          "data": [obj]
        }
        record.push(value_obj_get);
      }
    })
  } else {
    const officeTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]
    officeTime.forEach(element => {
      let obj = data.data.find(appointment => timeStampToTime(appointment.time, 'hh:00 A') === element)
      if (typeof obj === 'undefined') {
        let value_obj = {
          "time": element,
          "data": [],

        };
        record.push(value_obj);
      } else {
        let value_obj_get = {
          "time": element,
          "data": [obj]
        }
        record.push(value_obj_get);
      }
    });
  }
  console.log(record)
  state.searchAppointmentRecords = record;

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
