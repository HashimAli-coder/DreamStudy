import { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaArrowRight, FaUserGraduate, FaBrain, FaRocket, FaLightbulb } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CareerCounseling = () => {
  // Steps with 10+ Questions (Updated)
  const steps = [
    { question: "Select Your Highest Education", key: "education", type: "single", options: ["Matric", "Intermediate", "Bachelor's", "Master's"] },
    { question: "Select Your Interests (You can choose multiple)", key: "interests", type: "multi", options: ["Software Development", "Business", "Medicine", "Engineering", "Finance", "Arts", "Science", "Law"] },
    { question: "Select Your Hobbies (You can choose multiple)", key: "hobbies", type: "multi", options: ["Coding", "Reading", "Gaming", "Sports", "Music", "Painting", "Writing"] },
    { question: "Select Your Personality Type", key: "personality", type: "single", options: ["Logical", "Creative", "Analytical", "Social", "Leader", "Detail-Oriented"] },
    { question: "Select Your Technical Skills (You can choose multiple)", key: "technicalSkills", type: "multi", options: ["Programming", "Data Analysis", "Marketing", "Graphic Design", "AI/ML", "Cybersecurity"] },
    { question: "Select Your Soft Skills (You can choose multiple)", key: "softSkills", type: "multi", options: ["Communication", "Leadership", "Problem-Solving", "Teamwork", "Creativity", "Critical Thinking"] },
    { question: "Preferred Work Environment", key: "preferredWorkEnvironment", type: "single", options: ["Office", "Remote", "Hybrid", "Field Work", "Freelancing"] },
    { question: "How do you prefer collaboration?", key: "collaborationPreference", type: "single", options: ["In-Person Meetings", "Online Communication", "Project-Based Collaboration", "Minimal Collaboration"] },
  ];

  // State Management
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [careers, setCareers] = useState([]);

  // Handle Single Select Input
  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Multi-Select Input (Checkboxes)
  const handleMultiSelect = (key, value) => {
    setFormData((prev) => {
      const currentSelection = prev[key] || [];
      return {
        ...prev,
        [key]: currentSelection.includes(value) ? currentSelection.filter((v) => v !== value) : [...currentSelection, value],
      };
    });
  };

  const handleNext = () => {
    if (!formData[steps[step].key] || formData[steps[step].key].length === 0) {
      alert("Please select an option before proceeding.");
      return;
    }

    // If it's the last step, trigger the career recommendation
    if (step === steps.length - 1) {
      fetchCareers();
    } else {
      setStep(step + 1);
    }
  };

  // Fetch Career Recommendations
  const fetchCareers = async () => {
    console.log("FormData being sent:", formData);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/career-recommendation", formData);
      setCareers(response.data.careers);
    } catch (error) {
  if (error.response) {
    console.error("Server Error:", error.response.data); // Log full object
    console.log("Status:", error.response.status);
    console.log("Headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error:", error.message);
  }
}
  setLoading(false);
  };


  return (
    <div className=" mt-20  flex flex-col bg-gradient-to-br from-gray-900 via-[#0a1930] to-blue-900 text-white">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl bg-opacity-30 backdrop-blur-lg border border-gray-600 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:shadow-blue-500/50">
          <h2 className="text-3xl font-extrabold text-center text-fuchsia-400 drop-shadow-md tracking-wide">
            🎓 Career Counseling
          </h2>

          {/* Steps Section */}
          {step < steps.length ? (
            <div className="mt-6">
              <div className="flex items-center gap-3 text-lg font-medium text-white mb-4">
                <span className="text-3xl text-orange-400">{steps[step].icon}</span>
                <p>{steps[step].question}</p>
              </div>

              {/* Single Select Input */}
              {steps[step].type === "single" && (
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-500 text-gray-900 bg-gray-200 focus:ring-4 focus:ring-orange-500 transition-all shadow-lg"
                    onChange={(e) => handleSelect(steps[step].key, e.target.value)}
                    value={formData[steps[step].key] || ""}
                  >
                    <option value="">Select an option</option>
                    {steps[step].options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Multi Select Input */}
              {steps[step].type === "multi" && (
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {steps[step].options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer bg-gray-800 hover:bg-blue-700 p-3 rounded-lg shadow-lg transition">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData[steps[step].key]?.includes(option) || false}
                        onChange={() => handleMultiSelect(steps[step].key, option)}
                      />
                      <div
                        className={`w-5 h-5 flex items-center justify-center border rounded-full transition ${
                          formData[steps[step].key]?.includes(option) ? "bg-orange-500 border-orange-500" : "border-gray-400"
                        }`}
                      >
                        {formData[steps[step].key]?.includes(option) && <FaCheckCircle className="text-white text-sm" />}
                      </div>
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Next Button */}
              <button
                className={`mt-6 w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg ${
                  formData[steps[step].key] && formData[steps[step].key].length > 0
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
                onClick={handleNext}
              >
                {step === steps.length - 1 ? "🚀 Generate Fields" : "Next"}
                <FaArrowRight />
              </button>
            </div>
          ) : null}

          {/* Loading Animation */}
          {loading && <p className="text-center mt-6 text-blue-400 animate-pulse text-lg">🔍 Analyzing your responses...</p>}

          {/* Career Recommendations */}
          {careers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-center text-fuchsia-500">🏆 Recommended Careers:</h3>
              <div className="mt-6 grid gap-4">
                {careers.map((career, index) => (
                  <div key={index} className="p-6 bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl flex items-center gap-4 shadow-xl border-l-4 border-orange-500 transition-all duration-300 hover:scale-105">
                    <span className="text-3xl text-orange-400">
                      {career.includes("Engineer") ? <FaRocket /> : career.includes("Marketer") ? <FaLightbulb /> : <FaBrain />}
                    </span>
                    <p className="text-white text-lg font-medium">{career}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CareerCounseling;
