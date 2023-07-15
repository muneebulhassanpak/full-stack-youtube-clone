import React, { useEffect } from "react";
import SignInButton from "./SignInButton";
import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md";
import SubscribedChannels from "./SubscribedChannels";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getSubscribedChannels, headers } from "../LoginCheck/URLs";
import { setSubscribedChannels } from "../../store/loggedInUser";

const LeftBarSecondary = (props) => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((store) => store?.loggedInUser?.loggedIn);
  const loginUserId = useSelector((store) => store?.loggedInUser?.user?._id);
  const subscribedChannels = useSelector(
    (store) => store?.loggedInUser?.user?.subscribedTo
  );

  const normalLinkClasses = `py-3 px-4 flex hover:bg-ytGray dark:hover:bg-ytLightGray  hover:cursor-pointer rounded-lg`;
  let activeLinkClasses = `${normalLinkClasses} bg-ytGray`;

  useEffect(() => {
    const fetchUser = async () => {
      let response = await fetch(getSubscribedChannels, {
        headers: headers,
      });
      response = await response.json();
      if (response) {
        dispatch(setSubscribedChannels(response?.channels));
      }
    };
    fetchUser();
  }, [loginUserId, subscribedChannels]);

  return (
    <>
      <div
        className={`p-2 hidden sm:block w-halfSecondary z-500 text-black dark:text-white h-screen sticky top-0 ${props.className}`}
      >
        <div className="flex flex-col py-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${activeLinkClasses}` : `${normalLinkClasses} mb-1`
            }
          >
            <GoHome className="inline-block text-2xl" />
            <p className="text-base self-end ml-6">Home</p>
          </NavLink>
          {loginStatus && (
            <NavLink
              to="/user/subscriptions/videos"
              className={({ isActive }) =>
                isActive ? `${activeLinkClasses}` : `${normalLinkClasses} mt-1`
              }
            >
              <MdOutlineSubscriptions className="text-2xl" />
              <span className="text-base self-end ml-6">Subscriptions</span>
            </NavLink>
          )}
        </div>

        {loginStatus && (
          <>
            <hr />
            <div className="py-2">
              <NavLink
                to="/user/saved/videos"
                className={({ isActive }) =>
                  isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
                }
              >
                <MdOutlineVideoLibrary className="text-2xl" />
                <span className="text-base self-end ml-6">Library</span>
              </NavLink>
            </div>
          </>
        )}

        {!loginStatus && (
          <>
            <hr />
            <div>
              <div className="px-4 py-3">
                <p className="mb-1">
                  Sign in to like videos, comment, and subscribe.
                </p>
                <Link>
                  <SignInButton className="text-left" />
                </Link>
              </div>
            </div>
          </>
        )}

        <hr />
        {loginStatus && (
          <div className="px-4 py-2">
            <h4 className="font-medium mb-1">Channels</h4>
            <SubscribedChannels />
          </div>
        )}
      </div>

      <div
        className={`p-2  ${
          props.sToggleValue ? "block" : "hidden"
        } block w-halfSecondary text-black dark:text-white sm:!hidden z-[9999] h-screen fixed bg-white dark:bg-ytBlack overflow-y-scroll ${
          props.className
        }`}
      >
        <div className="flex flex-col ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
            }
          >
            {/* <div className="py-3 px-4 flex flex-row hover:bg-slate-100 hover:cursor-pointer rounded-lg"> */}
            <GoHome className="inline-block text-2xl" />
            <p className="text-base self-end ml-6">Home</p>
            {/* </div> */}
          </NavLink>
          {loginStatus && (
            <NavLink
              to="/user/subscriptions/videos"
              className={({ isActive }) =>
                isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
              }
            >
              {/* <div className="py-3 px-4 flex hover:bg-slate-100 hover:cursor-pointer rounded-lg"> */}
              <MdOutlineSubscriptions className="text-2xl" />
              <span className="text-base self-end ml-6">Subscriptions</span>
              {/* </div> */}
            </NavLink>
          )}
        </div>

        <hr />
        {loginStatus && (
          <>
            <div className="py-2">
              <NavLink
                to="/user/saved/videos"
                className={({ isActive }) =>
                  isActive ? `${activeLinkClasses}` : `${normalLinkClasses}`
                }
              >
                <MdOutlineVideoLibrary className="text-2xl" />
                <span className="text-base self-end ml-6">Library</span>
              </NavLink>
            </div>

            <hr />
          </>
        )}

        {!loginStatus && (
          <div>
            <div className="px-4 py-3">
              <p className="mb-1">
                Sign in to like videos, comment, and subscribe.
              </p>
              <SignInButton className="text-left" />
            </div>
          </div>
        )}

        <hr />
        {loginStatus && (
          <>
            <div className="px-4 py-2">
              <h4 className="font-medium mb-1">Channels</h4>
              <SubscribedChannels />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LeftBarSecondary;
