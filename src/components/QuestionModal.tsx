import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

export function QuestionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // 임시로 성공 화면 표시 (추후 Firebase 연동 가능)
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setIsSubmitted(false);
        setQuestion('');
      }, 500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 sm:p-16">
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white text-2xl">
                    ✨
                  </div>
                  <h2 className="text-white text-3xl font-light tracking-tight mb-4">
                    질문이 기록되었습니다.
                  </h2>
                  <p className="text-white/40 text-[16px]">
                    위대한 변화는 작은 질문에서 시작됩니다.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <p className="text-white/40 text-[13px] uppercase tracking-[0.2em] mb-10">
                    Today's Question
                  </p>
                  
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="오늘 당신의 생각에 머무는 질문은 무엇인가요?"
                    className="bg-transparent border-none outline-none text-white text-[28px] sm:text-[36px] font-light leading-relaxed placeholder:text-white/20 resize-none h-[240px] w-full"
                    autoFocus
                  />

                  <div className="flex justify-end mt-8 border-t border-white/10 pt-8">
                    <button
                      type="submit"
                      disabled={!question.trim()}
                      className="bg-white text-black px-10 py-3.5 rounded-full font-medium text-[15px] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      기록하기
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
