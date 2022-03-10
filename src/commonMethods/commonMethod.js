import Swal from "sweetalert2"
import moment from 'moment';


export function deCodeString(value) {
  let decode = window.btoa(value); // encode a string
  return decode.replace("=", '')
}

export function enCodeString(value) {
  return window.atob(value); // decode a string
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); //Capitalize a string
}

// swal for success message
export function successSwal(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  })
  Toast.fire({
    icon: 'success',
    title: message.split(' ').map(capitalize).join(' ')
  })
}

// swal for error message
export function errorSwal(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message.split(' ').map(capitalize).join(' '),
  })
}

// swal for warning message
export async function warningSwal(message) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
  if (result.isConfirmed) {
    return true
  } else {
    return false
  }
}

// Date for getting this format yyyy-MM-DD pass timeStamp
export function dateOnlyFormatSImple(timeStamp) {
  var day = moment.unix(new Date(timeStamp));
  return day.format('yyyy-MM-DD');
}

export function timeFormatSimple(timeStamp) {
  var day = moment.unix(new Date(timeStamp));
  return day.format('HH:mm');
}

export function dateOnlyFormat(timeStamp) {
  var day = moment.unix(new Date(timeStamp));
  return day.format('MMM DD, yyyy');
}

export function timerFromTimestamp(timeStamp) {
  var day = moment.unix(new Date(timeStamp));
  return day.format('HH:mm:ss');
}

export function dateFormat(date) {
  return moment.unix(date).format('MMM DD, yyyy, hh:mm A');
}

export function dateTimeFormat(date) {
  return moment.unix(date).format('MMM DD hh:mm A');
}

export function meridiemFormat(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice(1);
    time[4] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
    var newTime = (time[0] + time[1] + time[2] + time[4]).toString();
  }
  return newTime;
}

export function meridiemFormatFromTimestamp(time) {
  return moment.unix(time).format('hh:mm A');
}

export function dobFormat(date) {
  return moment(date).format('MMMM DD, YYYY');
}

