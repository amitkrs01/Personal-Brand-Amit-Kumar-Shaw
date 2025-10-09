import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { resumeData } from '../constants';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
}

const TypingIndicator = () => (
  <div className="flex items-center space-x-1 p-3">
    <span className="text-gray-500">Typing</span>
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Amit's AI assistant. Ask me anything about his skills, experience, or projects.", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const newMessages = [...messages, { text: messageText, isUser: true }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fullResumeText = JSON.stringify(resumeData);
      const prompt = `You are a friendly and professional AI assistant for Amit Kumar Shaw's personal portfolio. Your goal is to answer questions about Amit based ONLY on the provided resume data. Do not invent any information. If the answer is not in the data, say that you don't have that information. Keep your answers concise and helpful. Here is the resume data: ${fullResumeText}\n\nQuestion: "${messageText}"\n\nAnswer:`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const aiText = response.text;
      setMessages(prev => [...prev, { text: aiText, isUser: false }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const suggestions = [
    "What are his top skills?",
    "Tell me about his work at Veefin",
    "What's his most interesting project?"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 animate-fade-in-down">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] sm:h-[70vh] flex flex-col relative">
        <header className="bg-black text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold">Chat with Amit's AI</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300" aria-label="Close chat">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </header>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl mb-2 whitespace-pre-wrap ${msg.isUser ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Or try one of these:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestions.map((s, i) => (
                        <button key={i} onClick={() => handleSuggestionClick(s)} className="bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        )}
        
        <footer className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full bg-white border-2 border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="bg-black text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center hover:bg-gray-800 disabled:bg-gray-400 transition-colors">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default Chatbot;
