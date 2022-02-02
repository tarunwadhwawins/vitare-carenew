import Swal from "sweetalert2"
import moment from 'moment';
export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function successSwal(message) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 5000,
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

export async function deleteSwal(){
   const result =  await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete ?",
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

export function timeOnly(date) {
  var day = moment.unix(new Date(date));
  return String(day.format('H'));
}