import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { getPhilosophicalSession, type DialogueSession } from '../utils/philosophicalEngine';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function QuestionModal({ 
  isOpen, 
  onClose,
  onSuccess
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [question, setQuestion] = useState('');
  const [session, setSession] = useState<DialogueSession | null>(null);
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Final synthesis state
  const [synthesis, setSynthesis] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleStartQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    const sess = getPhilosophicalSession(question);
    setSession(sess);
    setStep(2);
  };

  const handleGoToChat = () => {
    if (!session) return;
    setChatMessages([
      {
        sender: 'ai',
        text: `Greetings. You asked: "${question}".\n\nAs an advocate for ${session.initialPhilosopher.name}'s school of thought, I argue that: ${session.initialPhilosopher.explanation}\n\nWhat are your initial thoughts on this perspective?`
      }
    ]);
    setStep(3);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !session) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = session.chatResponses(userText);
      setChatMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleGoToCounter = () => {
    setStep(4);
  };

  const handleGoToSynthesis = () => {
    setStep(5);
  };

  const handleSaveSynthesis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!synthesis.trim()) return;

    setIsSaved(true);
    if (onSuccess) onSuccess();

    setTimeout(() => {
      // Reset state and close modal
      onClose();
      setTimeout(() => {
        setStep(1);
        setQuestion('');
        setSession(null);
        setChatMessages([]);
        setSynthesis('');
        setIsSaved(false);
      }, 500);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Container */}
          <motion.div
            className="bg-[#08080a] border border-white/10 rounded-[20px] w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col h-[85vh] max-h-[700px]"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-30"
            >
              <X size={20} />
            </button>

            {/* Stepper Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-full flex-1 transition-all duration-500 ${
                    s <= step ? 'bg-white/45' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-12 mt-4 flex flex-col justify-between">
              
              {/* STEP 1: Input Question */}
              {step === 1 && (
                <form onSubmit={handleStartQuestion} className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-white/40 text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">
                      Step 01 / Initiate Inquiry
                    </span>
                    <h2 className="text-white text-[28px] sm:text-[34px] font-serif font-light tracking-tight mb-4">
                      What is lingering in your mind today?
                    </h2>
                    <p className="text-white/40 text-[14px] font-sans mb-8">
                      Write down a question that stops your thoughts. It will begin a dialogue.
                    </p>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g., Is happiness a choice or a result?"
                      className="bg-transparent border-none outline-none text-white text-[20px] sm:text-[24px] font-serif font-light leading-relaxed placeholder:text-white/10 resize-none h-[180px] w-full mt-4"
                      autoFocus
                    />
                  </div>
                  <div className="flex justify-end border-t border-white/5 pt-6">
                    <button
                      type="submit"
                      disabled={!question.trim()}
                      className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-[14px] hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 group font-sans"
                    >
                      <span>Begin Inquiry</span>
                      <ArrowRight size={16} className="transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: First Philosopher's Perspective */}
              {step === 2 && session && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-white/40 text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">
                      Step 02 / The Classical View
                    </span>
                    
                    {/* Philosopher Portrait & Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                        {session.initialPhilosopher.portrait}
                      </div>
                      <div>
                        <span className="text-white/30 text-[11px] tracking-widest uppercase font-mono block">Philosopher</span>
                        <h3 className="text-white text-xl font-serif font-light">{session.initialPhilosopher.name}</h3>
                      </div>
                    </div>

                    {/* Quote Card */}
                    <div className="border border-white/10 bg-white/[0.02] p-6 rounded-2xl mb-6 shadow-md">
                      <p className="text-white/80 font-serif font-light italic text-[16px] sm:text-[18px] leading-relaxed break-keep">
                        {session.initialPhilosopher.quote}
                      </p>
                    </div>

                    {/* Explanation */}
                    <p className="text-white/50 text-[14px] sm:text-[15px] font-sans leading-relaxed break-keep">
                      {session.initialPhilosopher.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end border-t border-white/5 pt-6 mt-8">
                    <button
                      onClick={handleGoToChat}
                      className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-[14px] hover:bg-white/90 transition-all flex items-center gap-2 group font-sans"
                    >
                      <span>Discuss with AI</span>
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: AI Chat debate */}
              {step === 3 && session && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col justify-between h-full"
                >
                  <div className="mb-4">
                    <span className="text-white/40 text-[11px] font-mono tracking-[0.2em] uppercase block">
                      Step 03 / AI Debate Arena
                    </span>
                  </div>

                  {/* Chat logs */}
                  <div className="flex-1 overflow-y-auto border border-white/5 rounded-2xl p-4 space-y-4 bg-white/[0.01] min-h-[220px] max-h-[300px] flex flex-col scrollbar-thin">
                    {chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <span className="text-[10px] text-white/35 font-mono mb-1 uppercase tracking-wider">
                          {msg.sender === 'user' ? 'You' : 'AI Advocate'}
                        </span>
                        <div
                          className={`rounded-2xl p-4 text-[14px] leading-relaxed break-keep font-sans whitespace-pre-line ${
                            msg.sender === 'user'
                              ? 'bg-white/10 text-white rounded-tr-none'
                              : 'bg-white/[0.03] border border-white/5 text-white/80 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="self-start flex flex-col items-start max-w-[80%]">
                        <span className="text-[10px] text-white/35 font-mono mb-1 uppercase tracking-wider">AI Advocate</span>
                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-none p-4 text-[14px] text-white/40 font-sans italic flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat input form */}
                  <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-3 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Challenge the perspective or ask a question..."
                      className="flex-1 bg-white/[0.03] border border-white/10 rounded-full px-5 py-3.5 pr-14 text-white text-[14px] outline-none focus:border-white/20 transition-all font-sans placeholder:text-white/20"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim() || isTyping}
                      className="absolute right-2 p-2 bg-white text-black rounded-full hover:bg-white/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer border-none"
                    >
                      <Send size={16} />
                    </button>
                  </form>

                  {/* Flow control */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6">
                    <span className="text-[12px] text-white/30 font-sans">Exchange at least one thought to unlock counterargument.</span>
                    <button
                      onClick={handleGoToCounter}
                      disabled={chatMessages.length < 2}
                      className="bg-white text-black px-6 py-2.5 rounded-full font-medium text-[13px] hover:bg-white/90 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed group font-sans"
                    >
                      <span>Opposing View</span>
                      <ArrowRight size={14} className="transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Opposing Philosopher's Counterargument */}
              {step === 4 && session && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-white/40 text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">
                      Step 04 / The Counter-Perspective
                    </span>
                    
                    {/* Philosopher Portrait & Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-lg">
                        {session.opposingPhilosopher.portrait}
                      </div>
                      <div>
                        <span className="text-white/30 text-[11px] tracking-widest uppercase font-mono block">Philosopher</span>
                        <h3 className="text-white text-xl font-serif font-light">{session.opposingPhilosopher.name}</h3>
                      </div>
                    </div>

                    {/* Quote Card */}
                    <div className="border border-white/10 bg-white/[0.02] p-6 rounded-2xl mb-6 shadow-md">
                      <p className="text-white/80 font-serif font-light italic text-[16px] sm:text-[18px] leading-relaxed break-keep">
                        {session.opposingPhilosopher.quote}
                      </p>
                    </div>

                    {/* Explanation */}
                    <p className="text-white/50 text-[14px] sm:text-[15px] font-sans leading-relaxed break-keep">
                      {session.opposingPhilosopher.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end border-t border-white/5 pt-6 mt-8">
                    <button
                      onClick={handleGoToSynthesis}
                      className="bg-white text-black px-8 py-3.5 rounded-full font-medium text-[14px] hover:bg-white/90 transition-all flex items-center gap-2 group font-sans"
                    >
                      <span>Leave Final Thoughts</span>
                      <ArrowRight size={16} className="transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Final thoughts & save animation */}
              {step === 5 && (
                <form onSubmit={handleSaveSynthesis} className="flex-1 flex flex-col justify-between">
                  {isSaved ? (
                    <motion.div
                      className="flex-1 flex flex-col items-center justify-center py-16 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-white text-4xl shadow-xl"
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🌌
                      </motion.div>
                      <h2 className="text-white text-[32px] font-serif font-light tracking-tight mb-4">
                        Universe Updated.
                      </h2>
                      <p className="text-white/40 text-[16px] max-w-sm font-sans mx-auto leading-relaxed">
                        Your synthesized thought has been recorded as a new star in your personal universe.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-white/40 text-[11px] font-mono tracking-[0.2em] uppercase block mb-8">
                          Step 05 / Final Synthesis
                        </span>
                        <h2 className="text-white text-[28px] sm:text-[34px] font-serif font-light tracking-tight mb-4">
                          Synthesize your thought.
                        </h2>
                        <p className="text-white/40 text-[14px] font-sans mb-8 leading-relaxed">
                          Having explored opposing viewpoints and engaged with the AI, write down your own perspective now.
                        </p>
                        <textarea
                          value={synthesis}
                          onChange={(e) => setSynthesis(e.target.value)}
                          placeholder="e.g., I believe true happiness lies in resolving struggles with virtue..."
                          className="bg-transparent border-none outline-none text-white text-[18px] sm:text-[20px] font-serif font-light leading-relaxed placeholder:text-white/10 resize-none h-[180px] w-full mt-4"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end border-t border-white/5 pt-6 mt-8">
                        <button
                          type="submit"
                          disabled={!synthesis.trim()}
                          className="bg-white text-black px-10 py-3.5 rounded-full font-medium text-[15px] hover:bg-white/90 transition-all flex items-center gap-2 group font-sans disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Sparkles size={16} />
                          <span>Commit to my Universe</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
