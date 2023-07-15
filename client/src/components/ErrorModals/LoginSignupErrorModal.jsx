import React from "react";
import { ToastContainer, toast } from "react-toastify";

const LoginSignupErrorModal = (props) => {
  let message = props?.message || "Something went wrong";
  const notify = () =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <>
      <p className="text-base text-white text-center bg-red-500 w-full mb-2">
        {props.message}
      </p>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default LoginSignupErrorModal;
