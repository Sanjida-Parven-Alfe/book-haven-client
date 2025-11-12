import React from "react";
import logo from "../assets/Book_Store_Logo.png"

const NavBar = () => {
  return (
    <div className="navbar flex justify-between shadow-md px-none md:px-10 ">
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-0 md:mr-4 lg:hidden cursor-pointer text-black ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="text-black">Home</a>
            </li>
            <li>
              <a className="text-black">All Books</a>
            </li>
            <li>
              <a className="text-black">Add Book</a>
            </li>
            <li>
              <a className="text-black">My Books</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 cursor-pointer ml-2 md:ml-0">
            <img src={logo} className="w-12 h-12 md:w-20 md:h-20" alt="" />
            <a className="text-xl md:text-4xl font-bold text-black">Book Haven</a>
        </div>
        
      </div>

      <div className="navbar-center w-auto  hidden lg:flex">
        <ul className="menu gap-6 menu-horizontal px-1">
          <li>
            <a className="text-black text-lg hover:text-red-600 hover:font-bold transition-all duration-200">Home</a>
          </li>
          <li>
            <a className="text-black text-lg hover:text-red-600 hover:font-bold transition-all duration-200">All Books</a>
          </li>
          <li>
            <a className="text-black text-lg hover:text-red-600 hover:font-bold transition-all duration-200">Add Book</a>
          </li>
          <li>
            <a className="text-black text-lg hover:text-red-600 hover:font-bold transition-all duration-200">My Books</a>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end w-auto flex gap-3 md:gap-5">
        <a className="btn btn-primary text-sm md:text-lg w-20 md:w-24 h-8 md:h-10">Login</a>
        <a className="btn btn-primary text-sm md:text-lg w-20 md:w-24 h-8 md:h-10">Register</a>
      </div>
    </div>
  );
};

export default NavBar;
