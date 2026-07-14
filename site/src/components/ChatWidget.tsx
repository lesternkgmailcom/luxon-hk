import { useState, useRef, useEffect, useCallback } from 'react';

const API_URL = 'https://chat.luxon.hk/chat';
const MAX_HISTORY = 20;

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initializedRef = useRef(false);

  // Detect language from html lang attribute
  const getLang = useCallback(() => {
    return document.documentElement.lang || 'en';
  }, []);

  // Get localized strings (reads from global translations if available)
  const getStrings = useCallback((lang: string) => {
    // @ts-expect-error - translations is a global set by i18n.js on old site
    const i18n = window.translations?.[lang] || window.translations?.['en'] || {};
    return {
      greeting: i18n['chat.greeting'] || "Hi! I'm Luxon's AI assistant. How can I help you today?",
      placeholder: i18n['chat.placeholder'] || 'Type a message...',
      title: i18n['chat.title'] || 'Luxon AI',
      status: i18n['chat.status'] || 'Online',
      error: i18n['chat.error'] || 'Sorry, something went wrong. Please try again or email us at info@luxon.hk',
    };
  }, []);

  // Add greeting on first mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const lang = getLang();
      const strings = getStrings(lang);
      setMessages([{ role: 'bot', content: strings.greeting }]);
    }
  }, [getLang, getStrings]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  async function send() {
    const text = input.trim();
    if (!text || isTyping) return;

    const lang = getLang();
    const strings = getStrings(lang);

    setInput('');
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg].slice(-MAX_HISTORY);
    setMessages(newMessages);

    setIsTyping(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.slice(-MAX_HISTORY),
          lang: lang,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [...prev.slice(-MAX_HISTORY), { role: 'bot', content: data.reply || strings.error }]);
    } catch {
      setMessages((prev) => [...prev.slice(-MAX_HISTORY), { role: 'bot', content: strings.error }]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div id="luxon-chat" className={`chat-widget fixed bottom-6 right-6 z-[9999] font-sans ${isOpen ? 'open' : ''}`}>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-toggle w-14 h-14 rounded-full border-none cursor-pointer flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        {isOpen ? (
          // Close icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat icon
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      <div className={`chat-panel absolute bottom-[70px] right-0 w-[380px] max-h-[520px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible translate-y-2.5 scale-95'
      }`}>
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #00D4AA 0%, #00B4D8 100%)' }}>
              L
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Luxon AI</div>
              <div className="text-xs text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 max-h-[340px] min-h-[200px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}>
              <div className={`p-2.5 rounded-2xl text-sm leading-relaxed break-words ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#00D4AA] to-[#00B4D8] text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex max-w-[85%] self-start">
              <div className="p-2.5 rounded-2xl rounded-bl-sm bg-gray-100 text-sm animate-pulse">
                ...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex p-3 border-t border-gray-200 bg-gray-50 gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
            placeholder="Type a message..."
            className="flex-1 p-2.5 border border-gray-300 rounded-xl bg-white text-gray-900 text-sm outline-none focus:border-emerald-400 transition-colors"
          />
          <button
            onClick={send}
            disabled={isTyping || !input.trim()}
            className="w-10 h-10 border-none rounded-xl text-white cursor-pointer flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-85 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #00D4AA 0%, #00B4D8 100%)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
