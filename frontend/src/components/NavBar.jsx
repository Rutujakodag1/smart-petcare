import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
<nav className="bg-peach text-gray-800">
<div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Smart PetCare Shop
        </Link>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-play uppercase">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:underline">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>

        {/* Role-Specific Dropdown */}
        <div className="relative">
          <button className="md:hidden focus:outline-none text-lg">
            ☰
          </button>
          <ul className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg hidden group-hover:block">
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/role-specific"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
