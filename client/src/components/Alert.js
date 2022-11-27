import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const navigate = useNavigate();

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

export const BtnAlert = () => {
  Swal.fire({ title: "WOW!", text: "Message!", type: "success" }).then(
    (okay) => {
      if (okay) {
        window.location.href = "http://localhost:3000/cart";
      }
    }
  );
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

export const DeleteAlert =(content, confirmbutton) => {
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
        '취소되엇스빈다',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

