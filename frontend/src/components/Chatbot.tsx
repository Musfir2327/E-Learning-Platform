import React, { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: 'model', text: '👋 Hi there! I am your LearnHub AI Assistant. Ask me anything about programming, our courses, or how to get certified!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: textToSend };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      let data: any;
      try {
        data = await response.json();
      } catch (err) {
        // Fallback for non-JSON response bodies
      }

      if (!response.ok) {
        throw new Error(data?.text || 'Network response was not ok');
      }
      
      setChatHistory(prev => [...prev, {
        role: 'model',
        text: data.text || 'Sorry, I did not understand that.'
      }]);
    } catch (error: any) {
      console.error('Chatbot API error:', error);
      const errorMessage = error?.message && error.message !== 'Network response was not ok'
        ? `⚠️ AI Assistant: ${error.message}`
        : '❌ Connection error: Could not reach the AI chatbot server. Please ensure the backend is running at http://localhost:5001.';
      
      setChatHistory(prev => [...prev, {
        role: 'model',
        text: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(message);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-2xl shadow-emerald-500/35 transition-all duration-300 hover:scale-110 hover:shadow-emerald-500/50 cursor-pointer"
          type="button"
          aria-label="Open AI Assistant"
        >
          {/* Subtle pulse border */}
          <span className="absolute inset-0 rounded-full border border-emerald-400/30 animate-ping opacity-75 pointer-events-none" />
          
          <svg className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="flex h-[500px] w-[380px] flex-col rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-lg animate-celebration-pop transition-all overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-900/60 p-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-base font-black text-white">
                  AI
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white leading-tight">LearnHub Assistant</h3>
                <p className="text-[10px] font-semibold text-emerald-400">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition cursor-pointer font-extrabold text-sm"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] ${
                  msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                      : 'bg-slate-900/80 border border-white/5 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line break-words markdown-content">
                    {/* Render markdown links or format lists if present */}
                    {msg.text}
                  </div>
                </div>
                <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-slate-500 px-1">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </span>
              </div>
            ))}

            {/* AI Loading state */}
            {isLoading && (
              <div className="flex flex-col items-start max-w-[85%] mr-auto">
                <div className="rounded-2xl rounded-bl-none bg-slate-900/80 border border-white/5 px-4 py-3 text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="font-semibold text-[11px] text-slate-400">Assistant is thinking</span>
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (Rendered only when not loading and history is short) */}
          {chatHistory.length < 5 && !isLoading && (
            <div className="px-4 pb-2 pt-1 flex flex-col gap-1.5">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">Suggested Questions</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'What courses are available?',
                  'Explain React Props vs State',
                  'What is a JavaScript closure?'
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="rounded-lg border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 hover:border-emerald-500/30 px-2.5 py-1.5 text-[10px] font-bold text-slate-300 hover:text-emerald-400 transition text-left cursor-pointer"
                    type="button"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-xl border border-white/5 bg-slate-900/60 px-4 py-3 text-xs font-semibold text-slate-200 placeholder:text-slate-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/25 transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition disabled:opacity-50 disabled:scale-100 disabled:hover:brightness-100 cursor-pointer"
            >
              <svg className="h-4.5 w-4.5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
