import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Alert(icon, content) {
  MySwal.fire({
    icon,
    text: content,
    padding: "20px",
    confirmButtonColor: "#002C6D",
    confirmButtonText: "확인",
  });

}

export default Alert;
