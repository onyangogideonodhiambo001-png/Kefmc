
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../context/AuthContext';

const AIAssistant: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...chatHistory.map(c => ({ role: c.role, parts: [{ text: c.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `You are the KeFMC AI Coach. Your name is 'Keja'. You help players in the Kenya eFootball Mobile Championship.
          Current Player: ${user?.name}
          Game ID: ${user?.userId}
          Ward: ${user?.location.ward}
          Stage: ${user?.stage}
          
          Guidelines:
          1. Be encouraging and use Kenyan gaming slang (e.g., "Msee", "Kazi safi", "Leta hio cup").
          2. Explain the flow: Ward -> Sub-County -> County -> Regional -> National.
          3. Remind them they need 6 matches in Prequalify stage.
          4. Give eFootball mobile tips (formation, possession, quick counter).
          5. Keep responses concise.`,
        }
      });

      const aiText = response.text || "Sorry, I lost my connection to the stadium. Try again!";
      setChatHistory(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'model', text: "Stadium noise is too loud! (API Error)" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="glass-card w-80 md:w-96 h-[500px] rounded-3xl flex flex-col shadow-2xl border-emerald-500/30 overflow-hidden animate-fade-in">
          <div className="p-4 green-gradient flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-emerald-500 font-bold">K</div>
              <div>
                <h4 className="font-gaming text-xs text-white">KEJA AI COACH</h4>
                <p className="text-[8px] text-white/70 uppercase font-black tracking-widest">Online • KeFMC Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 text-xs">
            {chatHistory.length === 0 && (
              <div className="text-center py-10 opacity-40 italic">
                "Habari ${user?.name?.split(' ')[0]}? Ask me anything about the tournament or eFootball tips!"
              </div>
            )}
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${chat.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white/80 border border-white/5'}`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl animate-pulse text-white/40">Coach is thinking...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask Coach Keja..." 
              className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-colors"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="p-2 green-gradient rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 green-gradient rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform group relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-navy-900 flex items-center justify-center text-[10px] font-black">1</div>
          <span className="text-2xl">🤖</span>
          <div className="absolute right-20 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">AI Assistant</div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
