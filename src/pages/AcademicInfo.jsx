import { useState, useEffect } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AcademicInfo = () => {
  const [academicData, setAcademicData] = useState({
    matric: { subject: "", grade: "", institute: "" },
    intermediate: { subject: "", grade: "", institute: "" },
    bachelors: { course: "", CGPA: "", university: "" },
    studyGap: "",
    englishTest: { type: "", score: "" },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found. Authorization denied.");
      toast.error("Session expired. Please log in again.");
      return;
    }

    // ✅ Fetch academic details from backend
    const fetchAcademicDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const userDetails = response.data;
          console.log("📌 Academic Details Fetched:", userDetails.academic);

          setAcademicData({
            matric: userDetails.academic?.matric || { subject: "", grade: "", institute: "" },
            intermediate: userDetails.academic?.intermediate || { subject: "", grade: "", institute: "" },
            bachelors: userDetails.academic?.bachelors || { course: "", CGPA: "", university: "" },
            studyGap: userDetails.academic?.studyGap || "",
            englishTest: userDetails.academic?.englishTest || { type: "", score: "" },
          });
        }
      } catch (error) {
        console.error("❌ Error fetching academic details:", error);
      }
    };

    fetchAcademicDetails();
  }, []);

  const handleChange = (updatedData) => {
    setAcademicData(updatedData);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user-details",
        {
          academic: academicData, // ✅ Send only academic (Backend preserves other fields)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        toast.success("Academic details saved successfully!");
      } else {
        toast.error("Failed to save academic details.");
      }
    } catch (error) {
      console.error("Error saving academic details:", error);
      toast.error("An error occurred while saving academic details.");
    }
  };
  



  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0A1F44] w-full py-12 px-4">

<ToastContainer />
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-30px] left-[-30px] w-72 h-72 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-30px] right-[-1px] w-80 h-80 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full blur-3xl opacity-40"></div>
      </div>

      <FaGraduationCap className="absolute left-4 md:left-5 text-white text-9xl opacity-20 hidden md:block" />
      <FaGraduationCap className="absolute right-8 md:right-5 text-white text-9xl opacity-20 hidden md:block" />

      <motion.div
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full md:w-[85%] lg:w-[75%] xl:w-[65%] border border-white/20 transform skew-x-[-10deg]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
          <FaGraduationCap className="mr-3 text-blue-300 text-4xl" /> Academic Information
        </h2>

        {/* Matric Inputs */}
        <div className="space-y-3">
          <p className="text-white font-medium">Matric</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              className="input-box"
              value={academicData.matric.subject}
              onChange={(e) => handleChange({ ...academicData, matric: { ...academicData.matric, subject: e.target.value } })}
            >
              <option value="" className="text-black">Select Subject</option>
              <option value="Science" className="text-black">Science</option>
              <option value="Computer" className="text-black">Computer</option>
            </select>
            <input
              type="text"
              placeholder="Grade"
              className="input-box"
              value={academicData.matric.grade}
              onChange={(e) => handleChange({ ...academicData, matric: { ...academicData.matric, grade: e.target.value } })}
            />
            <input
              type="text"
              placeholder="Institute"
              className="input-box"
              value={academicData.matric.institute}
              onChange={(e) => handleChange({ ...academicData, matric: { ...academicData.matric, institute: e.target.value } })}
            />
          </div>
        </div>

        {/* Intermediate Inputs */}
        <div className="space-y-3">
          <p className="text-white font-medium">Intermediate</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              className="input-box"
              value={academicData.intermediate.subject}
              onChange={(e) => handleChange({ ...academicData, intermediate: { ...academicData.intermediate, subject: e.target.value } })}
            >
              <option value="" className="text-black">Select Subject</option>
              <option value="Pre-Medical" className="text-black">Pre-Medical</option>
              <option value="ICS" className="text-black">ICS</option>
              <option value="Pre-Engineering" className="text-black">Pre-Engineering</option>
              <option value="Other" className="text-black">Other</option>
            </select>
            <input
              type="text"
              placeholder="Grade"
              className="input-box"
              value={academicData.intermediate.grade}
              onChange={(e) => handleChange({ ...academicData, intermediate: { ...academicData.intermediate, grade: e.target.value } })}
            />
            <input
              type="text"
              placeholder="Institute"
              className="input-box"
              value={academicData.intermediate.institute}
              onChange={(e) => handleChange({ ...academicData, intermediate: { ...academicData.intermediate, institute: e.target.value } })}
            />
          </div>
        </div>

          {/* Bachelor's Details */}
          <div className="space-y-3 mt-4">
          <p className="text-white font-medium">Bachelors</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Course"
              className="input-box"
              value={academicData.bachelors.course}
              onChange={(e) => handleChange({ ...academicData, bachelors: { ...academicData.bachelors, course: e.target.value } })}
            />
            <input
              type="text"
              placeholder="CGPA"
              className="input-box"
              value={academicData.bachelors.CGPA}
              onChange={(e) => handleChange({ ...academicData, bachelors: { ...academicData.bachelors, CGPA: e.target.value } })}
            />
            <input
              type="text"
              placeholder="University"
              className="input-box"
              value={academicData.bachelors.university}
              onChange={(e) => handleChange({ ...academicData, bachelors: { ...academicData.bachelors, university: e.target.value } })}
            />
          </div>
        </div>

        {/* Study Gap */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Study Gap (if any)"
            className="input-box"
            value={academicData.studyGap}
            onChange={(e) => handleChange({ ...academicData, studyGap: e.target.value })}
          />
        </div>

        {/* English Test */}
        <div className="mt-4">
          <p className="text-white font-medium">English Test</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              className="input-box bg-white/20 text-white placeholder-white"
              value={academicData.englishTest.type}
onChange={(e) =>
  handleChange({ ...academicData, englishTest: { ...academicData.englishTest, type: e.target.value } })
}

            >
              <option value="" className="text-black">Select Test</option>
              <option value="IELTS" className="text-black">IELTS</option>
              <option value="PTE" className="text-black">PTE</option>
              <option value="TOEFL" className="text-black">TOEFL</option>
              <option value="NotYet" className="text-black">Not Yet</option>
            </select>
            <input
              type="text"
              placeholder="Score"
              className="input-box"
              value={academicData.englishTest.score}
              onChange={(e) =>
                handleChange({ ...academicData, englishTest: { ...academicData.englishTest, score: e.target.value } })
              }
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={handleSave} className="save-btn">Save Details</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AcademicInfo;
