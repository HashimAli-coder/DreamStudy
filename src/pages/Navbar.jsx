import { Link } from "react-router-dom";
import { FaRobot, FaUserCircle, FaUniversity, FaCommentDots, FaQuestionCircle, FaHome,} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "./images/DreamStudyLOGO.png";
import { useEffect, useState } from "react";


// Reusable Nav Item Component with Animation
const NavItem = ({ to, icon, label }) => (
  <motion.div 
    whileHover={{ scale: 1.1, color: "#D946EF" }}
    className="flex items-center space-x-2 text-lg transition hover:text-magenta-500"
  >
    {icon}
    {to ? <Link to={to}>{label}</Link> : <span>{label}</span>}
  </motion.div>
);

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <>
      <Navbar user={user} />
    </>
  );
};

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav 
      className="w-full bg-gray-900 text-white shadow-lg py-4 px-6 fixed top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link className="text-2xl font-semibold flex items-center space-x-2" to="/">
          <img src={logo} alt="Dream Study Logo" className="h-12 w-16" />
          <span className="text-blue-700 font-bold text-2xl sm:text-3xl">
            Dream<span className="text-orange-600">Study</span>
          </span>
        </Link>
  
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
  
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavItem to="/" icon={<FaHome />} label="Home" />
          <NavItem to="/chatbot" icon={<FaRobot />} label="ChatBot" />
          <NavItem to="/admissions" icon={<FaUniversity />} label="Admissions" />
          <NavItem to="/feedback" icon={<FaCommentDots />} label="Feedback" />
          <NavItem to="/faqs" icon={<FaQuestionCircle />} label="FAQs" />
        </div>
  
        {/* User/Profile OR Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition hover:text-fuchsia-500"
              whileHover={{ scale: 1.1 }}
              onClick={() => window.location.href = "/user-details"}
            >
              <FaUserCircle size={32} className="hover:text-fuchsia-500" />
              <span className="text-lg font-medium">{user.name}</span>
            </motion.div>
          ) : (
            <>
              <Link 
                to="/credentials#login" 
                className="bg-transparent text-blue-400 hover:text-white px-3 py-1 rounded transition shadow"
              >
                Login
              </Link>
              <Link 
                to="/credentials" 
                className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded transition shadow"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
  
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <NavItem to="/" icon={<FaHome />} label="Home" />
          <NavItem to="/chatbot" icon={<FaRobot />} label="ChatBot" />
          <NavItem to="/admissions" icon={<FaUniversity />} label="Admissions" />
          <NavItem to="/feedback" icon={<FaCommentDots />} label="Feedback" />
          <NavItem to="/faqs" icon={<FaQuestionCircle />} label="FAQs" />
          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
            {user ? (
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 hover:text-fuchsia-500"
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.href = "/user-details"}
              >
                <FaUserCircle size={24} />
                <span>{user.name}</span>
              </motion.div>
            ) : (
              <>
                <Link 
                  to="/credentials#login" 
                  className="text-blue-400 hover:text-white transition"
                >
                  Login
                </Link>
                <Link 
                  to="/credentials" 
                  className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
  

export default HomePage;
