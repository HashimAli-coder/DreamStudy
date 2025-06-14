import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaSignOutAlt,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import AcademicInfo from "./AcademicInfo";
import Experience from "./Experience";
import ExtraDetails from "./ExtraDetails";
import logo from "../pages/images/DreamStudyLOGO.png";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", image: "" });
  const [activeSection, setActiveSection] = useState("personal");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      const userImage = localStorage.getItem(`profileImage_${storedUser.email}`);
      setSelectedImage(userImage || "");
    }
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedImage(imageUrl);
        localStorage.setItem(`profileImage_${user.email}`, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1930] via-[#142f4d] to-[#1a4063] flex flex-col items-center text-white relative overflow-x-hidden">
      <Navbar />
  
      {/* Profile Card Section */}
      <div className="w-11/12 lg:w-4/5 mt-24 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10">
        {/* Left: User Info */}
        <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white break-words">{user.name}</h3>
          <p className="text-gray-300 text-lg sm:text-xl break-words">{user.email}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSignOut}
            className="mt-4 flex justify-center md:justify-start items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all text-base sm:text-lg font-semibold"
          >
            <FaSignOutAlt size={20} /> Sign Out
          </motion.button>
        </div>
  
        {/* Right: Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-32 sm:w-40 h-32 sm:h-40 rounded-full shadow-lg"
        >
          <img
            src={selectedImage || "https://placehold.co/150"}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
          <label className="absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:scale-110 transition-all">
            <FaCamera size={18} />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </motion.div>
      </div>
  
      {/* Title */}
      <h1 className="font-extrabold text-4xl sm:text-5xl text-white text-center font-sans mt-10 sm:mt-12 mb-6 drop-shadow-lg">
        User Dashboard
      </h1>
  
      {/* Section Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 relative z-10 mb-6 px-4">
        <div className="absolute top-1/2 left-0 right-0 w-full h-1 bg-gray-500 rounded-full z-0"></div>
        {[
          { id: "personal", icon: <FaUser />, title: "Personal" },
          { id: "academic", icon: <FaGraduationCap />, title: "Academic" },
          { id: "experience", icon: <FaBriefcase />, title: "Experience" },
          { id: "extra", icon: <FaStar />, title: "Extra" },
        ].map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative group z-10"
          >
            <button
              onClick={() => setActiveSection(section.id)}
              className={`p-4 sm:p-5 rounded-full border-4 text-2xl sm:text-3xl transition-all shadow-md ${
                activeSection === section.id
                  ? "bg-orange-600 border-orange-400 text-white"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              {section.icon}
            </button>
            <span className="absolute top-full mt-2 text-xs sm:text-sm bg-white text-black px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all font-semibold shadow-md z-20">
              {section.title}
            </span>
          </motion.div>
        ))}
      </div>
  
      {/* Scrolling Note */}
      <div className="w-full text-center text-base sm:text-lg font-semibold text-white bg-white/20 px-4 sm:px-6 py-2.5 sm:py-3 mt-3 z-50 shadow-inner">
        <motion.p
          className="inline-block whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          🚀 Please provide accurate information. The better your details, the better your opportunities! 🌍
        </motion.p>
      </div>
  
      {/* Section Content Area */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full mt-6 sm:mt-8 px-4 md:px-12 lg:px-16"
      >
        {activeSection === "personal" ? (
          <PersonalInfo />
        ) : activeSection === "academic" ? (
          <AcademicInfo />
        ) : activeSection === "experience" ? (
          <Experience />
        ) : (
          <ExtraDetails />
        )}
      </motion.div>
  
      <Footer />
    </div>
  );
  
};

export default UserDetails;
