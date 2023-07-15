import React from "react";
import { GoHome } from "react-icons/go";
import {
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
} from "react-icons/md";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftBarPrimary = () => {
  let normalLinkClasses = `p-2 my-2 block text-black dark:text-white hover:bg-ytGray dark:hover:bg-ytLightGray rounded-md`;
  let activeLinkClasses = `${normalLinkClasses} bg-ytGray`;
  const loginStatus = useSelector((store) => store?.loggedInUser?.loggedIn);
  return (
    <>
      <div className="px-3 py-2 sm:flex sm:flex-col  bg-white dark:bg-ytBlack hidden w-halfPrimary">
        <div className="sticky top-20">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
            }
          >
            <div>
              <GoHome className="text-2xl " />
              <p className="text-xs">Home</p>
            </div>
          </NavLink>
          {loginStatus && (
            <>
              <NavLink
                to="/user/subscriptions/videos"
                className={({ isActive }) =>
                  isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
                }
              >
                <div>
                  <MdOutlineSubscriptions className="text-2xl" />
                  <span className="text-xs ">Subscriptions</span>
                </div>
              </NavLink>
              <NavLink
                to="/user/saved/videos"
                className={({ isActive }) =>
                  isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
                }
              >
                <div>
                  <MdOutlineVideoLibrary className="text-2xl" />
                  <span className="text-xs">Saved</span>
                </div>
              </NavLink>
              {/* <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
                }
              >
                <div>
                  <MdHistory className="text-2xl" />
                  <span className="text-xs ">History</span>
                </div>
              </NavLink> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftBarPrimary;
