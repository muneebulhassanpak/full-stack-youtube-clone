import React from "react";
import { BsPersonCircle } from "react-icons/bs";

const SignInButton = (props) => {
  return (
    <div className={`flex-2 pl-2 md:pl-0 md:flex-1  ${props.className}`}>
      <button
        onClick={props.onClick}
        className={`border text-ytBlue border-slate-300 px-2 sm:px-4 py-1 rounded-full dark:border-slate-400 hover:bg-blue-100`}
      >
        <BsPersonCircle className="hidden mr-2 sm:inline-block" />
        <span className="text-sm sm:text-base">Sign in</span>
      </button>
    </div>
  );
};

export default SignInButton;
