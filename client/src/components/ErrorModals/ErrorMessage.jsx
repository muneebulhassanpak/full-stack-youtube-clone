import React from "react";

const ErrorMessage = (props) => {
  return (
    <div className="h-screen grid place-items-center dark:text-white">
      <div>
        <h2 className="font-bold text-3xl text-center mb-2 ">🙁SORRY!</h2>
        <h3 className="text-2xl text-center">{props.message}</h3>
      </div>
    </div>
  );
};

export default ErrorMessage;
