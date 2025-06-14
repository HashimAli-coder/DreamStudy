import { useState } from "react";
import { FaUser, FaEnvelope, FaStar, FaCommentDots, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbackList, setFeedbackList] = useState([]);



  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast.error("Please fill in all fields before submitting!", { position: "top-right" });
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      rating: rating,
      message: formData.message,
    };

    emailjs
      .send(
        "service_5fug6mr",
        "template_6h68myf",
        templateParams,
        "2u0ugtC9c-x8KW3Ck"
      )
      .then(
        (response) => {
          toast.success("Feedback sent successfully!", { position: "top-right" });

          // If rating is 4 or above, add feedback to the list
          if (rating >= 4) {
            setFeedbackList((prevFeedback) => [
              ...prevFeedback,
              { name: formData.name, message: formData.message, rating: rating },
            ]);
          }

          // Reset form after successful submission
          setFormData({ name: "", email: "", message: "" });
          setRating(0);
        },
        (error) => {
          toast.error("Failed to send feedback. Please try again.", { position: "top-right" });
        }
      );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />

      {/* Page Heading */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1930] flex items-center justify-center gap-3 mt-20">
          <FaCommentDots className="text-orange-600 animate-bounce" /> Feedback
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Your feedback helps us improve Dream Study. Share your thoughts!
        </p>
      </div>

      {/* Feedback Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-10 border-t-4 border-orange-600">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a1930]" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-4 border-[#0a1930] bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 transition-all duration-300"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0a1930]" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-4 border-[#0a1930] bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 transition-all duration-300"
            />
          </div>

          {/* Rating System */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Rate Your Experience</p>
            <div className="flex justify-center gap-3 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-3xl cursor-pointer transition-all ${
                    (hover || rating) >= star ? "text-orange-500 scale-110" : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Feedback Text Area */}
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-4 text-[#0a1930]" />
            <textarea
              name="message"
              placeholder="Write your feedback here..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border-4 border-[#0a1930] bg-white text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 transition-all duration-300"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 text-lg font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Submit <FaPaperPlane />
          </button>
        </form>
      </div>

      

      <Footer />
    </div>
  );
};

export default FeedbackPage;