export function dobFormat2(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function timeOnly(date) {
  var day = moment.unix(new Date(date));
  return String(day.format('HH'));
}
export function yaxis(title) {
  return {
    "labels": {
      "formatter": function (val) {
        return val.toFixed(0)
      }
    },
    title: {
      text: title,
    },
  }
}

export function dataLabels(value) {
  return {
    enabled: value,
  }
}
export function plotOptions(borderRadius, columnWidth, barHeight, distributed, horizontal, position) {
  return {
    bar: {
      borderRadius: borderRadius,
      columnWidth: columnWidth,
      barHeight: barHeight,
      distributed: distributed,
      horizontal: horizontal,
      dataLabels: {
        position: position,
      },
    },
  }
}
export function annotations(xname, seriesIndex, borderColor, offsetY, color, background) {
  return {
    points: [{
      x: xname,
      seriesIndex: seriesIndex,
      label: {
        borderColor: borderColor,
        offsetY: offsetY,
        style: {
          color: color,
          background: background,
        },
      },
    }, ],
  }
}

// Used for timeStamp for dateTime
export function timeStamp(date) {
  return moment(date).format("X")
}

export function timeStampToTime(time, format) {
  return moment.unix(time).format(format)
}

// Used for pass array and get object of array
export function arrayToObjact(data, id) {
  return data.find(o => o.id === id)
}
export function startimeAdd(value) {
  let timeStart = '00:00:00'
  return (moment(value.format('MM/DD/YYYY') + ' ' + timeStart)).format()
}

export function endTimeAdd(value) {
  let endTime = '23:59:59'
  return (moment(value.format('MM/DD/YYYY') + ' ' + endTime)).format()
}

export function responseConvert(time, data, format) {
  let record = []
  time.forEach(element => {
    let recordList = []
    data.forEach(value => {
      if ((moment(dateFormat(value.date))).format(format) === element) {
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
  return record
}
export function chartTimeCount(timeLine, count) {
  let newPatient = [];
  if (timeLine == 122) {
    const time = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM']
    time.forEach((item, i) => {
      let obj = count.find(o => moment(dateFormat(o.duration)).format('hh:00 A') === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "key": i,
          "duration": item,
          "total": 0,
        };
        newPatient.push(value_obj);
      } else {
        let value_obj_get = {
          "duration": moment(dateFormat(obj.duration)).format('hh:00 A'),
          "total": obj.total,
        };
        newPatient.push(value_obj_get);
      }
    })
  } else if (timeLine == 123) {
    let today = moment();
    today.subtract(7, 'days')
    for (let i = 0; i < 7; i++) {
      var day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('dddd'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "key": i,
          "duration": day.format('dddd'),
          "total": 0,
        };
        newPatient.push(value_obj);
      } else {
        newPatient.push(obj);
      }
    }
  } else if (timeLine == 124) {
    let today = moment();
    today.subtract(30, 'days')
    for (let i = 0; i < 30; i++) {
      let day = today.add(1, 'days');
      let obj = count.find(o => o.duration === day.format('MMM DD,yyyy'));
      if (typeof obj === 'undefined') {
        let value_obj = {
          "duration": day.format('MMM DD,yyyy'),
          "total": 0,
        };
        newPatient.push(value_obj);
      } else {
        newPatient.push(obj);
      }
    }

  } else {
    let month = []
    for (let k = 1; k < 13; k++) {
      month.push(moment(moment().toDate()).add(k, "month").startOf("month").format('MMMM'))
    }
    month.forEach((item, i) => {
      let obj = count.find(o => o.duration === item);
      if (typeof obj === 'undefined') {
        let value_obj = {
          "key": i,
          "duration": item,
          "total": 0,
        };
        newPatient.push(value_obj);
      } else {
        newPatient.push(obj);
      }
    })
  }
  return newPatient
}


export function convertResponse(timeArray, recordsArray) {
  let records = []
  timeArray.forEach(time => {
    let recordList = []
    recordsArray.forEach(record => {
      if (record.takeTime === time) {
        recordList.push(record);
      }
    });
    if (recordList.length > 0) {
      let valuesObject = {
        "takeTime": time,
        "data": recordList.map(item => {
          var field = (item.vitalField).replace(/ /g, '_').toLowerCase()
          item[field] = item.value
          return item
        })
      }
      records.push(valuesObject);
    }
  });
  return records
}

export function convertData(patientVitals) {
  let records = []
  patientVitals.forEach(element => {
    let itemObject = {}
    element.data.forEach(item => {
      var field = (item.deviceType + '_' + item.vitalField).replace(/ /g, '_').toLowerCase()
      element.data = [];
      itemObject['id'] = item.id
      itemObject['takeTime'] = dateFormat(item.takeTime)
      itemObject['vitalField'] = item.vitalField
      itemObject['deviceType'] = item.deviceType
      itemObject[field] = item.value
    })
    records.push(itemObject);
  });
  return records;
}

export function convertChartResponse(vitaldFieldsArray, recordsArray) {
  var timesArray = [];
  recordsArray.forEach(element => {
    if (!timesArray.includes(timeFormatSimple(element.takeTime))) {
      timesArray.push(timeFormatSimple(element.takeTime))
    }
  });
  let records = []
  vitaldFieldsArray.forEach(vitalField => {
    let recordList = []
    recordsArray.forEach(record => {
      if (record.vitalField === vitalField) {
        recordList.push(record);
      }
    });
    if (recordList.length > 0) {
      let valuesObject = {
        "name": vitalField,
        "data": recordList.map(item => {
          return item.value
        })
      }
      records.push(valuesObject);
    }
  });
  return {
    records,
    timesArray,
  }
}

export function createDynamicColumns(patientVitals) {
  let itemObject = {
    tableName: '',
    columns: [{
      title: 'Date Recorded',
      dataIndex: 'takeTime',
      key: 'takeTime',
      slots: {
        customRender: 'takeTime'
      },
    }]
  }
  if (patientVitals.length > 0) {
    patientVitals.map(item => {
      var field = (item.deviceType + '_' + item.vitalField).replace(/ /g, '_').toLowerCase()
      var exists = (itemObject.columns).some(function (dataIndex) {
        return dataIndex.dataIndex === field;
      });
      if (!exists) {
        // console.log('patientVitals exists', exists)
        // itemObject.tableName = item.deviceType;
        // itemObject.columns.push({
        //   title: item.vitalField,
        //   dataIndex: field,
        //   key: field,
        //   slots: {
        //     customRender: field
        //   },
        // })
      }
    })
  }
  // console.log('patientVitals itemObject', itemObject)
  return itemObject;
}

export function getSeconds(hms) {
  var a = hms.split(':'); // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
  return seconds;
}

export function secondsToTime(secs) {
  var hours = Math.floor(secs / (60 * 60));
  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);
  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
}
