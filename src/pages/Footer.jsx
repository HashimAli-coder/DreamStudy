import React from "react";
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt
} from "react-icons/fa";
import logo from "../pages/images/DreamStudyLOGO.png";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white w-full py-5 px-10 overflow-hidden">
      
      {/* Floating Aesthetic Elements */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent to-gray-950 opacity-90"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-30"></div>

      {/* Footer Content Container */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="DreamStudy Logo" className="w-36 mb-4" />
          <p className="text-gray-400 leading-7">
            Shape your future with us. DreamStudy guides students toward international education success.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-400">Our Services</h3>
          <ul className="text-gray-400 space-y-3">
            <li className="hover:text-white transition-all">🎓 University Selection</li>
            <li className="hover:text-white transition-all">🛂 Visa Assistance</li>
            <li className="hover:text-white transition-all">💰 Scholarship Guidance</li>
            <li className="hover:text-white transition-all">📜 Application Process</li>
            <li className="hover:text-white transition-all">👨‍💼 Consultation</li>
          </ul>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-400">Follow Us</h3>
          <div className="flex space-x-5">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-blue-500 transition-all"
                href="#"
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-red-400">Contact Us</h3>
          <p className="flex items-center space-x-3 text-gray-400">
            <FaPhone className="text-green-400" /> <span>+92 310 1234567</span>
          </p>
          <p className="flex items-center space-x-3 text-gray-400 mt-3">
            <FaEnvelope className="text-blue-400" /> <span>dreamstudyservices@gmail.com</span>
          </p>
          <p className="flex items-center space-x-3 text-gray-400 mt-3">
            <FaMapMarkerAlt className="text-red-400" /> <span>Islamabad, Pakistan</span>
          </p>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="relative text-center text-gray-500 mt-10 border-t border-gray-700 pt-5">
        <p>© 2025 DreamStudy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
