import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import TopBarWrapper from "./Wrappers/TopBarWrapper";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

// => CUSTOM IMPORTS

import VideoDetail from "./pages/VideoDetail";
import { loginUser, logoutUser } from "./store/loggedInUser";
import { setLoggedInUser } from "./store/loggedInUser";

// =>  URL IMPORTS

import { headers, loggedInUserURL } from "./components/LoginCheck/URLs";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(loggedInUserURL, {
          headers: headers,
        });

        if (!response.ok) {
          dispatch(logoutUser());
          throw new Error("Error fetching user data");
        }

        const responseData = await response.json();
        if (responseData.message == "success") {
          dispatch(setLoggedInUser(responseData.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const loginStatus = Cookies.get("access_token");
  if (loginStatus) {
    dispatch(loginUser());
  } else {
    dispatch(logoutUser());
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<TopBarWrapper />}>
          <Route index element={<Home type="random" />} />
          <Route
            path="user/subscriptions/videos"
            element={<Home type="subscriptions" />}
          />
          <Route path="user/saved/videos" element={<Home type="saved" />} />
          <Route path="/videos/search" element={<Home type="search" />} />
          <Route path="video/:id" element={<VideoDetail />} />
        </Route>
      </Routes>
    </>
  );
}
