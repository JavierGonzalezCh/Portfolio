import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { useStore } from '@nanostores/react'; 
import { language } from '../../store/languageStore'; // Importamos el store
import { CONTENT } from '../../constants'; // Tus textos
import { generateAIResponse } from '../../services/ai';

// Ya no necesitamos Props complejas
interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const ChatWidget: React.FC = () => {
  const content = CONTENT['es'];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        text: content.chat.welcome
      }]);
    }
  }, [isOpen, content.chat.welcome]); // Añadido content.chat.welcome a dependencias

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
        // Call AI Service passing the context
        const aiText = await generateAIResponse(userMsg.text, content, 'es');
        
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: aiText
        }]);
    } catch (error) {
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            text: "Tengo problemas de conexión. ¿Intentas de nuevo?"
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <a 
          href="https://wa.me/573013460118" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition-all hover:scale-110"
        >
          <img src="/Digital_Glyph_White.svg" alt="WhatsApp" className='w-10 h-10' />
        </a>

        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-tech-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-tech-gold/30 hover:bg-tech-gold-dark transition-all hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button> */}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-96 h-[500px] bg-tech-gray-charcoal/90 backdrop-blur-xl border border-tech-blue-secondary rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-tech-blue-primary/50 border-b border-tech-blue-secondary flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tech-gold/20 flex items-center justify-center text-tech-gold">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-medium text-tech-text-primary">{content.chat.title}</h3>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-tech-gold text-white rounded-br-none shadow-md' 
                        : 'bg-tech-gray-card text-tech-text-secondary rounded-bl-none border border-tech-blue-secondary/30'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-tech-gray-card p-3 rounded-2xl rounded-bl-none text-xs text-tech-text-secondary italic border border-tech-blue-secondary/30">
                    {content.chat.thinking}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-tech-blue-secondary flex gap-2 bg-tech-blue-primary/50">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={content.chat.placeholder}
                className="flex-1 bg-tech-gray-card border border-tech-blue-secondary rounded-full px-4 py-2 text-sm text-tech-text-primary focus:outline-none focus:border-tech-gold transition-colors placeholder-tech-text-secondary/50"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-tech-gold rounded-full text-white hover:bg-tech-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;