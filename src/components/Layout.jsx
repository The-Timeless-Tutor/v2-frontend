/* eslint-disable react/prop-types */
import React from "react";
// import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
      <div className="grid min-h-screen grid-rows-[auto_1fr_auto]  ">
        {/* <Navbar /> */}
        <>This is navbar</>
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    );
}