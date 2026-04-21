import { useState, useEffect, useRef } from 'react';
import { chatWithAI } from '../../services/aiService';

// Icons
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18M3 12h18M18.5 5.5l-13 13M5.5 5.5l13 13"/>
  </svg>
);

/* ─── Message Bubble ─────────────────────────────────────────── */
function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  if (isError) {
    return (
      <div className="flex flex-col items-center my-4">
        <span className="text-xs text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-100 dark:border-rose-500/20">
          {message.content}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        isUser 
          ? 'bg-brand-600 text-white rounded-br-sm' 
          : 'bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-slate-200 dark:border-slate-700'
      }`}>
        {message.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i !== message.content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Chatbot Component ─────────────────────────────────── */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Pathlo AI guide. Ask me about colleges, exams, or career options!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    
    // Add user message to UI
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Filter out error messages from history before sending
      const chatHistory = newMessages.filter(m => m.role === 'user' || m.role === 'assistant');
      const response = await chatWithAI(chatHistory);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'error', content: 'AI is temporarily unavailable. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ─── Floating Button ──────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 rotate-90 scale-90 opacity-0 pointer-events-none' 
            : 'bg-brand-600 hover:bg-brand-700 text-white hover:scale-105 hover:shadow-brand rotate-0 scale-100 opacity-100'
        }`}
        aria-label="Open AI Assistant"
      >
        <ChatIcon />
      </button>

      {/* ─── Chat Window ──────────────────────────────────────── */}
      <div 
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-48px)] sm:w-[380px] h-[500px] max-h-[calc(100vh-100px)] flex flex-col bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 origin-bottom-right ${
          isOpen 
            ? 'scale-100 opacity-100 pointer-events-auto translate-y-0' 
            : 'scale-90 opacity-0 pointer-events-none translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-t-2xl text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <SparkleIcon />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Pathlo AI</h3>
              <p className="text-[11px] text-white/80 font-medium">Your career guide</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 scroll-smooth">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex w-full mb-4 justify-start">
              <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 rounded-b-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:focus:border-brand-500 transition-shadow"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
            >
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
