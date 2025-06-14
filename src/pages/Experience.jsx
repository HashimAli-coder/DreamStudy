import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    { type: "", field: "", role: "", duration: "" }, // ✅ Fixed field names
  ]);

  // ✅ Fetch user experience details when the component loads
  useEffect(() => {
    const fetchExperience = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.experience)) {
          setExperiences(response.data.experience.length > 0 ? response.data.experience : [
            { type: "", field: "", role: "", duration: "" }
          ]); // ✅ Ensure at least one entry exists
        }
      } catch (error) {
        console.error("Error fetching experience data:", error);
        toast.error("Failed to load experience details.");
      }
    };

    fetchExperience();
  }, []);

  // ✅ Add new experience entry
  const addExperience = () => {
    setExperiences([...experiences, { type: "", field: "", role: "", duration: "" }]);
  };

  // ✅ Remove experience entry
  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  // ✅ Handle field updates
  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  // ✅ Save experience details
const handleSave = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Session expired. Please log in again.");
    return;
  }

  // Ensure experience is an array before sending
  const experienceData = Array.isArray(experiences) ? experiences : [];

  console.log("🔍 Experience Data Being Sent:", JSON.stringify(experienceData)); // ✅ Debugging

  try {
    const response = await axios.put(
      "http://localhost:5000/api/user-details",
      { experience: experienceData }, // ✅ Send only experience (Backend preserves other fields)
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      toast.success("Experience details saved successfully!");
      console.log("✅ Experience saved:", response.data);
    } else {
      toast.error("Failed to save experience details.");
      console.error("❌ Unexpected Response:", response);
    }
  } catch (error) {
    console.error("❌ Error saving experience:", error.response?.data || error.message);
    toast.error("An error occurred while saving experience details.");
  }
};

  

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0A1F44] w-full px-4">
      < ToastContainer />
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-30px] left-[-30px] w-72 h-72 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-30px] right-[-1px] w-80 h-80 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Large Icons at Start and End */}
      <FaBriefcase className="absolute left-4 md:left-5 text-white text-9xl opacity-20 hidden md:block" />
      <FaBriefcase className="absolute right-8 md:right-5 text-white text-9xl opacity-20 hidden md:block" />

      {/* Main Content Box */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full md:w-[85%] lg:w-[75%] xl:w-[65%] border border-white/20 my-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
          <FaBriefcase className="mr-3 text-blue-300 text-4xl" /> Work Experience
        </h2>

        {/* Experience Inputs */}
        {experiences.map((exp, index) => (
          <div key={index} >
            {/* Remove Experience Button */}
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
              >
                <FaTrash size={18} />
              </button>
            )}

            {/* Select Type */}
            <select
              className="input-box mt-3 text-black mb-4 w-full"
              value={exp.type}
              onChange={(e) => handleChange(index, "type", e.target.value)}
            >
              <option value="" className="text-black">Select Type</option>
              <option value="Job" className="text-black">Job</option>
              <option value="Internship" className="text-black">Internship</option>
            </select>

            {/* Field Input */}
            <input
              type="text"
              placeholder="Field (e.g. Software Development)"
              className="input-box text-black mb-4 w-full"
              value={exp.field}
              onChange={(e) => handleChange(index, "field", e.target.value)}
            />

            {/* Role Input */}
            <input
              type="text"
              placeholder="Role (e.g. Frontend Developer)"
              className="input-box text-black mb-4 w-full"
              value={exp.role}
              onChange={(e) => handleChange(index, "role", e.target.value)}
            />

            {/* Duration (From - To) */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-lg text-white mb-2 block">From</label>
                <input
                  type="date"
                  className="input-box text-black w-full"
                  value={exp.from}
                  onChange={(e) => handleChange(index, "from", e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-lg text-white mb-2 block">To</label>
                <input
                  type="date"
                  className="input-box text-black w-full"
                  value={exp.to}
                  onChange={(e) => handleChange(index, "to", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Experience Button */}
        <button
          onClick={addExperience}
          className="btn-blue mt-2 flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Experience
        </button>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button className="save-btn" onClick={handleSave}>Save Details</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience;
