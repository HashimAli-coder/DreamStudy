import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "./pages/CredentialsPage";
import HomePage from "./pages/HomePage"; 
import UserDetails from "./pages/UserDetails";
import Chatbot from"./pages/Chatbot";
import FAQS from "./pages/FAQs";
import Feedback from "./pages/Feedback";
import Application from "./pages/Application";
import Career from "./pages/CareerCounseling";
import Dreamy from "./pages/Dreamy";
import Coming from "./pages/ComingSoonPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user-details" element={<UserDetails />} /> 
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/faqs" element={<FAQS />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admissions" element={<Application />} />
        <Route path="/career-counseling" element={<Career />} />
        <Route path="/dreamy" element={<Dreamy />} />
        <Route path="/coming-soon" element={<Coming />} />
      </Routes>
    </Router>
  );
}

export default App;
