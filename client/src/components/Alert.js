import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Alert = (icon, content) => {
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

// export const Toast = () => {
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     title: "Your work has been saved",
//     showConfirmButton: false,
//     timer: 1500,
//   });
// };

export const DeleteAlert =(content, confirmbutton, confirmMessage) => {
  MySwal.fire({
    title: 'Are you sure?',
    text: content,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#002C6D',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmbutton
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '취소되었습니다',
        confirmMessage,
        'success'
      )
    }
  })
}

export const AlreadyDeleteAlert =() => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: '이미 취소된 주문입니다.',
    confirmButtonColor: "#002C6D",
    confirmButtonText: "확인"
  })
}

