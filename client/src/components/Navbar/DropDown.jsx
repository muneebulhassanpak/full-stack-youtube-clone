import React, { useState } from "react";
import { MdSunny, MdOutlineBrightness2, MdLogout } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import UpdateProfile from "../UploadModal/UpdateProfile";
import { BiVideoPlus } from "react-icons/bi";

const DropDown = (props) => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const toggleUpdateProfile = () => {
    setUpdateProfile((prev) => !prev);
  };
  return (
    <>
      <div className={`${props.className}`}>
        <ul className="list-none w-40 bg-white shadow-lg dark:bg-ytDropDown  py-4 rounded-md">
          <li className="block sm:hidden mb-1 hover:bg-ytGray dark:hover:bg-ytLightGray  focus-within:hover:cursor-pointer ">
            <button
              className=" text-black w-full px-4 py-2 dark:text-white items-center"
              onClick={props.tackleUpload}
            >
              <BiVideoPlus className=" text-black text-xl inline-block dark:text-white items-center" />
              <span className="inline-block ml-3">Upload Video</span>
            </button>
          </li>
          <li className="mb-1 hover:bg-ytGray dark:hover:bg-ytLightGray  focus-within:hover:cursor-pointer ">
            <button
              className=" text-black w-full px-4 py-2 dark:text-white "
              onClick={toggleUpdateProfile}
            >
              <BsPencilSquare className="inline-block mb-1" />
              <span className="inline-block ml-3">Profile</span>
            </button>
          </li>
          <li className="mt-1  hover:bg-ytGray dark:hover:bg-ytLightGray focus-within:hover:cursor-pointer ">
            <button
              onClick={props.setMode}
              className=" text-black px-4 py-2 w-full  dark:text-white"
            >
              {props.mode == "light" ? (
                <MdOutlineBrightness2 className="inline-block mb-1" />
              ) : (
                <MdSunny className="inline-block mb-1" />
              )}

              <span className="inline-block ml-3">
                {props.mode == "light" ? "Night Mode" : "Light Mode"}
              </span>
            </button>
          </li>
          <li className="mb-1 hover:bg-ytGray dark:hover:bg-ytLightGray  focus-within:hover:cursor-pointer ">
            <button
              onClick={props.oonClick}
              className=" text-black w-full px-4 py-2 dark:text-white"
            >
              <MdLogout className="inline-block text-2xl" />
              <span className="inline-block ml-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      {updateProfile && <UpdateProfile onClick={toggleUpdateProfile} />}
    </>
  );
};

export default DropDown;
