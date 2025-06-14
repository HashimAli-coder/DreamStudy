
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
//import { Send, Bot, User, Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

// --- Chatbot Component Starts ---
function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const studyAbroadKeywords = [
    "study", "abroad", "foreign", "overseas", "semester", "intake", "campus", "dream university", "university portal", "career",
    "university", "college", "course", "degree", "program", "bachelor", "master", "phd",
    "application", "apply", "admission", "acceptance", "final exams", "requirements", "eligibility", "documents", "transcript", "offer letter", "deadline", "start application",
    "ielts", "toefl", "gre", "gmat", "test score", "language requirement",
    "scholarship", "scholarships", "fully funded", "partial", "funding", "financial aid", "eligibility criteria", "gpa", "cover tuition", "cover living expenses",
    "visa", "student visa", "visa interview", "biometric", "financial proof", "cas", "passport",
    "document", "documents", "sop", "cv", "resume", "recommendation letter", "letter of recommendation",
    "application fee", "tuition", "fee", "living cost", "cost of living", "bank statement", "expenses", "deposit", "work part-time",
    "housing", "accommodation", "hostel", "dorm",
    "study gap", "minimum gpa", "connect to", "speak to someone", "talk to advisor", "human advisor", "stuck with application", "don’t meet requirements", "help with scholarship", "guidance", "counseling",
    "usa", "uk", "canada", "germany", "australia", "france", "italy", "saudi", "europe", "america"
  ];

  const greetingWords = ["hi", "hello", "hey", "salam", "assalamualaikum"];

  const handleChitChat = (text) => {
    const lower = text.toLowerCase().trim();

    if (greetingWords.some(g => lower === g || lower === `${g}!` || lower === `${g}.`)) {
      return "Hi there! 👋 How can I assist you with your study plans?";
    }

    const responses = {
      wellBeing: ["how are you", "what’s up", "how you doing", "what are you doing"],
      thanks: ["thanks", "thank you", "shukriya", "appreciate it"],
      bye: ["bye", "goodbye", "khuda hafiz", "see you"],
      okay: ["ok", "okay", "cool", "fine", "alright"],
      name: ["your name", "who are you", "who is dreamy"],
      owner: ["your owner", "who made you", "who created you"],
      feedback: ["i am good", "i am fine", "i’m doing great"]
    };

    if (responses.wellBeing.some(q => lower.includes(q))) return "I'm just helping students reach their dream universities! 🌍✨";
    if (responses.feedback.some(q => lower.includes(q))) return "That's great to hear! 😊 Let me know if you need anything.";
    if (responses.thanks.some(q => lower.includes(q))) return "You're very welcome! I'm here to help. 🙌";
    if (responses.bye.some(q => lower.includes(q))) return "Goodbye! Best of luck with your journey ahead! 🚀";
    if (responses.okay.some(q => lower.includes(q))) return "Alright! Let me know if you have any questions.";
    if (responses.name.some(q => lower.includes(q))) return "I'm Dreamy 🤖 — your AI-powered study assistant!";
    if (responses.owner.some(q => lower.includes(q))) return "I was created by Team Dream-Study, students from NUML 🇵🇰.";

    return null;
  };

  const isRelevantMessage = (text) => {
    const lower = text.toLowerCase();
    const keywordHits = studyAbroadKeywords.filter(word => lower.includes(word)).length;
    const intentPhrases = [
      "how to apply", "study abroad", "scholarships for", "funded program", "visa process",
      "best country for", "get admission", "requirements for"
    ];
    const matchesIntent = intentPhrases.some(p => lower.includes(p));
    return keywordHits >= 1 || matchesIntent;
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");

    const chitChatResponse = handleChitChat(message);
    if (chitChatResponse) {
      setChatHistory(prev => [...prev, { sender: "bot", text: chitChatResponse }]);
      return;
    }

    if (!isRelevantMessage(message)) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ I'm designed to help with Study Abroad topics like universities, scholarships, admissions, and visas. Please rephrase your question with more context!",
        },
      ]);
      return;
    }

    setLoading(true); 
    try {
      const res = await axios.post("https://35e4-34-125-46-57.ngrok-free.app/chat", { message });

      const botMessage = {
        sender: "bot",
        text: res.data?.response || "🤔 I'm not sure I understood that. Can you clarify your study-related question?",
      };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Chatbot Error:", error);
      setChatHistory(prev => [
        ...prev,
        { sender: "bot", text: "❌ The Chatbot is under maintenance at the moment" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatChatMessage = (text) => {
  return text
    .split('\n')
    .flatMap(line => {
      const trimmedLine = line.trim();

      // First: break line into segments if multiple headings or markers are merged
      const segments = trimmedLine.split(/(?<=\.)\s*-(?=\s)/g); // e.g., "80%. - **Competition"

      return segments.map(segment => {
        const cleanSegment = segment.trim();

        // Match heading that starts with any combination of heading markers
        const headingPattern = /^([\-#\*]{2,})\s*(.*)/;
        const headingMatch = cleanSegment.match(headingPattern);

        if (headingMatch) {
          return `<div style='color:#ffffff; font-weight:bold; text-align:left;'>${headingMatch[2]}</div>`;
        }

        // Add <br> if line ends with a marker or punctuation
        const endLinePattern = /([\-#\*:]|\*\*|\*\*\*|--|---|###)$/;
        if (endLinePattern.test(cleanSegment)) {
          return `${cleanSegment}<br>`;
        }

        return cleanSegment;
      });
    })
    .join('');
};


  
  

  useEffect(() => {
    const scrollToBottom = () => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };
    scrollToBottom();
  }, [chatHistory]);

  return (
    <>
      <Navbar />
      <div className="bg-[#0a1930] text-white flex flex-col h-screen">
      <div className="w-full mt-16 px-4 text-center pt-8">
  <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-fuchsia-600 flex items-center justify-center gap-3 animate-fadeIn flex-wrap">
    <FaRobot className="text-orange-600 text-3xl sm:text-5xl animate-bounce" />
    DreamStudy Chatbot
  </h1>
</div>
 

        <div className="flex-1 overflow-hidden mt-4 px-2 sm:px-4 pb-32">
          <div
            ref={chatContainerRef}
            className="h-full overflow-y-auto px-2 sm:px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                className={`flex items-start gap-3 sm:gap-4 ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {chat.sender === "bot" && <Bot className="text-blue-400 shrink-0" size={24} />}
                <div
                  className={`px-4 py-3 sm:px-6 sm:py-4 text-base sm:text-lg rounded-2xl shadow-md max-w-[90%] sm:max-w-3xl leading-relaxed text-left break-words
                    ${chat.sender === "user" ? "bg-orange-600 text-white" : "bg-blue-500 text-white"}`}
                  dangerouslySetInnerHTML={{ __html: formatChatMessage(chat.text) }}
                />
                {chat.sender === "user" && <User className="text-green-400 shrink-0" size={24} />}
              </motion.div>
            ))}

            {loading && (
              <motion.div className="flex items-center gap-3 justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Loader2 className="text-blue-400 animate-spin" size={24} />
                <p className="px-4 py-3 text-base sm:text-lg rounded-2xl bg-gray-600 text-white shadow-md text-left">
                  Thinking...
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-3 sm:p-4 flex items-center sm:gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask something..."
            className="flex-1 w-full text-white px-4 py-3 text-base sm:text-lg font-normal rounded-lg bg-gray-700 border-2 border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
          />
          <motion.button
            onClick={sendMessage}
            className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-all shadow-lg"
            whileTap={{ scale: 0.9 }}
            disabled={loading}
          >
            <Send className="text-white" size={22} />
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
