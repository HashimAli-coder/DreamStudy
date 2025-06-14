import React, { useState } from 'react';
import axios from 'axios';
//import { MessageSquare, Send, Smile, User, Loader2 } from 'lucide-react';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dreamy = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        const newChat = [...chat, { sender: 'user', text: userMessage }];
        setChat(newChat);
        setUserMessage('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chatbot', { message: userMessage });
            const botReply = response.data.reply;

            setChat([...newChat, { sender: 'bot', text: botReply }]);
        } catch (error) {
            setChat([...newChat, { sender: 'bot', text: '⚠️ Sorry, I couldn’t fetch a response. Try again later!' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-white">
            <Navbar />
    
            {/* Chatbot Section */}
            <div className="flex-grow flex justify-center items-center px-6 py-20 mt-10">
                <div className="w-full max-w-5xl bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border-4 border-orange-500 animate-fadeIn">
                    
                    {/* Chatbot Header */}
                    <div className="bg-darkblue text-white text-center py-4 text-2xl font-bold flex items-center justify-center">
                        <Smile size={28} className="mr-2 text-orange-400" /> 
                        Dreamy Chatbot
                    </div>
                    
                    {/* Description */}
                    <p className="text-center text-gray-300 px-6 py-2 text-sm">
                        Ask me anything about studying abroad, scholarships, visas, and financial aid. 
                        I'm here to help! 🌍✈️
                    </p>
    
                    {/* Chat Messages */}
                    <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3 bg-gray-900">
                        {chat.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-sm text-sm shadow-md animate-slideIn ${
                                    msg.sender === 'user' 
                                    ? 'bg-magenta text-white self-end' 
                                    : 'bg-orange-500 text-white self-start'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    {msg.sender === 'user' ? <User size={16} /> : <MessageSquare size={16} />}
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Show typing animation when waiting for response */}
                        {loading && (
                            <div className="p-3 rounded-lg max-w-sm text-sm shadow-md bg-orange-500 text-white self-start animate-pulse flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin" />
                                Dreamy is typing...
                            </div>
                        )}
                    </div>
    
                    {/* Input Section */}
                    <div className="flex items-center border-t border-gray-700 p-3 bg-gray-800">
                        <input
                            type="text"
                            className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white outline-none"
                            placeholder="Ask me about studying abroad..."
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                        />
                        <button 
                            onClick={sendMessage} 
                            className="bg-magenta p-3 rounded-r-lg text-white hover:bg-orange-500 transition-all duration-300">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
    
            <Footer />
        </div>
    );
};

export default Dreamy;
