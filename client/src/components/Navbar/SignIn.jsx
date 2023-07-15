import React, { useRef, useState } from "react";
import Lotie from "lottie-react";
import loadingAnimation from "../../assets/circle-loader.json";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../store/loggedInUser";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { loginURL } from "../LoginCheck/URLs";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message);

  const disptach = useDispatch();

  const emailRef = useRef();
  const passRef = useRef();
  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    let data = {
      email: emailRef.current.value,
      userpassword: passRef.current.value,
    };
    setLoading(true);
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("LOGGED IN PERSON", res);
        if (res.status == 200) {
          Cookies.set("access_token", res.token);
          disptach(loggedIn(res.user));
          setLoading(false);
        } else {
          setLoading(false);
        }
        notify(res.message);
      });
  };

  // => Password show/hide

  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  //  Password show/hide  <=

  return (
    <>
      <div className="w-uploadVideo md:w-mediumWidth bg-ytMilky dark:bg-ytBlack rounded-xl p-4">
        <form
          action=""
          className="w-full h-full text-center"
          onSubmit={formSubmissionHandler}
        >
          <h3 className="text-xl font-light text-black dark:text-white">
            Please Sign In to continue with
          </h3>
          <h4 className="font-bold text-black dark:text-white text-2xl ">
            Youtube
          </h4>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            required
            placeholder="Email Address..."
            className="mt-3 w-full border border-slate-500 dark:border-slate-200 pl-2 py-2  focus:outline-ytBlue"
          />
          <div className="relative">
            <input
              type={`${visibility ? "text" : "password"}`}
              name="password"
              ref={passRef}
              required
              id="password"
              placeholder="Password..."
              className="relative mt-3 w-full border rounded-sm border-slate-500 dark:border-slate-200 pl-2 py-2  focus:outline-ytBlue"
            />
            <span>
              {visibility ? (
                <BsEyeFill
                  className="absolute right-2 top-6 hover:cursor-pointer dark:text-white"
                  onClick={toggleVisibility}
                />
              ) : (
                <BsEyeSlashFill
                  className="absolute right-2 top-6 hover:cursor-pointer dark:text-white"
                  onClick={toggleVisibility}
                />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="px-4 flex disabled:bg-blue-300 disabled:hover:scale-100 items-center mx-auto mt-3 rounded-sm hover:cursor-pointer hover:scale-95 transition-all py-2 bg-ytBlue text-white"
            disabled={loading}
          >
            Sign In
            {loading && (
              <Lotie className="w-10 h-8" animationData={loadingAnimation} />
            )}
          </button>
        </form>
        <div className="text-right">
          <button
            onClick={props.changeForm}
            className="text-blue-500  text-sm hover:cursor-pointer underline underline-offset-1"
          >
            Don't have account?
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default SignIn;
