import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBook, FaHome, FaPlus, FaUser, FaList, FaBars } from "react-icons/fa";

const DashboardLayout = () => {
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
            <div className="mb-6 px-4">
                 <h2 className="text-2xl font-bold text-primary">Book Haven</h2>
                 <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase mt-1">User Dashboard</p>
            </div>
            
            <li>
                <Link to="/dashboard"><FaHome /> Dashboard Overview</Link>
            </li>
            <li>
                <Link to="/dashboard/add-book"><FaPlus /> Add New Book</Link>
            </li>
            <li>
                <Link to="/dashboard/my-books"><FaList /> My Books</Link>
            </li>
            <li>
                <Link to="/dashboard/profile"><FaUser /> My Profile</Link>
            </li>
          </div>

        
          <div className="border-t border-gray-400 pt-4 mt-4">
             <li><Link to="/"><FaHome /> Back to Home</Link></li>
             <li><Link to="/all-books"><FaBook /> Browse All Books</Link></li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;