import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hashim from "./images/HashimFYPTEAM.jpg";
import Saeed from "./images/SaeedFYP.jpg";
import Luqman from "./images/luqmanfyp-removebg-preview.jpg"
import { 
  FaArrowUp, FaGraduationCap, FaUniversity, FaBrain, FaChalkboardTeacher, 
  FaRobot, FaUserGraduate, FaLightbulb, FaGlobe, FaUserTie, FaCode, FaDatabase
} from "react-icons/fa";
import { FaInfoCircle, FaEye, FaCogs, FaUsers } from "react-icons/fa";

const QUOTES = [
  "Education is the most powerful weapon you can use to change the world.",
  "The roots of education are bitter, but the fruit is sweet.",
  "An investment in knowledge pays the best interest.",
  "Education is not preparation for life; education is life itself.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Learning never exhausts the mind.",
  "Success is no accident. It is hard work, perseverance, learning, and studying.",
  "The expert in anything was once a beginner.",
  "Don’t let what you cannot do interfere with what you can do.",
  "It always seems impossible until it’s done.",
  "Strive for progress, not perfection.",
  "Push yourself, because no one else is going to do it for you.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Great things never come from comfort zones.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Work hard in silence, let your success be your noise.",
  "Dream big and dare to fail.",
  "Don’t limit your challenges, challenge your limits.",
  "Learn as if you will live forever, live like you will die tomorrow.",
  "Failure is the opportunity to begin again more intelligently.",
  "Education breeds confidence. Confidence breeds hope.",
  "A person who never made a mistake never tried anything new.",
  "What we learn with pleasure we never forget.",
  "Learning is a treasure that will follow its owner everywhere.",
  "Be a student as long as you still have something to learn.",
  "Education is the passport to the future.",
  "Teachers open the door, but you must enter by yourself.",
  "Study while others are sleeping; work while others are loafing.",
  "Opportunities don't happen. You create them.",
  "Believe you can and you're halfway there.",
  "Don’t be afraid to give up the good to go for the great.",
  "If you want to achieve greatness stop asking for permission.",
  "Start where you are. Use what you have. Do what you can.",
  "Success doesn’t come to you, you go to it.",
  "Be stronger than your excuses.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Only those who dare to fail greatly can ever achieve greatly.",
  "Stop doubting yourself, work hard, and make it happen.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "Don’t wish it were easier; wish you were better.",
  "The future depends on what you do today.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Stay focused and never give up.",
  "Knowledge will bring you the opportunity to make a difference.",
];


const images = [
  {
    url: 'https://morningside-alliance.org/wp-content/uploads/Morningside-Campus-at-Dusk-2-1200x500.jpg',
    text: 'We deal in United Kingdom',
  },
  {
    url: 'https://www.irishtimes.com/resizer/v2/XPHTWNJW3THZZ3UTNI3RDXXOPE.jpg?auth=7c68e5f87f047924f782717c2bd3707f0113d2fe02f8957df443bc9cfd9e6515&smart=true&width=1600&height=900',
    text: 'Study in Canada',
  },
  {
    url: 'https://www.edgeip.com/images/FCK/Image/20179/06Manitoba.jpg',
    text: 'Grab Opportunities in USA',
  },
  {
    url: 'https://i.guim.co.uk/img/media/91954c0517d9f1d48a9a62fcb70414697da9349b/0_45_5000_3000/master/5000.jpg?width=1200&quality=85&auto=format&fit=max&s=d9d74d31cf6de7b0e3b624acdd4c3ffb',
    text: 'Best Education in Australia',
  },
];

const HomePage = () => {
  const [quote, setQuote] = useState('');
  const [index, setIndex] = useState(0);
   const [user, setUser] = useState(null);
   const [quoteIndex, setQuoteIndex] = useState(0);
const [displayedText, setDisplayedText] = useState("");
const [charIndex, setCharIndex] = useState(0);



useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) setUser(storedUser);
}, []); // Only once on mount for user

useEffect(() => {
  const quote = QUOTES[quoteIndex];

  let typingTimeout;
  let pauseTimeout;

  if (charIndex < quote.length) {
    typingTimeout = setTimeout(() => {
      setDisplayedText((prev) => prev + quote[charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 50);
  } else {
    pauseTimeout = setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      setDisplayedText("");
      setCharIndex(0);
    }, 2000);
  }

  return () => {
    clearTimeout(typingTimeout);
    clearTimeout(pauseTimeout);
  };
}, [charIndex, quoteIndex]);

useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 2000);

  return () => clearInterval(interval);
}, [images.length]);

  


