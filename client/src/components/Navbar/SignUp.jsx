import React, { useRef, useState, useEffect } from "react";
import { MdArrowCircleLeft } from "react-icons/md";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import Lotie from "lottie-react";
import loadingAnimation from "../../assets/circle-loader.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpURL } from "../LoginCheck/URLs";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message);
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  // => PLACEHOLDER settings start here

  const [placeHolder, setPlaceHolder] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPlaceHolder("(Min 5 characters,1 lowercase,1 uppercase,1 number)");
      } else {
        setPlaceHolder("(Min 5 characters,1 lowercase,1 uppercase,1 number)");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // PLACEHOLDER settings ends here <=

  // => Password show/hide

  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  //  Password show/hide  <=

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    let data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    setLoading(true);
    let res = await fetch(signUpURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      body: JSON.stringify(data),
    });
    res = await res.json();

    if (res) {
      setLoading(false);
      notify(res.message);
    }
  };
  return (
    <>
      <div className=" w-uploadVideo md:w-mediumWidth bg-ytMilky dark:bg-ytBlack rounded-xl p-2 sm:p-4">
        <form
          action=""
          className="w-full h-full text-center relative"
          onSubmit={formSubmissionHandler}
        >
          <h3 className="text-xl text-black dark:text-white">Welcome to</h3>
          <h4 className="font-bold text-black dark:text-white text-2xl mt-1">
            Youtube
          </h4>
          <label
            htmlFor="name"
            className="block sm:hidden text-left dark:text-teal-50 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name please..."
            required
            ref={nameRef}
            className="mt-0 sm:mt-3 w-full border border-slate-500 dark:border-slate-200 pl-2 py-2  focus:outline-ytBlue"
          />
          <label
            htmlFor="email"
            className="block sm:hidden text-left dark:text-teal-50 my-1"
          >
            Email
          </label>
          <input
            type="email"
            required
            ref={emailRef}
            id="email"
            name="email"
            placeholder="Email Address..."
            className="mt-0 sm:mt-3 w-full border border-slate-500 dark:border-slate-200 pl-2 py-2  focus:outline-ytBlue"
          />
          <label
            htmlFor="password"
            className="block sm:hidden text-left dark:text-teal-50 my-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${visibility ? "text" : "password"}`}
              required
              ref={passRef}
              name="password"
              id="password"
              minLength={5}
              maxLength={10}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$"
              title="Atleast 5 characters  containining minimum one lowercase, one uppercase letter & one number."
              placeholder={placeHolder}
              className="relative mt-0 sm:mt-3 w-full border rounded-sm border-slate-500 dark:border-slate-200 pl-2 py-2  focus:outline-ytBlue"
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
            disabled={loading}
            className="px-4 flex items-center disabled:bg-blue-400  disabled:hover:scale-100 mx-auto mt-3 rounded-sm hover:cursor-pointer hover:scale-95 transition-all py-2 bg-ytBlue text-white"
          >
            Sign Up
            {loading && (
              <Lotie className="w-7 h-7" animationData={loadingAnimation} />
            )}
          </button>
          <MdArrowCircleLeft
            className="absolute top-0 left-0 hover:cursor-pointer hover:scale-90 transition-all dark:text-white text-3xl"
            onClick={props.changeForm}
          />
        </form>
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

export default SignUp;
