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
      let recordList = []
      data.data.forEach(value => {
        if ((moment(dateFormat(value.date))).format('dddd') === element) {
          recordList.push(value);
        }

      });
      if (recordList.length > 0) {
        let value_obj_get = {
          "time": element,
          "data": recordList
        }
        record.push(value_obj_get);
      } else {
        let value_obj = {
          "time": element,
          "data": [],

        };
        record.push(value_obj);
      }
    });
  } else {
    
    let officeTime = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]
    officeTime.forEach(element => {
      let recordList = []
      
      data.data.forEach(value => {
        
        if (timeStampToTime(value.time, 'hh:00 A') === element) {
          recordList.push(value);
        }

      });
      if (recordList.length > 0) {
        let value_obj_get = {
          "time": element,
          "data": recordList
        }
        record.push(value_obj_get);
      } else {
        let value_obj = {
          "time": element,
          "data": [],

        };
        record.push(value_obj);
      }
    });
  }
 
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
