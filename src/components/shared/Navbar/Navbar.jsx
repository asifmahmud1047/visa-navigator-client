import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-visas"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : ""
          }
        >
          All Visas
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-visa"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }
            >
              Add Visa
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-added-visas"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }
            >
              My Added Visas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-visa-applications"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold" : ""
              }
            >
              My Applications
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Visa Navigator
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <ul className="flex space-x-4">{navLinks}</ul>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName}
                  />
                ) : (
                  <FaUserCircle
                    className="w-10 h-10 text-gray-500"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user.displayName}
                  />
                )}
                <Tooltip id="user-tooltip" />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ul className="flex flex-col space-y-2">{navLinks}</ul>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {user ? (
                <div className="flex flex-col items-start gap-2 w-full">
                  <div className="flex items-center gap-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="w-8 h-8 text-gray-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {user.displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-4 py-2 border border-blue-600 text-blue-600 text-center rounded-md hover:bg-blue-50 transition duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 