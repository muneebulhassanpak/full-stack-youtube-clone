import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginSignUpComponent = (props) => {
  const [form, setForm] = useState(false);

  const changeForm = () => {
    setForm((prev) => !prev);
  };

  const handleFormClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={props.toggleModal}
      className="bg-slate-100/50 absolute left-0 z-20 right-0 bottom-0 w-screen h-screen top-0 grid place-items-center"
    >
      <div onClick={handleFormClick}>
        {form ? (
          <SignUp changeForm={changeForm} />
        ) : (
          <SignIn changeForm={changeForm} closeModal={props.toggleModal} />
        )}
      </div>
    </div>
  );
};

export default LoginSignUpComponent;
