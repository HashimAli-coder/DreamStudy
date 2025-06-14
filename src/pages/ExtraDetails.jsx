import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExtraActivities = () => {
  const [activities, setActivities] = useState([
    { role: "", description: "" }, // ✅ Fixed field names
  ]);

  useEffect(() => {
    const fetchExtraDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }
  
      try {
        const response = await axios.get("http://localhost:5000/api/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data && response.data.extraCurricular.length > 0) {
          setActivities(response.data.extraCurricular); // ✅ Fix missing fields
        }
      } catch (error) {
        console.error("Error fetching extra details:", error);
        //toast.error("Failed to load extra details.");
      }
    };
  
    fetchExtraDetails();
  }, []);
  

  // ✅ Add new activity
  const addActivity = () => {
    setActivities([...activities, { role: "", description: "" }]);
  };

  // ✅ Remove activity
  const removeActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  // ✅ Handle field updates
  const handleChange = (index, field, value) => {
    const updated = [...activities];
    updated[index][field] = value;
    setActivities(updated);
  };

  // ✅ Save extra activities
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user-details",
        { extraCurricular: activities },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Corrected bracket
      );
    
      if (response.status === 200 || response.status === 201) {
        toast.success("Extra-curricular activities saved successfully!");
      } else {
        toast.error("Failed to save activities.");
      }
    } catch (error) {
      console.error("Error saving activities:", error);
      toast.error("An error occurred while saving activities.");
    }
    
  };


  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0A1F44] w-full px-4 py-10">
      < ToastContainer/>
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-30px] left-[-30px] w-72 h-72 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-30px] right-[-1px] w-80 h-80 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      {/* Large Icons at Start and End */}
      <FaStar className="absolute left-4 md:left-5 text-white text-9xl opacity-20 hidden md:block" />
      <FaStar className="absolute right-8 md:right-5 text-white text-9xl opacity-20 hidden md:block" />

      {/* Main Content Box */}
      <motion.div
        className="relative bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-xl w-full md:w-[85%] lg:w-[75%] xl:w-[65%] border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
          <FaStar className="mr-3 text-blue-300 text-4xl" /> Extra-Curricular Activities
        </h2>

        {/* Activity Inputs */}
        {activities.map((activity, index) => (
          <div key={index} className="relative border-b border-white/20 pb-6 mb-6">
            {/* Activity Name Input */}
            <input
              type="text"
              placeholder="Activity Name (e.g., Debate Club, Social Work)"
              className="input-box text-black mb-4 w-full"
              value={activity.activity}
              onChange={(e) => handleChange(index, "activity", e.target.value)}
            />

            {/* Description Input */}
            <textarea
              placeholder="Brief Description of Activity"
              className="input-box text-black mb-4 w-full h-24 resize-none"
              value={activity.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            ></textarea>

            {/* Duration (From - To) */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2">
                <label className="text-lg text-white mb-2 block">From</label>
                <input
                  type="date"
                  className="input-box text-black w-full"
                  value={activity.from}
                  onChange={(e) => handleChange(index, "from", e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="text-lg text-white mb-2 block">To</label>
                <input
                  type="date"
                  className="input-box text-black w-full"
                  value={activity.to}
                  onChange={(e) => handleChange(index, "to", e.target.value)}
                />
              </div>
            </div>

            {/* Remove Activity Button */}
            {activities.length > 1 && (
              <button
                onClick={() => removeActivity(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <FaTrash size={18} />
              </button>
            )}
          </div>
        ))}

        {/* Add Activity Button */}
        <button
          onClick={addActivity}
          className="btn-blue mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Activity
        </button>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button className="save-btn" onClick={handleSave}>Save Details</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraActivities;
