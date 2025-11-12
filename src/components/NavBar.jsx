import React from "react";
import logo from "../assets/Book_Store_Logo.png";
import { Link, NavLink } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar flex justify-between shadow-md px-none md:px-20 ">
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="mr-0 md:mr-4 lg:hidden cursor-pointer text-black "
          >
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
            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-black ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  `text-black  ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                All Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-book"
                className={({ isActive }) =>
                  `text-black  ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                Add Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `text-black  ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                My Books
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 cursor-pointer ml-2 md:ml-0">
          <Link to="/">
            {" "}
            {/* Link দিয়ে wrap করলাম */}
            <div className="flex items-center gap-4">
              <img src={logo} className="w-12 h-12 md:w-20 md:h-20" alt="" />
              <span className="text-xl md:text-4xl font-bold text-black">
                Book Haven
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar-center w-auto hidden lg:flex">
        <ul className="menu gap-6 menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-black text-lg  ${
                  isActive ? "text-red-600 font-bold" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-books"
              className={({ isActive }) =>
                `text-black text-lg  ${
                  isActive ? "text-red-600 font-bold" : ""
                }`
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                `text-black text-lg  ${
                  isActive ? "text-red-600 font-bold" : ""
                }`
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-books"
              className={({ isActive }) =>
                `text-black text-lg  ${
                  isActive ? "text-red-600 font-bold" : ""
                }`
              }
            >
              My Books
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end w-auto flex gap-3 md:gap-5">
        <NavLink
          to="/login"
          className="btn btn-primary text-sm md:text-lg w-20 md:w-24 h-8 md:h-10 flex items-center justify-center"
        >
          Login
        </NavLink>
        <NavLink
          to="/register"
          className="btn btn-primary text-sm md:text-lg w-20 md:w-24 h-8 md:h-10 flex items-center justify-center"
        >
          Register
        </NavLink>
      </div>

    </div>
  );
};

export default NavBar;
