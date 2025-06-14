import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCity, FaPhone } from "react-icons/fa";
import { MdOutlineWc, MdCake } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const PersonalInfo = () => {
  const [personalData, setPersonalData] = useState({
    name: "",
    email: "",
    age: "",
    city: "",
    gender: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setPersonalData((prev) => ({
        ...prev,
        name: storedUser.name,
        email: storedUser.email,
      }));
    }

    // ✅ Fetch user details from backend
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userDetails = response.data;
          setPersonalData({
            name: userDetails.name || storedUser?.name || "",
            email: userDetails.email || storedUser?.email || "",
            age: userDetails.age || "",
            city: userDetails.city || "",
            gender: userDetails.gender || "",
            phoneNumber: userDetails.phoneNumber || "",
          });

          localStorage.setItem("phoneNumber", userDetails.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPersonalData({ ...personalData, age: value });
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: No token found!");
        return;
      }

      const response = await axios.put( // ✅ Changed from `POST` to `PUT`
        "http://localhost:5000/api/user-details",
        personalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("User details saved successfully!");
        localStorage.setItem("phoneNumber", personalData.phoneNumber);
      }
    } catch (error) {
      console.error("Error saving details:", error);
      toast.error("Failed to save details. Try again.");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0A1F44] px-4">
      <ToastContainer />

      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-30px] left-[-30px] w-72 h-72 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-30px] right-[-1px] w-80 h-80 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      <FaUser className="absolute left-4 md:left-5 text-white text-9xl opacity-20 hidden md:block" />
      <FaUser className="absolute right-8 md:right-5 text-white text-9xl opacity-20 hidden md:block" />

      <motion.div
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full md:w-[85%] lg:w-[75%] xl:w-[65%] border border-white/20 transform skew-x-[-10deg]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
          <FaUser className="mr-3 text-blue-300 text-4xl" /> Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative flex items-center">
            <input type="text" value={personalData.name} className="input-box pl-12 pr-12" readOnly />
            <FaUser className="text-white text-3xl absolute right-3" />
          </div>

          <div className="relative flex items-center">
            <input type="email" value={personalData.email} className="input-box pl-12 pr-12" readOnly />
            <FaEnvelope className="text-white text-3xl absolute right-3" />
          </div>

          <div className="relative flex items-center">
            <input type="text" placeholder="Age" className="input-box pl-12 pr-12" value={personalData.age} onChange={handleAgeChange} />
            <MdCake className="text-white text-3xl absolute right-3" />
          </div>

          <div className="relative flex items-center">
            <input type="text" placeholder="City" className="input-box pl-12 pr-12" value={personalData.city} onChange={(e) => setPersonalData({ ...personalData, city: e.target.value })} />
            <FaCity className="text-white text-3xl absolute right-3" />
          </div>

          <div className="relative flex items-center">
            <select className="input-box pl-12 pr-12 text-gray-800" value={personalData.gender} onChange={(e) => setPersonalData({ ...personalData, gender: e.target.value })}>
              <option value="" className="text-black">Select Gender</option>
              <option value="Male" className="text-black">Male</option>
              <option value="Female" className="text-black">Female</option>
              <option value="Prefer not to say" className="text-black">Prefer not to say</option>
            </select>
            <MdOutlineWc className="text-white text-3xl absolute right-3" />
          </div>

          <div className="relative flex items-center">
            <span className="absolute left-3 text-lg text-gray-300">+92</span>
            <input type="text" placeholder="Enter Phone Number" className="input-box pl-12 pr-12" value={personalData.phoneNumber} onChange={(e) => setPersonalData({ ...personalData, phoneNumber: e.target.value })} />
            <FaPhone className="text-white text-3xl absolute right-3" />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="save-btn" onClick={handleSave}>Save Details</button>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalInfo;