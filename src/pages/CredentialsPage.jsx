import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaCheckCircle, FaArrowRight, FaUsersCog, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../pages/images/DreamStudyLOGO.png";
//import { Eye, EyeOff } from "lucide-react";


const CredentialsPage = () => {

  const navigate = useNavigate();
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminKeyword, setAdminKeyword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false); // only for signup
const [forgotEmail, setForgotEmail] = useState("");
const [forgotOtp, setForgotOtp] = useState("");
const [newPassword, setNewPassword] = useState("");
const [forgotStep, setForgotStep] = useState("email"); // 'email' | 'verify'



  const validateSignup = () => {
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    if (role === "admin" && adminKeyword !== "DSFYP") {
      toast.error("Invalid admin keyword!");
      return false;
    }
    if (!termsAccepted) {
      toast.error("You must accept the Terms & Conditions!");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    return true;
  };

  const validateLogin = () => {
    if (!loginEmail || !loginPassword) {
      toast.error("All fields are required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("OTP sent to your email");
      
        // ✅ Set signupData correctly here
        setSignupData({
          name,
          email,
          password,
          role,
        });
      
        setStep("otp");
      }
       else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  
  const handleResendOtp = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      res.ok ? toast.success("OTP resent!") : toast.error(data.message || "Failed to resend OTP");
    } catch {
      toast.error("Something went wrong while resending OTP");
    }
  };
  

  const handleVerifyOtp = async () => {
    // Basic validation
    if (!otp || !email || !password || !name || !role) {
      toast.error("Please fill all required fields and OTP");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...signupData, otp }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Signup complete! You can now log in.");
        setStep("login"); // Go to login step
      } else {
        toast.error(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Network error. Please try again.");
    }
  };
  
  
  
  
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user._id);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Invalid email or password!");
    }
  };
  const handleSendForgotOtp = async () => {
    if (!forgotEmail) return toast.error("Please enter your email");
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-forgot-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to email");
        setForgotStep("verify");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };
  
  const handleResetPassword = async () => {
    if (!forgotOtp || !newPassword) return toast.error("Fill all fields");
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          otp: forgotOtp,
          newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successfully");
        setStep("login");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Reset failed");
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#0a1930] to-[#122547] text-white">
      <ToastContainer />
      <img src={logo} alt="DreamStudy Logo" className="w-32 mb-4" />
      <h1 className="text-3xl font-bold">DreamStudy</h1>
      <p className="text-lg italic mb-6">Shape Your Future With Us</p>

      {/* Steps */}
      <div className="flex items-center mb-6">
        <div className={`flex items-center ${step === "role" ? "text-blue-400" : "text-gray-400"}`}>
          <FaUser size={24} />
          <p className="ml-2">Role</p>
        </div>
        <div className="w-12 h-1 bg-white mx-2"></div>
        <div className={`flex items-center ${step === "signup" ? "text-blue-400" : "text-gray-400"}`}>
          <FaCheckCircle size={24} />
          <p className="ml-2">Signup</p>
        </div>
        <div className="w-12 h-1 bg-white mx-2"></div>
        <div className={`flex items-center ${step === "login" ? "text-blue-400" : "text-gray-400"}`}>
          <FaLock size={24} />
          <p className="ml-2">Login</p>
        </div>
      </div>

      {/* Animated Step Container */}
      <motion.div className="w-full max-w-lg bg-[#112240] p-8 rounded-2xl shadow-2xl text-center">
        {step === "role" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
            <div className="flex justify-center gap-4">
              <button onClick={() => { setRole("user"); setStep("signup"); }} className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-700">
                <FaUser className="inline mr-2" /> User
              </button>
              <button onClick={() => { setRole("admin"); setStep("signup"); }} className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-700">
                <FaUsersCog className="inline mr-2" /> Admin
              </button>
            </div>
          </div>
        )}

        {step === "signup" && (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Full Name" className="p-3 bg-gray-800 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" className="p-3 bg-gray-800 rounded-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="p-3 bg-gray-800 rounded-lg w-full pr-10"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>
<div className="relative w-full">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    className="p-3 bg-gray-800 rounded-lg w-full pr-10"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>


            {role === "admin" && <input type="text" placeholder="Admin Keyword" className="p-3 bg-gray-800 rounded-lg" value={adminKeyword} onChange={(e) => setAdminKeyword(e.target.value)} />}

            <div className="flex items-center">
              <input type="checkbox" id="terms" checked={termsAccepted} onChange={() => setTermsAccepted(!termsAccepted)} />
              <label htmlFor="terms" className="ml-2">
                I agree to the <span className="text-blue-400 cursor-pointer underline" onClick={() => setShowTerms(true)}>Terms & Conditions</span>
              </label>
            </div>

            <button type="button" onClick={handleSignup} className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-700">Register</button>
            <p className="text-sm mt-2">Already have an account? <span className="text-blue-400 cursor-pointer underline" onClick={() => setStep("login")}>Login</span></p>
          </form>
        )}

        {showTerms && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="relative bg-[#0b1b30] bg-opacity-90 backdrop-blur-xl shadow-2xl border border-gray-500 p-8 rounded-lg w-[700px] max-h-[80vh] overflow-y-auto text-white"
            >
              <div className="flex justify-between items-center border-b border-gray-500 pb-2">
                <h2 className="text-2xl font-semibold text-blue-400">📜 Dream Study - Terms & Conditions</h2>
                <button className="text-red-500 hover:text-red-700 text-xl" onClick={() => setShowTerms(false)}>
                  <FaTimes />
                </button>
              </div>
              <ul className="mt-4 space-y-4 text-sm pr-2">
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Academic Integrity:</strong> Users must provide accurate academic and personal details.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Advisory Only:</strong> Dream Study does not guarantee admission or visa approval.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>AI Documents:</strong> SOPs and CVs are AI-generated and should be reviewed.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Eligibility:</strong> Results may vary from actual requirements.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Privacy:</strong> User data is not shared with third parties.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Feedback:</strong> Used to improve the platform.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>No Misuse:</strong> Misuse may lead to termination.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Liability:</strong> Dream Study is not liable for outcomes based on its suggestions.</p></li>
                <li className="flex items-start space-x-2"><span className="text-green-400">✔</span><p><strong>Agreement:</strong> Using the platform means agreeing to these terms.</p></li>
              </ul>
              <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold" onClick={() => setShowTerms(false)}>
                Close
              </button>
            </motion.div>
          </div>
        )}

