import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import LeftBarPrimary from "../components/Navbar/LeftBarPrimary";
import LeftBarSecondary from "../components/Navbar/LeftBarSecondary";
import Cookies from "js-cookie";
const TopBarWrapper = () => {
  const [isLargeViewport, setIsLargeViewport] = useState(
    window.innerWidth > 650
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeViewport(window.innerWidth > 650);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [menu, setMenu] = useState(false);
  const [sMenu, setsMenu] = useState(false);
  const sMenuToggle = () => {
    setsMenu((prev) => !prev);
  };
  const normalToggleMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <>
      <Navbar toggleMenu={normalToggleMenu} sMenuToggle={sMenuToggle} />
      <section className="flex justify-between bg-white dark:bg-ytBlack min-h-screen">
        {menu ? <LeftBarSecondary className="flex-2" /> : <LeftBarPrimary />}
        {!isLargeViewport && sMenu && (
          <LeftBarSecondary className="flex-2" sToggleValue={sMenu} />
        )}
        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default TopBarWrapper;