return (
  <div className="bg-offwhite min-h-screen">
    <Navbar />

    {/* Welcome Section */}
    <div className="relative flex flex-col items-center justify-center text-center mt-20 px-6 pt-6 bg-[#0a1930]">
      {/* Greeting Message */}
      <h2 className="text-4xl md:text-5xl text-blue-600 font-extrabold bg-gradient-to-r from-magenta to-orange bg-clip-text animate-fadeIn drop-shadow-lg">
        {user ? `Welcome Aboard, ${user.name}!` : "Welcome to DreamStudy"}
      </h2>

      {/* Random Study Quote */}
      <p className="text-xl md:text-2xl text-orange-600 text-center font-medium whitespace-nowrap">
        “{displayedText}”
      </p>

      {/* Decorative Underline */}
      <div className="mt-3 h-1 w-24 md:w-36 bg-gradient-to-r from-magenta to-orange rounded-full"></div>
    </div>

    {/* University Image Carousel */}
    <div className="relative w-full h-[400px] md:h-[530px] overflow-hidden">
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-2000 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[100%] text-center">
            {/* Prominent Text with Background */}
            <p className="text-xl md:text-3xl font-bold text-white bg-gray-900 bg-opacity-70 px-4 py-3 rounded-md shadow-lg">
              {image.text}
            </p>

            {/* Button Beneath the Text */}
            <a
              href="/admissions"
              className="mt-4 inline-block bg-orange-600 text-white px-4 py-2 rounded-md text-lg font-semibold transition duration-300 hover:bg-orange-400 hover:scale-105 z-10"
            >
              Apply Now
            </a>
          </div>
        </div>
      ))}
    </div>

    {/* About Us Section */}
    <div id="about" className="text-center p-12 bg-offwhite">
      {/* About Us Heading with Icon */}
      <div className="flex justify-center items-center space-x-3">
        <FaInfoCircle className="text-orange-600 text-4xl animate-pulse" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a1930] tracking-wide">
          About Us
        </h2>
      </div>
      {/* About Us Description */}
      <p className="mt-6 text-lg md:text-xl text-black max-w-4xl mx-auto leading-relaxed">
        <span className="font-bold text-orange-600">DreamStudy</span> is your trusted partner in turning your study abroad
        aspirations into reality. We provide an end-to-end advisory platform that simplifies the process of university
        selection, applications, scholarships, visa procedures, and career counseling.
        <br />
        <br />
        Our goal is to make higher education abroad affordable, accessible, and hassle-free. Whether you need guidance
        on choosing the right university, preparing documents, securing a visa, or finding scholarships, we ensure a
        transparent and smooth experience for every student.
      </p>

      {/* Navigation Links with Smooth Scroll */}
      <div className="mt-8 flex justify-center space-x-6 md:space-x-10 text-[#0a1930] font-bold">
        {/* Vision Link */}
        <a
          href="#vision"
          className="relative group text-lg flex items-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#vision").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaEye className="text-xl text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
          <span>Our Vision</span>
          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
        </a>

        {/* Services Link */}
        <a
          href="#services"
          className="relative group text-lg flex items-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaCogs className="text-xl text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
          <span>Our Services</span>
          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
        </a>

        {/* Team Link */}
        <a
          href="#team"
          className="relative group text-lg flex items-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#team").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaUsers className="text-xl text-orange-600 group-hover:rotate-12 transition-transform duration-300" />
          <span>Our Team</span>
          <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
    </div>

    {/* Our Vision Section */}
    <div id="vision" className="p-10 text-center">
      {/* Section Heading with Blinking Icon */}
      <h2 className="text-3xl md:text-4xl font-bold text-[#0a1930] flex items-center justify-center space-x-2">
        <FaLightbulb className="text-orange-600 animate-pulse" />
        <span>Our Vision</span>
      </h2>

      {/* Vision Cards Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        {[
          {
            title: "Streamlining Access to Global Education",
            icon: FaGlobe,
            desc: "We aim to make studying abroad simple and accessible by providing expert guidance, automated application processes, and personalized university recommendations."
          },
          {
            title: "Empowering Students with AI Assistance",
            icon: FaRobot,
            desc: "Our AI-powered platform helps students make informed decisions by analyzing their profiles and suggesting the best-fit universities and scholarships."
          }
        ].map((vision, index) => (
          <div
            key={index}
            className="p-6 bg-[#0a1930] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 flex items-center space-x-4"
          >
            {/* Vision Icon */}
            <vision.icon className="text-orange-500 text-7xl" />

            {/* Vision Details */}
            <div>
              <h3 className="text-xl font-bold text-orange-500">{vision.title}</h3>
              <p className="text-gray-300">{vision.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Back to About Us Link */}
      <div className="mt-10 text-center">
        <a
          href="#about"
          className="relative group text-lg font-semibold text-[#0a1930] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowUp className="text-xl text-orange-600 transition-transform duration-300" />
          <span className="relative">
            Back to About Us
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
      </div>
    </div>

    {/* Services Section */}
    <div id="services" className="p-12 text-center bg-offwhite">
      {/* Services Heading with Animated Icon */}
      <div className="flex justify-center items-center space-x-3">
        <FaCogs className="text-orange-600 text-4xl animate-pulse" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1930] tracking-wide">
          Our Services
        </h2>
      </div>

      {/* Services Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center">
        {[
          {
            title: "Scholarship Guidance",
            icon: FaGraduationCap,
            desc: "We provide comprehensive support to help students find, evaluate, and apply for scholarships globally."
          },
          {
            title: "Visa Guidance",
            icon: FaUniversity,
            desc: "From visa application forms to interview preparation, we offer complete assistance."
          },
          {
            title: "Application Guidance",
            icon: FaBrain,
            desc: "Applying to universities can be overwhelming. We simplify the process by guiding you."
          },
          {
            title: "Chatbot Support",
            icon: FaRobot,
            desc: "Need instant help? Our AI-powered chatbot is available 24/7 to answer queries."
          },
          {
            title: "Career Counseling",
            icon: FaChalkboardTeacher,
            desc: "Unsure about your career path? Our expert AI Counseling suggest the best courses."
          },
          {
            title: "AI-Based Procedure",
            icon: FaUserGraduate,
            desc: "Our AI-driven system recommends universities based on your academic performance."
          }
        ].map((service, index) => (
          <div
            key={index}
            className="p-6 bg-[#0a1930] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 flex items-start space-x-6 min-h-[180px]"
          >
            <service.icon className="text-orange-600 text-5xl flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-orange-600">{service.title}</h3>
              <p className="text-lg text-white mt-2">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Back to About Us Link */}
      <div className="mt-12 text-center">
        <a
          href="#about"
          className="relative group text-lg font-semibold text-[#0a1930] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowUp className="text-xl text-orange-600 transition-transform duration-300" />
          <span className="relative">
            Back to About Us
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
      </div>
    </div>

   {/* Our Team Section */}
