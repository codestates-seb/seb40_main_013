import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

<<<<<<< HEAD
export function Alert(icon, content) {
=======
export const Alert = (icon, content) => {
>>>>>>> 2a95332ab8af531bfbe1ef883249c7924f37f411
  MySwal.fire({
    icon,
    text: content,
    padding: "20px",
    confirmButtonColor: "#002C6D",
    confirmButtonText: "확인",
  });
};

export const Toast = (icon, content) => {
  const Toasts = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  Toasts.fire({
    icon,
    title: content,
  });
};

<<<<<<< HEAD
export function DeleteAlert(content) {
  MySwal.fire({
    title: 'Are you sure?',
    text: content,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

=======
// export const Toast = () => {
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     title: "Your work has been saved",
//     showConfirmButton: false,
//     timer: 1500,
//   });
// };
>>>>>>> 2a95332ab8af531bfbe1ef883249c7924f37f411
