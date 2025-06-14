import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import Navbar from "./Navbar"; // Ensure this is the correct path
import Footer from "./Footer"; // Ensure this is the correct path

import { 
    FaGlobe, FaUniversity, FaBookOpen, FaClipboardList, 
    FaLayerGroup, FaExclamationCircle , FaGraduationCap, FaSearchDollar, 
    FaPassport, FaFileInvoiceDollar, FaRobot, FaUserTie, 
    FaClock, FaComments, FaDollarSign 
} from "react-icons/fa";

const faqs = [
  { question: "What is Dream Study?", answer: "Dream Study is an affordable, self-service platform designed to help Pakistani students study abroad. It provides end-to-end guidance, from university selection and application support to visa assistance and scholarship opportunities. Our goal is to make studying abroad easier and more accessible without the high costs of traditional consultancies.", icon: FaGlobe },
  { question: "Which countries does Dream Study support?", answer: "Currently, Dream Study assists students applying to universities in the UK, USA, Canada, and Australia. These countries offer world-class education, diverse career opportunities, and numerous scholarship options for international students.", icon: FaUniversity },
  { question: "Is Dream Study a consultancy service?", answer: "No, Dream Study is not a traditional consultancy. It is an automated, tech-driven platform that provides structured support, AI-based recommendations, and 24/7 chatbot assistance. While we do offer additional consulting services, our main focus is empowering students with the right resources and guidance to apply on their own.", icon: FaBookOpen },
  { question: "How does the profile assessment work?", answer: "Our AI-powered profile assessment tool evaluates your academic qualifications, grades, study gap, work experience, and extracurricular activities. Based on this data, it suggests suitable universities, programs, and potential scholarship opportunities that match your profile and aspirations.", icon: FaClipboardList },
  { question: "Can I apply to multiple universities at the same time?", answer: "Yes! Dream Study allows you to apply to multiple universities simultaneously. Our platform helps you organize your applications, track deadlines, and manage required documents efficiently, ensuring you maximize your chances of getting accepted.", icon: FaLayerGroup },
  { question: "What if I do not meet the eligibility criteria?", answer: "If you do not meet the eligibility criteria for your preferred universities, you still have options. You can explore alternative universities with flexible admission policies, enroll in foundation or pathway programs, or improve your profile through additional certifications and test scores.", icon: FaExclamationCircle },
  { question: "Does Dream Study provide scholarship opportunities?", answer: "Yes! We connect students with fully funded and partial scholarships based on their academic achievements, financial background, and country preferences. Our database is regularly updated with the latest scholarships to help students reduce their financial burden.", icon: FaGraduationCap },
  { question: "How can I find and apply for scholarships?", answer: "Our platform offers a comprehensive list of scholarships tailored to your profile. You can filter scholarships based on country, degree level, and eligibility criteria. We also provide step-by-step guidance on how to apply, including preparing personal statements and required documents.", icon: FaSearchDollar },
  { question: "Does Dream Study help with visa applications?", answer: "Absolutely! Dream Study provides a step-by-step visa application guide for each supported country. We assist with collecting required documents, securing CAS letters, booking biometrics, and preparing for visa interviews. Our goal is to ensure a smooth visa process for all students.", icon: FaPassport },
  { question: "What financial documents are required for a study visa?", answer: "The required financial documents vary by country, but generally include a bank statement showing sufficient funds, a financial sponsorship letter (if applicable), and proof of funding sources. Our platform provides country-specific guidance on financial requirements.", icon: FaFileInvoiceDollar },
  { question: "How does the chatbot assist students?", answer: "Our AI-powered chatbot provides 24/7 support, answering questions about university applications, visa procedures, scholarships, and other study abroad concerns. It is designed to offer instant responses and connect students with human consultants when needed.", icon: FaRobot },
  { question: "Can I get personalized consulting?", answer: "Yes! While Dream Study is primarily a self-service platform, we offer personalized consulting sessions for students who need expert advice. These sessions cover university selection, SOP writing, visa interview preparation, and career counseling.", icon: FaUserTie },
  { question: "How long does the application process take?", answer: "The application process varies depending on the university and country. Generally, it takes 6–12 months from university shortlisting to visa approval. We recommend starting early to avoid last-minute stress and to have enough time to explore scholarship opportunities.", icon: FaClock },
  { question: "Does Dream Study provide interview preparation?", answer: "Yes! Dream Study offers detailed interview preparation guides and common questions asked by universities. While we do not conduct one-on-one mock interviews, our resources help students prepare effectively for university and visa interviews.", icon: FaComments },
  { question: "Is Dream Study free to use?", answer: "Dream Study provides many free services, including university search, profile assessment, and basic application guidance. However, premium features such as personalized consulting and advanced visa support may have minimal charges to cover expert assistance.", icon: FaDollarSign }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Heading */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1930] flex items-center justify-center gap-3 mt-20">
          <FaQuestionCircle className="text-orange-600 animate-pulse" /> FAQs
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
          Find answers to the most frequently asked questions about Dream Study.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              className={`w-full p-5 flex items-center space-x-4 text-left rounded-lg border-l-4 transition duration-300 
                         border-orange-600 hover:bg-[#12243e] ${openIndex === index ? "bg-[#0a1930]" : "bg-[#0a1930]"}`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Display Icon */}
              <faq.icon className="text-orange-500 text-2xl" />
              
              {/* Question Text */}
              <span className="text-lg font-semibold text-white flex-1">{faq.question}</span>

              {/* Toggle Icon */}
              {openIndex === index ? (
                <FaChevronUp className="text-orange-600 text-xl" />
              ) : (
                <FaChevronDown className="text-orange-600 text-xl" />
              )}
            </button>

            {/* Answer Section */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 p-4 bg-white text-gray-900 rounded-lg shadow-lg" : "max-h-0"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQPage;
