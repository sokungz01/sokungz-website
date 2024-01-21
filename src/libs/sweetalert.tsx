import Swal from "sweetalert2";

export const FillOutForm = () => {
   Swal.fire({
      html: ' <div class="flex flex-col"> <p class="text-3xl font-medium"> Error! </p> <p class="text-lg">Please fill out the form.</p>  </div> ',
      icon: "error",
      background: "#FDFDFD",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonColor: "#454545",
      confirmButtonText: '<p class="px-4 md:px-6 lg:px-8 text-lg text-red2">Close</p>',
      backdrop: `
   rgba(0,0,0,0.6)
   `,
   })
};

export const SuccessForm = () => {
    Swal.fire({
       html: ' <div class="flex flex-col"> <p class="text-3xl font-medium"> Success! </p> <p class="text-lg">The data saved.</p>  </div> ',
       icon: "success",
       background: "#FDFDFD",
       allowOutsideClick: false,
       allowEscapeKey: false,
       showConfirmButton: true,
       confirmButtonColor: "#454545",
       confirmButtonText: '<p class="px-4 md:px-6 lg:px-8 text-lg text-red2">Close</p>',
       backdrop: `
    rgba(0,0,0,0.6)
    `,
    })
 };

export const ResponseErrorForm = () => {
    Swal.fire({
       html: ' <div class="flex flex-col"> <p class="text-3xl font-medium"> Error! </p> <p class="text-lg">Unable to saved the data.</p>  </div> ',
       icon: "error",
       background: "#FDFDFD",
       allowOutsideClick: false,
       allowEscapeKey: false,
       showConfirmButton: true,
       confirmButtonColor: "#454545",
       confirmButtonText: '<p class="px-4 md:px-6 lg:px-8 text-lg text-red2">Close</p>',
       backdrop: `
    rgba(0,0,0,0.6)
    `,
    })
 };

 export const LoginSuccess = () => {
   Swal.fire({
      html: ' <div class="flex flex-col"> <p class="text-3xl font-medium"> Success! </p> <p class="text-lg">Login Success</p>  </div> ',
      icon: "success",
      background: "#FDFDFD",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonColor: "#454545",
      confirmButtonText: '<p class="px-4 md:px-6 lg:px-8 text-lg text-red2">Close</p>',
      backdrop: `
   rgba(0,0,0,0.6)
   `,
   })
};
