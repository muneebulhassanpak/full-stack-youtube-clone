import React, { useState, useEffect } from "react";
import {
  MdPersonOutline,
  MdArrowDropUp,
  MdArrowDropDown,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/loggedInUser";
import Cookies from "js-cookie";
import DropDown from "./DropDown";

const Profile = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store?.loggedInUser?.user?.name);
  const userImage = useSelector((store) => store?.loggedInUser?.user?.image);
  const [open, setOpen] = useState(false);
  const toggleMenu = (e) => {
    setOpen((prev) => !prev);
  };
  const logoutHandler = () => {
    Cookies.remove("access_token");
    dispatch(logoutUser());
  };

  const [mode, setMode] = useState("light");
  useEffect(() => {
    if (mode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const modeChangeHandler = () => {
    setMode((prev) => {
      return prev == "light" ? "dark" : "light";
    });
  };

  return (
    <>
      <div className={`flex-2`}>
        <button onClick={toggleMenu} className="text-black dark:text-white">
          {userImage ? (
            <img
              src={userImage}
              className="w-8 h-8 rounded-full inline-block object-cover"
            />
          ) : (
            <MdPersonOutline className="text-2xl  inline-block" />
          )}

          {open ? (
            <MdArrowDropUp className="text-xl  inline-block " />
          ) : (
            <MdArrowDropDown className="text-xl  inline-block " />
          )}
        </button>
      </div>
      {open && (
        <DropDown
          className="absolute right-4 top-14"
          oonClick={logoutHandler}
          mode={mode}
          setMode={modeChangeHandler}
          tackleUpload={props.tackleUpload}
          uploadModalStatus={props.uploadModalStatus}
        />
      )}
    </>
  );
};

export default Profile;
