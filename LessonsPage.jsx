import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Sparkles,
  Quote,
  Check,
  Copy,
  Compass,
  Clock,
  Shield,
  Heart,
  TrendingUp,
  Target,
  Sun,
  Eye,
  Award
} from 'lucide-react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: 'var(--gradient-wine-pure)' }}
    />
  );
};

const LessonsPage = ({ onOpenResume }) => {
  const [copied, setCopied] = React.useState(false);
  const [reflectionText, setReflectionText] = React.useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = () => {
    if (!reflectionText) return;
    navigator.clipboard.writeText(reflectionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const lessons = [
    {
      num: '01',
      title: 'Patience',
      subtitle: 'Not Everything Happens on My Timeline',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      alt: 'Starry night sky over solitary mountain silhouette',
      believed: 'I used to think that if I worked hard enough, progress should happen quickly. I wanted to see the results of my efforts and move toward my goals as fast as possible.',
      learned: 'Growth doesn\'t always follow a predictable schedule. Some skills take months or years to develop. Some opportunities arrive later than expected, and some plans need to change before they work.',
      believeNow: 'I want to focus on consistent effort rather than constantly measuring myself against a deadline. Patience doesn\'t mean sitting still. It means continuing to work while allowing the results to take the time they need.',
      quote: 'I cannot control how quickly every result arrives, but I can control the quality of the effort I bring today.'
    },
    {
      num: '02',
      title: 'Failure',
      subtitle: 'A Result Is Not My Identity',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Misty atmospheric forest with gentle morning light breaking through',
      believed: 'I thought failure meant I wasn\'t good enough, or that a wrong decision could put me too far behind.',
      learned: 'Every attempt cannot produce the outcome I want. A failed approach can expose a weakness in my skills, assumptions, preparation, or decision-making. Ignoring that information only makes it harder to improve.',
      believeNow: 'I want to separate my identity from individual outcomes. When something goes wrong, I should examine what happened, take responsibility for my part, and decide what to do differently next time.',
      quote: 'Failure can be expensive, but repeating it without learning is even more expensive.'
    },
    {
      num: '03',
      title: 'Trust',
      subtitle: 'Time Reveals What Words Cannot',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Timeless Rakotzbrücke stone bridge reflection over quiet calm water',
      believed: 'I used to think that good intentions and convincing words were enough to understand someone\'s character.',
      learned: 'People can make promises easily. Their actions over time reveal more about their reliability, honesty, and willingness to take responsibility.',
      believeNow: 'I want to give people a fair chance without giving everyone unlimited access to my trust. Trust should grow through consistent actions, mutual respect, and honesty.',
      quote: 'Words introduce people. Consistent actions help me understand them.'
    },
    {
      num: '04',
      title: 'Consistency',
      subtitle: 'Small Actions Compound',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Gentle calm ocean horizon with serene dawn reflections',
      believed: 'I thought meaningful progress required intense motivation, big breakthroughs, and occasional periods of exceptional productivity.',
      learned: 'Motivation changes. Some days are productive, while others are difficult. Depending entirely on how I feel makes long-term goals harder to sustain.',
      believeNow: 'I want to build habits that continue even when motivation is low. Reading a little, learning a skill, saving consistently, or making steady progress on a project can become meaningful over time.',
      quote: 'My future is influenced not only by my biggest decisions, but also by the small ones I repeat.'
    },
    {
      num: '05',
      title: 'People',
      subtitle: 'Choose My Circle Carefully',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Atmospheric moody portrait tone with thoughtful natural light',
      believed: 'I thought that maintaining every relationship and keeping everyone happy was an important part of being a good person.',
      learned: 'Different people bring different values, expectations, and influences into my life. Some relationships encourage growth, while others may leave little room for honesty, mutual respect, or healthy boundaries.',
      believeNow: 'I want to choose relationships based on respect, trust, shared values, and how we treat each other over time. I can be kind to people without making every relationship a permanent part of my life.',
      quote: 'I don\'t need a large circle. I need relationships where respect and growth can exist together.'
    },
    {
      num: '06',
      title: 'Uncertainty',
      subtitle: 'I Don\'t Need Every Answer Today',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dramatic misty mountain valley leading toward distant peaks',
      believed: 'I wanted to understand exactly how everything would work out before taking an important step.',
      learned: 'Life rarely provides complete information in advance. Careers change, plans evolve, and opportunities can come with risks that cannot be eliminated entirely.',
      believeNow: 'I want to prepare carefully, understand the risks I can, and make decisions with the information available. I can adjust my direction as I learn more instead of waiting for perfect certainty.',
      quote: 'I may not know every step ahead, but I can choose the next step with intention.'
    },
    {
      num: '07',
      title: 'Money',
      subtitle: 'Understand What It Can and Cannot Give Me',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Clean minimalist architectural composition with sharp contrast',
      believed: 'I used to think about money mainly in terms of how much I could earn and what I could afford.',
      learned: 'Money can create security, provide choices, support people I care about, and help turn a business idea into reality. But earning more without managing it well doesn\'t automatically create freedom.',
      believeNow: 'I want to understand how to earn, save, spend, and invest responsibly. My long-term ambition to build a startup requires more than technical ability. It also requires financial discipline, an understanding of customers, and the ability to make sustainable decisions.',
      quote: 'I want money to expand my choices, not become the only measure of my worth.'
    },
    {
      num: '08',
      title: 'Self-Respect',
      subtitle: 'I Don\'t Have to Prove Everything',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Vast solitary mountain ridge under golden sunrise mist',
      believed: 'I thought progress meant constantly proving myself through achievements, recognition, or other people\'s approval.',
      learned: 'Recognition can be motivating, but it is inconsistent. If I depend on external approval to decide whether my efforts matter, I give other people\'s opinions too much control over my direction.',
      believeNow: 'I want to measure myself against my values and my own progress. I can listen to criticism, acknowledge mistakes, and keep improving without turning every decision into an attempt to impress someone.',
      quote: 'I want my work to speak for itself, while remembering that my worth is bigger than my achievements.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050406] text-[var(--text-primary)] selection:bg-[var(--accent-wine)] selection:text-white relative overflow-x-hidden">
      <ScrollProgress />

      {/* Atmospheric Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#3D0A13]/25 blur-[160px]" />
        <div className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] rounded-full bg-[#781223]/15 blur-[170px]" />
        <div className="absolute -bottom-[15%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#26050C]/25 blur-[160px]" />
      </div>

      <div className="relative z-10">
        
        {/* Top Header */}
        <header className="glass-nav py-5 sticky top-0 z-50 shadow-[0_15px_40px_rgba(0,0,0,0.85)]">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 font-mono text-xs text-[var(--text-secondary)] hover:text-white transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-[var(--accent-ruby)]" />
              <span>Return to Portfolio</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[var(--text-primary)] group-hover:gradient-text transition-all">
                The Tale Of Semmozhiyan
              </span>
            </Link>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-primary)] font-mono text-xs font-semibold transition-all shadow-sm"
            >
              <FileText size={13} className="text-[var(--accent-ruby)]" />
              <span>RESUME</span>
            </button>
          </div>
        </header>

        {/* Cinematic Hero */}
        <section className="pt-24 pb-20 md:pt-32 md:pb-28 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-wine)]/20 border border-[var(--border-wine)] text-xs font-mono text-[var(--accent-vibrant)] mb-6 shadow-wine-sm">
                <Sparkles size={12} className="text-[var(--accent-ruby)]" />
                <span>EXPERIENTIAL WISDOM · PERSONAL REFLECTIONS</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                <span>Lessons </span>
                <span className="gradient-text italic font-normal">Life </span>
                <span>Taught Me.</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
                Some lessons are learned through success. Others change you through experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 01. The Introduction Article */}
        <section className="py-20 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 sm:p-12 rounded-3xl glass-card-3d border border-[var(--border-wine)] space-y-6 shadow-wine-md"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase">
                  INTRODUCTION
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Unwritten Curriculums
                </span>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                <p>
                  I'm learning that life doesn't always teach its most important lessons through books, achievements, or advice. Sometimes, the lessons come from waiting longer than expected, making the wrong decision, trusting the wrong person, failing at something important, or realizing that the way I once viewed the world was incomplete.
                </p>
                <p>
                  As I grow, I'm beginning to understand that becoming successful isn't only about acquiring skills, earning money, or reaching milestones. It's also about developing patience, protecting my peace, understanding people, managing uncertainty, and learning to make better decisions.
                </p>
                <p>
                  This page is a collection of the lessons that are shaping the person I want to become.
                </p>
                <p className="text-[var(--text-primary)] font-serif italic text-xl pt-2">
                  I'm not writing these lessons because I have everything figured out. I'm writing them because I'm still learning.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* 02. The 8 Lessons (Vertical Walkthrough with Images & 3-Stage Reveal) */}
        <section className="py-24 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto px-6 space-y-24">
            {lessons.map((lesson, i) => (
              <motion.article
                key={lesson.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl glass-card-3d border border-[var(--border-wine)] overflow-hidden shadow-wine-sm"
              >
                {/* Visual Header Image with Wine-Red Gradient Mask */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <img
                    src={lesson.image}
                    alt={lesson.alt}
                    className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.05] hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B11] via-[#0E0B11]/50 to-transparent" />
                  <div className="absolute inset-0 bg-[#3D0A13]/25 mix-blend-color" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#050406]/85 border border-white/10 backdrop-blur-md mb-2">
                      <span className="font-mono text-xs font-bold text-[var(--accent-ruby)]">
                        LESSON {lesson.num}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-md">
                      {lesson.title}: <span className="font-light italic text-[var(--accent-vibrant)]">{lesson.subtitle}</span>
                    </h2>
                  </div>
                </div>

                {/* Content Body: Three-Stage Reveal */}
                <div className="p-8 sm:p-12 space-y-8">
                  
                  {/* Stage 1: What I Believed */}
                  <div className="p-6 rounded-2xl bg-[#050406]/70 border border-white/5 space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest block">
                      Stage 1 · What I Believed
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                      {lesson.believed}
                    </p>
                  </div>

                  {/* Stage 2: What I Learned */}
                  <div className="p-6 rounded-2xl bg-[var(--accent-wine)]/15 border border-[var(--border-wine)] space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--accent-ruby)] uppercase tracking-widest block">
                      Stage 2 · What I Learned
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-primary)] font-normal leading-relaxed">
                      {lesson.learned}
                    </p>
                  </div>

                  {/* Stage 3: What I Believe Now */}
                  <div className="p-6 rounded-2xl bg-[#140F18] border-l-4 border-l-[var(--accent-ruby)] border-y border-r border-white/5 space-y-2">
                    <span className="font-mono text-[10px] font-bold text-[var(--accent-vibrant)] uppercase tracking-widest block">
                      Stage 3 · What I Believe Now
                    </span>
                    <p className="text-sm sm:text-base text-[var(--text-primary)] font-light leading-relaxed">
                      {lesson.believeNow}
                    </p>
                  </div>

                  {/* Reflection Quote Box */}
                  <div className="pt-6 border-t border-[var(--border-subtle)] relative">
                    <div className="flex items-start gap-4">
                      <Quote size={28} className="text-[var(--accent-ruby)] shrink-0 mt-1 opacity-80" />
                      <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium group-hover:gradient-text transition-all">
                        “{lesson.quote}”
                      </blockquote>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 03. The Closing Chapter: Who I'm Becoming */}
        <section className="py-28 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl glass-card-3d border-2 border-[var(--border-wine)] overflow-hidden shadow-wine-lg"
            >
              {/* Closing Header Panorama */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80"
                  alt="Mountain range under expansive morning light"
                  className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.08]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B11] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[#3D0A13]/30 mix-blend-color" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-xs font-bold text-[var(--accent-vibrant)] uppercase tracking-widest block mb-1">
                    CLOSING REFLECTION
                  </span>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight drop-shadow-md">
                    Still Learning. Still Becoming.
                  </h2>
                </div>
              </div>

              <div className="p-8 sm:p-12 space-y-5 text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                <p>
                  I'm beginning to understand that growth is not about becoming a person who never makes mistakes. It's about becoming someone who can recognize them, learn from them, and move forward with greater clarity.
                </p>
                <p>
                  I want to build a meaningful career, become financially independent, create a business of my own, and make choices that reflect what matters to me.
                </p>
                <p>
                  Along the way, I want to remember that success is not only about reaching a destination. It is also about the habits I develop, the people I treat well, the responsibilities I accept, and the person I become.
                </p>
                <p>
                  I don't know exactly how every chapter will unfold. But I know that I want to keep learning, remain open to changing my mind, and take responsibility for the direction of my life.
                </p>
                <p className="text-[var(--text-primary)] font-serif italic text-xl pt-3">
                  I'm not trying to have life completely figured out. I'm trying to become wiser with every chapter I live.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* 04. Reader's Reflection (Private Client-Side Prompt) */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-3xl glass-card-3d border border-[var(--border-wine)] space-y-4"
            >
              <span className="font-mono text-xs text-[var(--accent-ruby)] uppercase tracking-widest font-semibold block">
                YOUR REFLECTION
              </span>
              <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">
                What is one lesson life has taught you?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-light max-w-md mx-auto">
                This is a private reflection area. Your thoughts stay entirely on your screen. You can copy them for your personal notes.
              </p>

              <div className="pt-2">
                <textarea
                  rows="3"
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Record your personal insight or guiding principle here..."
                  className="w-full p-4 rounded-2xl bg-[#050406] border border-[var(--border-subtle)] focus:border-[var(--accent-ruby)] text-xs text-[var(--text-primary)] font-light outline-none transition-colors resize-none placeholder-[var(--text-muted)]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopy}
                  disabled={!reflectionText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-xs font-mono text-[var(--text-primary)] disabled:opacity-40 transition-all shadow-sm"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[var(--accent-ruby)]" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Reflection'}</span>
                </button>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white text-xs font-mono font-bold tracking-widest uppercase shadow-wine-md hover:shadow-wine-lg transition-all"
                >
                  <span>Return to Portfolio</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border-subtle)] bg-[#0A070D]/90 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
            <div>
              &copy; {new Date().getFullYear()} The Tale Of Semmozhiyan · Lessons Life Taught Me
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link to="/journey" className="hover:text-white transition-colors">
                The Journey
              </Link>
              <a href="https://github.com/semmozhiyan-dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LessonsPage;
