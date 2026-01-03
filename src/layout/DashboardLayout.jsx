import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { FaBook, FaHome, FaPlus, FaUser, FaList, FaBars, FaUsersCog, FaChartLine, FaTasks } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const DashboardLayout = () => {
  const [user] = useAuthState(auth);
  const isAdmin = user?.email === "admin@bookhaven.com";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col items-center justify-center bg-base-100">
        <div className="w-full navbar bg-base-300 lg:hidden flex justify-between px-4">
            <span className="font-bold text-lg">Dashboard</span>
            <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
              <FaBars className="text-xl"/>
            </label>
        </div>

        <div className="w-full h-full p-5 overflow-y-auto">
            <Outlet />
        </div>
      </div> 
      
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
       
          <div>
            <div className="mb-6 px-4 border-b border-base-300 pb-4">
                 <h2 className="text-2xl font-bold text-primary italic">Book Haven</h2>
                 <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mt-1">
                   {isAdmin ? "Admin Management" : "User Workspace"}
                 </p>
            </div>
            
            <li>
                <NavLink to="/dashboard" end><FaHome /> Overview</NavLink>
            </li>

            {isAdmin ? (
              <>
                <div className="divider text-[10px] uppercase opacity-50 font-bold">Administration</div>
                <li><NavLink to="/dashboard/manage-all-books"><FaTasks /> Manage Books</NavLink></li>
                <li><NavLink to="/dashboard/manage-users"><FaUsersCog /> User Control</NavLink></li>
                <li><NavLink to="/dashboard/admin-stats"><FaChartLine /> System Reports</NavLink></li>
              </>
            ) : (
              <>
                <div className="divider text-[10px] uppercase opacity-50 font-bold">Personal Menu</div>
                <li><NavLink to="/dashboard/add-book"><FaPlus /> Add New Book</NavLink></li>
                <li><NavLink to="/dashboard/my-books"><FaList /> My Library</NavLink></li>
              </>
            )}

            <div className="divider text-[10px] uppercase opacity-50 font-bold">Account</div>
            <li>
                <NavLink to="/dashboard/profile"><FaUser /> Profile Details</NavLink>
            </li>
          </div>

          <div className="border-t border-base-300 pt-4 mt-4 space-y-2">
              <li><Link to="/"><FaHome /> Return to Home</Link></li>
              <li><Link to="/all-books"><FaBook /> Library Explorer</Link></li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;