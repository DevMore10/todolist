import React from "react";
import logo from "/logo.svg";

const Navbar = () => {
  return (
    <nav className="sm:flex bg-violet-300 text-violet-600 py-2 ">
      <div className="flex logo justify-center">
        <img src={logo} alt="Logo" width="30" height="24" className="ml-2" />
        <span className="font-bold text-2xl">Tasks</span>
      </div>
      {/* <ul className="flex gap-5 mx-9">
        <li className="cursor-pointer hover:font-bold">Home</li>
        <li className="cursor-pointer hover:font-bold">Tasks</li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
