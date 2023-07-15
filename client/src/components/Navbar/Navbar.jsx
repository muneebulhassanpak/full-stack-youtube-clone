import React, { useState, useRef } from "react";
import { BsYoutube } from "react-icons/bs";
import { BiVideoPlus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu, MdSearch } from "react-icons/md";
import SignInButton from "./SignInButton";
import LoginSignUpComponent from "./LoginSignUpComponent";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import Upload from "../UploadModal/Upload";

const Navbar = (props) => {
  const loginStatus = useSelector((store) => store?.loggedInUser?.loggedIn);
  const [state, setState] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const toggleModal = () => {
    setState((prev) => !prev);
  };
  const toggleUploadModal = () => {
    setUploadModal((prev) => !prev);
  };
  const searchRef = useRef();
  const navigate = useNavigate();
  const searchFormHandler = (e) => {
    e.preventDefault();
    let query = searchRef.current.value;
    if (query) {
      navigate(`/videos/search?q=${query}`);
    } else {
      return;
    }
  };

  return (
    <header className="flex justify-between flex-row bg-white dark:bg-ytBlack items-center h-16 px-2 py-3 sm:px-4 sticky top-0 z-10">
      <div className="flex-2 pr-2 sm:w-1/4 md:pr-0 flex justify-start items-center">
        <div>
          <MdOutlineMenu
            className="text-4xl mr-0 md:mr-3 p-1 hidden sm:block text-black dark:text-white hover:bg-slate-300 dark:hover:bg-ytGray hover:cursor-pointer rounded-full font-light"
            onClick={props.toggleMenu}
          />
        </div>
        <div>
          <MdOutlineMenu
            className="text-4xl mr-0  md:mr-3 p-1 sm:hidden hover:bg-slate-300 dark:hover:bg-ytGray  text-black dark:text-white hover:cursor-pointer rounded-full font-light"
            onClick={props.sMenuToggle}
          />
        </div>
        <Link to="/">
          <div className="flex items-center">
            <BsYoutube className="inline-block text-ytRed  text-3xl mr-0 md:mr-1" />
            <span className="hidden md:block text-lg text-black font-semibold dark:text-white">
              Youtube<sup className="text-xs font-light">PK</sup>
            </span>
          </div>
        </Link>
      </div>

      <div className="w-2/4 ">
        <form
          action=""
          className="subpixel-antialiased w-full flex justify-between "
          onSubmit={searchFormHandler}
        >
          <input
            type="text"
            className="py-1 md:py-2 px-4 w-full rounded-tl-full dark:focus:text-white  border-ytGray rounded-bl-full focus:outline-none border border-r-slate-400 focus:border-ytBlue bg-white dark:bg-ytBlack dark:text-white"
            placeholder="Search"
            ref={searchRef}
          />
          <button
            type="submit"
            className="px-2 bg-white dark:bg-ytLightGray rounded-r-full border border-ytGray border-l-transparent "
          >
            <MdSearch className="text-2xl text-black dark:text-white" />
          </button>
        </form>
      </div>

      {loginStatus ? (
        <div className=" sm:w-1/4 flex items-center justify-end">
          <BiVideoPlus
            className="hidden sm:block text-3xl dark:text-white ml-1 md:ml-0 mr-[10px] md:mr-[2vw] hover:cursor-pointer p-1  rounded-full hover:bg-gray-200 dark:hover:bg-ytLightGray"
            onClick={toggleUploadModal}
          />
          <Profile
            tackleUpload={toggleUploadModal}
            uploadModalStatus={uploadModal}
          />
        </div>
      ) : (
        <SignInButton className="w-1/4 text-right" onClick={toggleModal} />
      )}

      {state && <LoginSignUpComponent toggleModal={toggleModal} />}
      {uploadModal && <Upload onClick={toggleUploadModal} />}
    </header>
  );
};

export default Navbar;