<div id="team" className="p-10 text-center">
  {/* Section Heading with Blinking Icon */}
  <h2 className="text-4xl font-bold text-[#0a1930] flex items-center justify-center space-x-2">
    <FaUsers className="text-orange-600 animate-pulse" />
    <span>Our Team</span>
  </h2>

  {/* Team Cards Grid */}
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
    {[ 
      { 
        name: "Hashim Ali", 
        role: "Full Stack Developer", 
        icon: FaCode, 
        desc: "Hashim is responsible for both front-end and back-end development, ensuring a seamless user experience.",
        img: Hashim
      },
      { 
        name: "Luqman Jabbar", 
        role: "Project Manager & AI Specialist", 
        icon: FaUserTie, 
        desc: "Luqman oversees the project and develops AI-based solutions to enhance the platform's efficiency.",
        img: Luqman
      },
      { 
        name: "Saeed Khalid", 
        role: "Data Analyst", 
        icon: FaDatabase, 
        desc: "Saeed manages data analytics, providing insights to improve the student experience and recommendations.",
        img: Saeed
      },
    ].map((member, index) => (
      <div key={index} className="p-6 bg-[#0a1930] text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-500 flex flex-col items-center">
        
        {/* Profile Image */}
        <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full border-4 border-white shadow-md" />
        
        {/* Name & Role */}
        <h3 className="mt-4 text-xl font-bold text-orange-500 flex items-center space-x-2">
          <member.icon className="text-2xl" />
          <span>{member.name}</span>
        </h3>
        
        {/* Description */}
        <p className="mt-2 text-gray-300 text-center">{member.desc}</p>
      </div>
    ))}
    
  </div>
  {/* Back to About Us Link */}
  <div className="mt-10 text-center">
        <a
          href="#about"
          className="relative group text-lg font-semibold text-[#0a1930] flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaArrowUp className="text-xl text-orange-600 transition-transform duration-300" />
          <span className="relative">
            Back to About Us
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
      </div>
</div>
    <Footer />
    
  </div>
);

};

export default HomePage;
