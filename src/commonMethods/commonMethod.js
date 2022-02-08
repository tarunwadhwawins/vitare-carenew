import Swal from "sweetalert2"
import moment from 'moment';


export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function successSwal(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 8000,
    timerProgressBar: true,
  })
  Toast.fire({
    icon: 'success',
    title: message
  })
}

export function errorSwal(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  })
}

export async function warningSwal(message){
   const result =  await Swal.fire({
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
  }else{
    return false
  }
}



export function dateFormat(date) {
  var day = moment.unix(new Date(date));
  return String(day.format('MMM DD, yyyy, hh:mm A'));
}

export function meridiemFormat(time) {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  if (time.length > 1) {
    time = time.slice (1);
    time[4] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
    var newTime = (time[0]+time[1]+time[2]+time[4]).toString();
  }
  return newTime;
}

export function timeOnly(date) {
  var day = moment.unix(new Date(date));
  return String(day.format('HH'));
}
export function yaxis(title){
  return  {
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

export function dataLabels(value){
  return {
    enabled: value,
  }
}
export function plotOptions(borderRadius,columnWidth,barHeight,distributed,horizontal,position){
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
export function annotations(xname,seriesIndex,borderColor,offsetY,color,background){
  return {
    points: [
      {
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
      },
    ],
  }
}
export function timeStamp(date){
  
  return moment(date).format("X")
}
export function timeStampToTime(time,format){
  return moment.unix(time).format(format)
}