{step === "otp" && (
  <div className="space-y-4 w-full max-w-sm mx-auto">
    <h2 className="text-xl font-semibold text-center">Verify OTP</h2>
    <input
  type="text"
  placeholder="Enter 6-digit OTP"
  maxLength={6}
  value={otp}
  onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))} // Only digits
  className="w-full p-2 border rounded text-black"
/>

    <button
      onClick={handleVerifyOtp}
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
    >
      Verify & Complete Signup
    </button>
    <button onClick={handleResendOtp} className="text-blue-400 text-sm underline">Resend OTP</button>

  </div>
)}


        {step === "login" && (
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="p-3 bg-gray-800 rounded-lg" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            
            <div className="relative w-full">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    className="w-full p-3 bg-gray-800 text-white rounded-lg"
    value={loginPassword}
    onChange={(e) => setLoginPassword(e.target.value)}
    required
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>

            <button onClick={handleLogin} className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-700">Login</button>
            <p className="text-sm text-gray-400 mt-2">
  <span
    className="text-blue-400 hover:underline cursor-pointer"
    onClick={() => {
      setStep("forgot");
      setForgotStep("email");
    }}
  >
    Forgot Password?
  </span>
</p>


            <p className="text-sm mt-2">Don’t have an account? <span className="text-blue-400 cursor-pointer underline" onClick={() => setStep("signup")}>Signup</span></p>
          </form>
        )}
        {step === "forgot" && (
  <div className="flex flex-col gap-4">
    {forgotStep === "email" && (
      <>
        <h2 className="text-xl font-semibold">Reset Your Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="p-3 bg-gray-800 rounded-lg"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
        />
        <button
          onClick={handleSendForgotOtp}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Send OTP
        </button>
      </>
    )}

    {forgotStep === "verify" && (
      <>
        <input
          type="text"
          placeholder="Enter OTP"
          className="p-3 bg-gray-800 rounded-lg"
          value={forgotOtp}
          onChange={(e) => setForgotOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="p-3 bg-gray-800 rounded-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </>
    )}

    <p className="text-sm mt-2">
      Back to{" "}
      <span
        className="text-blue-400 cursor-pointer underline"
        onClick={() => setStep("login")}
      >
        Login
      </span>
    </p>
  </div>
)}

      </motion.div>
    </div>
  );
};

export default CredentialsPage;
