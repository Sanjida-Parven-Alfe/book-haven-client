import React, { useContext } from "react";
import logo from "../assets/Book_Store_Logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import DefaultAvatar from "../assets/account.png";
import LogoutImg from "../assets/logout.png";
import { ThemeContext } from "../main.jsx"; 

const NavBar = () => {
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar flex justify-between shadow-md px-none md:px-20 sticky top-0 left-0 w-full z-50 bg-base-100 transition-colors duration-300">
      {/* Navbar Start */}
      <div className="navbar-start w-auto">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="mr-0 md:mr-4 lg:hidden cursor-pointer text-base-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow bg-base-100"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-base-content ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-books"
                className={({ isActive }) =>
                  `text-base-content ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                All Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-book"
                className={({ isActive }) =>
                  `text-base-content ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                Add Book
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `text-base-content ${isActive ? "text-red-600 font-bold" : ""}`
                }
              >
                My Books
              </NavLink>
            </li>

            {/* Theme toggle for md and smaller */}
            <li className="mt-2 flex justify-center">
              <label className="flex cursor-pointer gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>

                <input
                  type="checkbox"
                  className="toggle theme-controller"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </label>
            </li>
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-4 cursor-pointer ml-2 md:ml-0">
          <img src={logo} className="w-12 h-12 md:w-20 md:h-20" alt="logo" />
          <span className="text-xl md:text-4xl font-bold text-base-content">Book Haven</span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center w-auto hidden lg:flex">
        <ul className="menu gap-6 menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base-content text-lg ${isActive ? "text-red-600 font-bold" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-books"
              className={({ isActive }) =>
                `text-base-content text-lg ${isActive ? "text-red-600 font-bold" : ""}`
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                `text-base-content text-lg ${isActive ? "text-red-600 font-bold" : ""}`
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-books"
              className={({ isActive }) =>
                `text-base-content text-lg ${isActive ? "text-red-600 font-bold" : ""}`
              }
            >
              My Books
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end w-auto flex items-center gap-3 md:gap-5">
        {/* Theme Toggle - only show on large device */}
        <label className="hidden lg:flex cursor-pointer gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>

          <input
            type="checkbox"
            className="toggle theme-controller"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </label>

        {!user && (
          <>
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
          </>
        )}

        {user && (
          <div className="flex items-center gap-5">
            {/* Updated Profile Section */}
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName ? user.displayName : "User"}
            >
              <Link to="/profile">
                <img
                  src={user.photoURL ? user.photoURL : DefaultAvatar}
                  alt={user.displayName ? user.displayName : "User"}
                  className="w-11 h-11 rounded-full cursor-pointer"
                />
              </Link>
            </div>

            {/* Logout */}
            <div className="tooltip tooltip-bottom" data-tip="Logout">
              <button
                onClick={handleLogout}
                className="w-13 h-13 p-1 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 shadow-md"
              >
                <img
                  src={LogoutImg}
                  alt="Logout"
                  className="w-full h-full rounded-full"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
