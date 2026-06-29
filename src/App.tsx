import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
} from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ScrambleIn } from './components/ScrambleText';
import { ConnectAILabLogo } from './components/ConnectAILabLogo';
import { QuestionModal } from './components/QuestionModal';
import PayPalCheckoutButton from './components/payment/PayPalCheckoutButton';
import { useAuth } from './contexts/AuthContext';
import { createOrder } from './lib/firestore';
import { PRODUCTS } from './lib/paypal';
import { VIDEO_URLS } from './config/videos';
import { SITE_CONFIG } from './config/content';

// Bento Card component for cleaner structure
function BentoCard({
  className = '',
  tag = '',
  title = '',
  description = '',
  children = null,
  delay = 0
}: {
  className?: string;
  tag?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[20px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] ${className}`}
    >
      {/* Decorative gradient glowing spots inside cards */}
      <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div>
        {tag && (
          <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.2em] text-white/40 uppercase block mb-4">
            {tag}
          </span>
        )}
        {title && (
          <h3 className="text-white text-[20px] sm:text-[24px] md:text-[28px] font-serif font-light leading-snug tracking-tight mb-3 whitespace-pre-line">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-white/50 text-[14px] sm:text-[15px] font-sans leading-relaxed break-keep whitespace-pre-line max-w-md">
            {description}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const { user } = useAuth();

  /* ── PayPal 결제 완료 → Firestore 저장 ── */
  const handlePayPalSuccess = useCallback(
    async (details: any, productId: string, productName: string, amount: string) => {
      const orderId = details.id || `pp_${Date.now()}`;
      try {
        await createOrder({
          id: orderId,
          userId: user?.uid || 'anonymous',
          productId,
          productName,
          amount: parseFloat(amount),
          currency: 'USD',
          status: 'completed',
          paypalOrderId: orderId,
          paypalPayerId: details.payer?.payer_id || '',
        });
        console.log('[Firestore] Order saved:', orderId);
        alert(`✅ 결제 완료! Order: ${orderId}`);
      } catch (err) {
        console.error('[Firestore] Failed to save order:', err);
        alert(`결제는 완료되었지만 기록 저장에 실패했습니다. Order: ${orderId}`);
      }
    },
    [user]
  );

  /* ── Hero video mouse-scrub ── */
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  const handleSeeked = useCallback(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    isSeekingRef.current = false;
    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const video = heroVideoRef.current;
      if (!video || !video.duration) return;
      const deltaX = e.movementX;
      const sensitivity = 0.8;
      const change = (deltaX / window.innerWidth) * video.duration * sensitivity;
      targetTimeRef.current = Math.max(
        0,
        Math.min(video.duration, targetTimeRef.current + change)
      );
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  /* ── Entrance delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ── Section 2 ref ── */
  const section2Ref = useRef<HTMLDivElement>(null);

  /* ── Destructure config for readability ── */
  const { hero, about, metrics, technology, architecture, footer } = SITE_CONFIG;

  return (
    <div className="font-sans text-white/90 antialiased bg-[#000]">
      <Navbar entranceComplete={entranceComplete} />

      {/* ════════════════ SECTION 1: HERO ════════════════ */}
      <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Video background (mouse-scrubbed) */}
        {VIDEO_URLS.hero && (
          <video
            ref={heroVideoRef}
            src={VIDEO_URLS.hero}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
            onSeeked={handleSeeked}
          />
        )}

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.05,
          }}
        />

        {/* Watermark text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ paddingTop: 50 }}
        >
          <span
            className="uppercase select-none"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              letterSpacing: '-4px',
              opacity: 0.1,
              background:
                'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              lineHeight: 1,
            }}
          >
            {hero.watermark}
          </span>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-20 flex flex-col flex-1 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1" />

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Left column */}
            <div className="flex flex-col gap-4">
              <h1
                className="text-white font-light leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(32px, 6vw, 70px)' }}
              >
                {hero.titleLeft.map((text, idx) => (
                  <div key={idx}>
                    <ScrambleIn text={text} delay={200 + idx * 150} triggered={entranceComplete} />
                  </div>
                ))}
              </h1>
            </div>

            {/* Right column & Button */}
            <div className="flex flex-col gap-8 md:items-end md:text-right mt-12 md:mt-0">
              <h1
                className="text-white font-light leading-[1.1] tracking-[-0.03em] text-left md:text-right"
                style={{ fontSize: 'clamp(32px, 6vw, 70px)' }}
              >
                {hero.titleRight.map((text, idx) => (
                  <div key={idx}>
                    <ScrambleIn text={text} delay={800 + idx * 150} triggered={entranceComplete} />
                  </div>
                ))}
              </h1>

              {/* Button area */}
              <motion.div
                className="flex flex-col items-start md:items-end gap-3 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={entranceComplete ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.215, 0.61, 0.355, 1.0],
                  delay: 1.2,
                }}
              >
                <button
                  onClick={() => setIsQuestionModalOpen(true)}
                  className="bg-white text-black px-8 py-3 rounded-full font-medium text-[15px] hover:bg-white/90 transition-colors"
                >
                  {hero.buttonText}
                </button>
                <div className="flex flex-col items-center md:items-end gap-1 text-white/50 text-[13px] mt-2">
                  <span className="animate-bounce text-[16px]">↓</span>
                  <span className="uppercase tracking-widest">{hero.buttonSubtext}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════ SECTION 2: BENTO BOX ABOUT ════════════════ */}
      <section ref={section2Ref} className="relative min-h-screen py-20 md:py-28 bg-[#010103] flex items-center justify-center overflow-hidden">
        {VIDEO_URLS.section2 && (
          <video
            src={VIDEO_URLS.section2}
            className="absolute inset-0 w-full h-full object-cover object-[60%_40%]"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        {/* Gradients to blend sections & darken background slightly for content readibility */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{
            height: 220,
            background: 'linear-gradient(to bottom, #010103 20%, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-10"
          style={{
            height: 220,
            background: 'linear-gradient(to top, #010103 20%, transparent)',
          }}
        />

        {/* Bento Grid Content Container */}
        <div className="relative z-20 max-w-6xl mx-auto w-full px-6 sm:px-10 flex flex-col justify-center">
          {/* Header titles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="mb-8 md:mb-12 text-left"
          >
            <span className="text-white/40 text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-mono font-bold block mb-2">
              {about.subtitle}
            </span>
            <h2 className="text-white text-[36px] sm:text-[48px] md:text-[56px] font-serif font-light tracking-tight leading-none">
              {about.title}
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">

            {/* Card 1: Vision (Large Card, spans 2 columns on medium screens) */}
            <BentoCard
              className="md:col-span-2 min-h-[220px] md:min-h-[280px]"
              tag={about.cards.vision.tag}
              title={about.cards.vision.title}
              description={about.cards.vision.description}
              delay={0.2}
            />

            {/* Card 2: Question (Interactive Widget card) */}
            <BentoCard
              className="min-h-[220px] md:min-h-[280px] bg-gradient-to-br from-white/[0.05] to-white/[0.01]"
              tag={about.cards.question.tag}
              title={about.cards.question.title}
              description={about.cards.question.description}
              delay={0.1}
            >
              <div className="mt-6">
                <button
                  onClick={() => setIsQuestionModalOpen(true)}
                  className="w-full bg-white text-black py-3 px-6 rounded-full font-medium text-[14px] hover:bg-white/90 transition-all flex items-center justify-center gap-2 group font-sans"
                >
                  <span>{about.cards.question.actionText}</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </BentoCard>

            {/* Card 3: Distance (Hedgehog Persona Card) */}
            <BentoCard
              className="md:col-span-2 min-h-[200px]"
              tag={about.cards.distance.tag}
              title={about.cards.distance.title}
              description={about.cards.distance.description}
              delay={0.3}
            />

            {/* Card 4: Metrics (01/365 Custom View) */}
            <BentoCard
              className="min-h-[200px] justify-center items-center text-center"
              tag={about.cards.stats.tag}
              delay={0.4}
            >
              <div className="flex flex-col items-center justify-center my-auto">
                <span className="text-[48px] sm:text-[56px] font-serif font-light tracking-tight text-white leading-none block">
                  {about.cards.stats.title}
                </span>
                <span className="text-white/40 text-[13px] tracking-wide mt-2 block font-sans">
                  {about.cards.stats.description}
                </span>
              </div>
            </BentoCard>

          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 3: METRICS ════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        {VIDEO_URLS.metrics && (
          <video
            src={VIDEO_URLS.metrics}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div className="relative z-20 pt-32 pb-32 px-6 max-w-6xl mx-auto w-full">
          <motion.p
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {metrics.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
            {metrics.items.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div
                  className="text-white font-light tracking-[-0.04em] leading-none"
                  style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
                >
                  {m.value}
                </div>
                <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ SECTION 4: TECHNOLOGY ════════════════ */}
      <section className="relative h-screen h-[100dvh] flex flex-col overflow-hidden">
        {/* Video background */}
        {VIDEO_URLS.technology && (
          <video
            src={VIDEO_URLS.technology}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div className="relative z-20 flex flex-col flex-1 px-8 sm:px-12 md:px-16 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            <motion.h2
              className="text-white font-light leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(36px, 8vw, 72px)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.title[0]}
              <br />
              {technology.title[1]}
            </motion.h2>

            <motion.p
              className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {technology.description}
            </motion.p>
          </div>

          <div className="flex-1" />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {technology.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                  {f.title}
                </h3>
                <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 5: ARCHITECTURE ════════════════ */}
      <section className="min-h-screen flex items-center justify-center bg-black">
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              {architecture.subtitle}
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-10"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              {architecture.heading}
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              {architecture.description}
            </p>
          </motion.div>

          <motion.div
            className="mt-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            {architecture.layers.map((l) => (
              <div
                key={l.num}
                className="w-full max-w-xl border border-white/10 rounded-[12px] bg-white/[0.02] backdrop-blur-sm p-6 text-left flex flex-col gap-2 transition-all hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/35 text-[11px] tracking-[0.2em] font-mono uppercase">
                    Step 0{l.num}
                  </span>
                  <h4 className="text-white text-[16px] sm:text-[18px] font-serif font-light">
                    {l.name}
                  </h4>
                </div>
                {l.desc && (
                  <p className="text-white/50 text-[13px] sm:text-[14px] leading-relaxed font-sans mt-2 break-keep">
                    {l.desc}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════ SECTION 6: PRICING ════════════════ */}
      <section className="min-h-screen bg-black py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
              Pricing
            </p>
            <h2
              className="text-white font-light leading-[1.15] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(28px, 6vw, 56px)' }}
            >
              Choose Your Plan
            </h2>
            <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
              Select the neural interface access tier that fits your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── Basic ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Basic</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$29.99</span>
                <span className="text-white/30 text-[14px]">/one-time</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Single user license for personal neural mapping.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Basic neural mapping
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Cognitive load tracking
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Monthly reports
                </li>
              </ul>
              <div className="flex flex-col gap-3">
                <PayPalCheckoutButton
                  product={PRODUCTS[0]}
                  onSuccess={(details) => handlePayPalSuccess(details, PRODUCTS[0].id, PRODUCTS[0].name, PRODUCTS[0].price)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              </div>
            </motion.div>

            {/* ── Pro (Featured) ── */}
            <motion.div
              className="border border-white/25 rounded-2xl p-8 flex flex-col relative bg-white/[0.03]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-white text-black text-[11px] font-bold tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              </div>
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Pro</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">$99.99</span>
                <span className="text-white/30 text-[14px]">/one-time</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Full neural-AI interface with real-time cognitive mapping.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Everything in Basic
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Real-time cognitive mapping
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Signal isolation engine
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Priority support
                </li>
              </ul>
              <div className="flex flex-col gap-3">
                <PayPalCheckoutButton
                  product={PRODUCTS[1]}
                  onSuccess={(details) => handlePayPalSuccess(details, PRODUCTS[1].id, PRODUCTS[1].name, PRODUCTS[1].price)}
                  onError={(err) => console.error('PayPal error:', err)}
                />
              </div>
            </motion.div>

            {/* ── Enterprise ── */}
            <motion.div
              className="border border-white/10 rounded-2xl p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-white/40 text-[12px] tracking-[0.15em] uppercase mb-3">Enterprise</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-white text-[42px] font-light tracking-tight">Custom</span>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed mb-8">
                Unlimited neural endpoints for your entire organization.
              </p>
              <ul className="flex flex-col gap-3 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Everything in Pro
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Unlimited neural endpoints
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Custom API integration
                </li>
                <li className="flex items-center gap-3 text-white/60 text-[13px]">
                  <span className="text-white/30">✓</span> Dedicated support team
                </li>
              </ul>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contact@philosophia.com"
                  className="w-full max-w-md mx-auto h-[50px] rounded-lg font-medium text-[15px] flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:bg-white/5 transition-colors"
                >
                  Contact Sales
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="bg-black overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[400px]">
          {/* Left: Video */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            {VIDEO_URLS.footer ? (
              <video
                src={VIDEO_URLS.footer}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <div className="absolute inset-0 bg-white/5" />
            )}
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <ConnectAILabLogo size={18} className="text-white/70" />
                <span className="text-[15px] font-medium text-white/70 tracking-tight">
                  {SITE_CONFIG.brandName}
                </span>
              </div>
              <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
                {footer.tagline}
              </p>
            </div>

            <p className="text-white/25 text-[12px] mt-12">
              {SITE_CONFIG.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* 모달 창 */}
      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      />
    </div>
  );
}
