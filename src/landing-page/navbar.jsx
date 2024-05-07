import React, { useEffect, useState } from "react";
import { logo, lock, hamburgerMenu, close } from "../../public/assets/landing-assets";

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
            <li>Home</li>
            <li>About</li>
            <li>Support</li>
            <li>Platform</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <button className="px-8 py-3 rounded-full bg-brand text-white font-bold">Login</button>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} />
        </div>
      </div>

      <div className={toggle ? "  bg-white w-full md:hidden border-b" : "hidden"}>
        <ul className="flex flex-col items-center justify-center font-semibold">
          <li className="p-4 hover:bg-gray-100">Home</li>
          <li className="p-4 hover:bg-gray-100">About</li>
          <li className="p-4 hover:bg-gray-100">Support</li>
          <li className="p-4 hover:bg-gray-100">Platform</li>
          <li className="p-4 hover:bg-gray-100">Pricing</li>
          <div className="flex flex-col my-4 gap-4">
            <button className="px-6 py-3 rounded-lg bg-brand text-white font-bold ">Login</button>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
