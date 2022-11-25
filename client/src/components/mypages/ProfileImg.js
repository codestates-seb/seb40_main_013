import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function ProfileImg({ value: file } ) { 
  
  Swal.fire({
    title: 'Select image',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Upload your profile picture'
    }
  })

if (file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    Swal.fire({
      title: 'Your uploaded picture',
      imageUrl: e.target.result,
      imageAlt: 'The uploaded picture'
    })
  }
  reader.readAsDataURL(file)
}}

export default ProfileImg;