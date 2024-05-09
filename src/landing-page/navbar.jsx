import React, { useEffect, useState } from "react";
import { logo } from "../../public/assets/landing-assets";
import { Link, NavLink } from "react-router-dom";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const handleClick = () => setToggle(!toggle);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 px-6 md:bg-opacity-90  h-[80px] transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="md:max-w-[1480px] max-w-[600px] mx-auto w-full h-full flex justify-between items-center ">
        <img src={logo} className="h-[30px]" />

        <div className="hidden md:flex items-center ">
          <ul className="flex gap-4 font-semibold">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${isActive ? "text-brand" : ""} hover:text-brand hover:border-b hover:border-brand transition-colors duration-300`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `${isActive ? "text-brand" : ""} hover:text-brand hover:border-b hover:border-brand transition-colors duration-300`
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${isActive ? "text-brand" : ""} hover:text-brand hover:border-b hover:border-brand transition-colors duration-300`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <Link
            to="/login"
            className="px-8 py-4 md:px-6 md:py-4 inline-block text-sm rounded-full bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            Login
          </Link>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          {toggle ? <RxCross1 className="text-3xl" /> : <RxHamburgerMenu className="text-3xl" />}
        </div>
      </div>

      <div className={toggle ? "  bg-white w-full md:hidden border-b" : "hidden"}>
        <ul className="flex flex-col items-center justify-center font-semibold">
          <li className="p-4 hover:bg-gray-100">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "text-brand" : "")}>
              Home
            </NavLink>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "text-brand" : "")}>
              Blog
            </NavLink>
          </li>
          <li className="p-4 hover:bg-gray-100">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "text-brand" : "")}>
              About
            </NavLink>
          </li>

          <div className="flex flex-col my-4 gap-4">
            <Link
              to="/login"
              className="px-8 py-4 md:px-6 md:py-4 inline-block text-sm rounded-full bg-brand font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-yellow-600 focus:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              Login
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
