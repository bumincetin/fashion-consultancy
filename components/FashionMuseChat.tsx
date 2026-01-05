
import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getQuickFashionTip } from '../services/geminiService';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FashionMuseChatProps {
  lang: Language;
}

export const FashionMuseChat: React.FC<FashionMuseChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const t = TRANSLATIONS[lang].chat;

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setQuery('');
    setIsLoading(true);

    try {
      const response = await getQuickFashionTip(userMsg, lang);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: t.errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-8 bg-[#2C2825] text-[#FAF8F5] p-4 rounded-full shadow-xl hover:bg-[#C4A484] hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center group"
      >
        <MessageCircle size={22} strokeWidth={1.5} />
      </button>

      {isOpen && (
        <div className="fixed bottom-44 right-8 w-80 md:w-96 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(44,40,37,0.2)] z-50 overflow-hidden border border-[#2C2825]/5">
          {/* Header */}
          <div className="bg-[#2C2825] p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C4A484]/20 flex items-center justify-center">
                <Sparkles size={14} className="text-[#C4A484]" />
              </div>
              <h3 className="text-[#FAF8F5] text-[10px] font-mono uppercase tracking-[0.2em]">{t.title}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#FAF8F5]/50 hover:text-[#FAF8F5] transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-5 flex flex-col gap-4 bg-[#FAF8F5]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 rounded-full bg-[#C4A484]/10 flex items-center justify-center mb-4">
                  <Sparkles size={20} className="text-[#C4A484]" />
                </div>
                <p className="text-[#8C847A] text-sm mb-2">{t.greeting}</p>
                <p className="text-[#AEA69C] text-xs">{t.greetingDesc}</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-[#2C2825] text-[#FAF8F5] self-end rounded-br-md' 
                  : 'bg-white text-[#5C554D] self-start border border-[#2C2825]/5 rounded-bl-md shadow-sm'
              }`}>
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-[#C4A484]">
                <div className="w-2 h-2 rounded-full bg-[#C4A484] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#C4A484] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#C4A484] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#2C2825]/5 flex gap-3">
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 text-sm outline-none placeholder:text-[#AEA69C] bg-transparent"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !query.trim()}
              className="w-10 h-10 rounded-full bg-[#2C2825] text-[#FAF8F5] flex items-center justify-center hover:bg-[#C4A484] disabled:opacity-30 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
