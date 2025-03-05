// import { Link } from "react-router";
// import { useContext } from "react";
// import AuthContext from "./AuthContext";
// import { useNavigate } from 'react-router-dom';

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [ loggedIn, setLoggedIn ] = useContext(AuthContext); // Adjusted context usage

//   const handleClick =  () => {
//     navigate("/resumes")
//   };

//   return (
//     <nav id="navbar-bg" className="bg-gray-400 flex text-white justify-around">
//       <div className="left-2 mt-2.5">
//         <span>
//           <Link to="/">MyApp</Link>
//         </span>
//       </div>
//       <div className="flex flex-row">
//         <Link to="/" className="p-3 hover:text-gray-200">
//           Home
//         </Link>
//         <Link to="/resumes" className="p-3 hover:text-gray-200">
//           Resumes
//         </Link>
//         <Link to="/contact" className="p-3 hover:text-gray-200">
//           Contact
//         </Link>
//         <Link to="/details" className="p-3 hover:text-gray-200">
//           Add Details
//         </Link>
//         <Link to="/parser" className="p-3 hover:text-gray-200">
//           Parse
//         </Link>
//         {loggedIn ? (
//           <button
//             onClick={handleClick}
//             className="border-2 bg-black  rounded-md m-2 p-2"
//           >
//             GetStarted
//           </button>
//         ) : (
//           <Link to="/login" className="border-2 bg-black  rounded-md m-2 p-2">
//             Get Started
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import { useState } from "react";
import { Link } from "react-router";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    navigate("/resumes");
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-black">
              ResumeMaster
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
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

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-black hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/resumes"
              className="text-black hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Resumes
            </Link>
            <Link
              to="/about"
              className="text-black hover:text-blue-600 px-3 py-2 rounded-md"
            >
              About Us
            </Link>

            <Link
              to="/parser"
              className="text-black hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Parse
            </Link>
            {loggedIn ? (
              <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl ml-4 hover:bg-blue-700"
              >
                Get Started
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl ml-4 hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-black hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/resumes"
              className="text-black hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Resumes
            </Link>
            <Link
              to="/about"
              className="text-black hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              About Us
            </Link>

            <Link
              to="/parser"
              className="text-black hover:bg-gray-100 block px-3 py-2 rounded-md"
            >
              Parse
            </Link>
            <div className="mt-4">
              {loggedIn ? (
                <button
                  onClick={handleClick}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Get Started
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 block text-center"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;