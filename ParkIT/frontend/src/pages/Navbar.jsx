import React from 'react';
import { NavLink } from 'react-router-dom';
// Example icons from react-icons
import { FaParking, FaChartBar, FaUser, FaBorderStyle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 w-full h-[60px] flex justify-around items-center bg-white py-[5px] border-t border-gray-200 z-[1000]">
      <NavLink 
        to="/app/park"
        className={({ isActive }) =>
          `flex flex-col items-center text-center px-[30px] py-1 rounded-full transition duration-200 ${
            isActive ? 'text-[#4287f5] bg-[#f2f7ff]' : 'text-gray-500 hover:bg-gray-100'
          }`
        }
      >
        <FaParking size={24} />
        <div className="text-[0.8rem] mt-1 caret-transparent">Park</div>
      </NavLink>

      <NavLink 
        to="/app/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center text-center px-[30px] py-1 rounded-full transition duration-200 ${
            isActive ? 'text-[#4287f5] bg-[#f2f7ff]' : 'text-gray-500 hover:bg-gray-100'
          }`
        }
      >
        <FaChartBar size={24} />
        <div className="text-[0.8rem] mt-1 caret-transparent">Stats</div>
      </NavLink>

      <NavLink 
        to="/app/profile"
        className={({ isActive }) =>
          `flex flex-col items-center text-center px-[30px] py-1 rounded-full transition duration-200 ${
            isActive ? 'text-[#4287f5] bg-[#f2f7ff]' : 'text-gray-500 hover:bg-gray-100'
          }`
        }
      >
        <FaUser size={24} />
        <div className="text-[0.8rem] mt-1 caret-transparent">Profile</div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
