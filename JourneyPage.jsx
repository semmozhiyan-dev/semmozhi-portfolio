import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Shield,
  FileText,
  Sparkles,
  Compass,
  Zap,
  Target,
  CheckCircle2,
  Quote,
  Lightbulb,
  Coins,
  TrendingUp,
  Cpu,
  Layers,
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

const JourneyPage = ({ onOpenResume }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const chapters = [
    {
      num: '01',
      title: 'The Beginning',
      tagline: 'Every journey starts before the world notices.',
      content: (
        <>
          <p>
            I started with an interest in technology and a desire to understand how things work. Over time, writing code became more than learning a skill. It became a way to turn ideas into something real.
          </p>
          <p>
            Every project, every bug, every failed attempt, and every new concept has been part of that process. I'm still learning, still improving, and still discovering what I'm capable of building.
          </p>
          <p>
            I don't want my journey to end with knowing how to write code. I want to understand how products are built, how businesses operate, how systems scale, and how technology can solve meaningful problems.
          </p>
        </>
      )
    },
    {
      num: '02',
      title: 'Learning to Build',
      tagline: 'From writing code to thinking like an engineer.',
      content: (
        <>
          <p>
            My development journey has taken me across frontend engineering, backend systems, databases, and full-stack application development.
          </p>
          <p>
            Projects such as <strong className="text-[var(--text-primary)] font-semibold">Foodela</strong>, <strong className="text-[var(--text-primary)] font-semibold">Vendora</strong>, and <strong className="text-[var(--text-primary)] font-semibold">Orivex</strong> have helped me explore different parts of building software, from user experiences and business logic to payment workflows and system architecture.
          </p>
          <p>
            Each project has taught me something different: ideas need execution, features need reliable foundations, and good software requires continuous improvement. My goal is not simply to build more projects. It's to become better at solving the problems behind them.
          </p>
        </>
      )
    },
    {
      num: '03',
      title: 'Understanding the Systems Behind the Software',
      tagline: 'Building is one skill. Keeping things running is another.',
      content: (
        <>
          <p>
            Working as a Site Reliability Engineer at <strong className="text-[var(--text-primary)] font-semibold">NexGenAds Technologies Pvt. Ltd.</strong> adds another dimension to my journey.
          </p>
          <p>
            Through my work around projects such as <strong className="text-[var(--text-primary)] font-semibold">1Grow</strong>, <strong className="text-[var(--text-primary)] font-semibold">CRM</strong>, and <strong className="text-[var(--text-primary)] font-semibold">MultiMenu POS</strong>, I'm developing my understanding of the systems that support real applications and business operations.
          </p>
          <p>
            Reliability, deployment, monitoring, troubleshooting, and operational discipline are not just technical concepts. They shape how I think about building products that people can depend on. This experience is an important step toward a bigger ambition: understanding both the technology and the business behind a successful product.
          </p>
        </>
      )
    },
    {
      num: '04',
      title: 'The Long-Term Vision',
      tagline: 'Learn first. Build experience. Create something of my own.',
      content: (
        <>
          <p>
            My long-term ambition is to build a technology startup of my own.
          </p>
          <p>
            I don't want to rush into entrepreneurship without understanding what it takes to build a sustainable business. My plan is to gain experience in the industry, strengthen my technical skills, learn from real business problems, and build financial stability before taking that step.
          </p>
          <p>
            Over the long term, I want to turn what I learn into a business that creates genuine value. I want to understand customers, build products people need, develop a strong team, and create something that can grow beyond my individual effort. The goal is not just to start a company. It's to build a company worth sustaining.
          </p>
        </>
      )
    },
    {
      num: '05',
      title: 'Why Money Matters to Me',
      tagline: 'Money is a resource. Freedom is what I want to build with it.',
      content: (
        <>
          <p>
            To me, money is important because it creates options. It can provide financial security, help me support the people who matter to me, give me the freedom to make difficult decisions, and provide the capital needed to build something of my own.
          </p>
          <p>
            I don't see money as the only measure of success. But I also don't underestimate its importance. Good intentions alone cannot fund a business, support a team, or turn an idea into a sustainable product. That's why I want to become financially disciplined, understand how money works, and learn to create value that people are willing to pay for.
          </p>
          <p>
            I want to reach a point where financial pressure doesn't dictate every decision I make, where I can take calculated risks, invest in ideas I believe in, and build for the long term. I don't want to work only for money. I want to learn how to create value, manage money wisely, and use both to build a life with more freedom and purpose.
          </p>
        </>
      )
    },
    {
      num: '06',
      title: 'My Definition of Success',
      tagline: 'Success is bigger than a job title or a bank balance.',
      content: (
        <>
          <p>
            For me, success means becoming capable enough to build what I believe in, disciplined enough to keep going when progress is slow, and wise enough to understand what is worth pursuing.
          </p>
          <p>
            It means financial independence, meaningful work, the ability to help my family, and the opportunity to create something that outlasts a single achievement.
          </p>
          <p>
            I know the journey will include uncertainty, setbacks, and decisions I won't always get right. I don't expect everything to happen quickly. I want to become someone who can handle the responsibility that comes with bigger opportunities. I'm measuring my progress not only by what I earn or accomplish, but also by what I learn, what I create, and how I grow along the way.
          </p>
        </>
      )
    }
  ];

  const principles = [
    {
      title: 'Learn continuously',
      desc: 'Stay curious. Skills compound when learning becomes a habit.',
      icon: Lightbulb
    },
    {
      title: 'Build, don’t just imagine',
      desc: 'Ideas become valuable when they are tested and executed.',
      icon: Cpu
    },
    {
      title: 'Respect money',
      desc: 'Earn responsibly, spend intentionally, invest in the future.',
      icon: Coins
    },
    {
      title: 'Value reliability',
      desc: 'Build things that work consistently, not just things that look impressive.',
      icon: Shield
    },
    {
      title: 'Think long term',
      desc: 'Choose sustainable progress over shortcuts that compromise the future.',
      icon: TrendingUp
    },
    {
      title: 'Create real value',
      desc: 'Build products that solve real problems for real people.',
      icon: Target
    }
  ];

  const quotes = [
    {
      num: '01',
      category: 'THE JOURNEY',
      quote: 'I am not building a career just to reach a destination. I am building the skills to choose my own destination.'
    },
    {
      num: '02',
      category: 'MONEY & FREEDOM',
      quote: 'Money is not the finish line. It is one of the tools that gives me the freedom to choose what comes next.'
    },
    {
      num: '03',
      category: 'ENTREPRENEURSHIP',
      quote: 'One day, I want to stop asking whether an idea is possible and have the experience, resources, and courage to build it.'
    },
    {
      num: '04',
      category: 'DISCIPLINE',
      quote: 'The future I want is being built by the decisions I make when nobody is watching.'
    }
  ];

  const roadmap = [
    {
      badge: 'Current foundation',
      title: 'Learn & Build',
      desc: 'Strengthen engineering fundamentals, complete meaningful projects, and learn to solve real technical problems.'
    },
    {
      badge: 'Professional Growth',
      title: 'Grow Professionally',
      desc: 'Gain industry experience, improve system design and reliability skills, and learn how successful teams deliver software.'
    },
    {
      badge: 'Financial Discipline',
      title: 'Build Financial Stability',
      desc: 'Save consistently, understand personal finance, develop business knowledge, and build a responsible financial foundation.'
    },
    {
      badge: 'Product Market Fit',
      title: 'Validate a Business Idea',
      desc: 'Identify a real customer problem, research the market, build a minimum viable product, and test whether customers will pay for it.'
    },
    {
      badge: 'Startup Ambition',
      title: 'Build My Startup',
      desc: 'Launch when the problem, customer demand, financial runway, and personal readiness justify taking the risk. Build a sustainable business and grow it deliberately.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050406] text-[var(--text-primary)] selection:bg-[var(--accent-wine)] selection:text-white relative overflow-x-hidden">
      <ScrollProgress />

      {/* Atmospheric Background Glow */}
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
                <span>A PERSONAL STORY · AN EVOLVING VISION · A FUTURE WORTH BUILDING</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                <span>The Road to Building </span>
                <span className="gradient-text italic font-normal block sm:inline">Something </span>
                <span>of My Own.</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto">
                A guided walkthrough with milestones, personal principles, my relationship with money, and my long-term startup vision.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6 Story Chapters */}
        <section className="py-24 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto px-6 space-y-20">
            {chapters.map((ch, i) => (
              <motion.article
                key={ch.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="p-8 sm:p-12 rounded-3xl glass-card-3d border border-[var(--border-wine)] space-y-6"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase">
                      CHAPTER {ch.num}
                    </span>
                    <div className="w-5 h-px bg-[var(--accent-ruby)]" />
                    <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      Semmozhiyan's Narrative
                    </span>
                  </div>
                  <Compass size={16} className="text-[var(--accent-ruby)] opacity-70" />
                </div>

                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">
                    {ch.title}
                  </h2>
                  <p className="font-serif italic text-sm text-[var(--accent-vibrant)] font-light">
                    {ch.tagline}
                  </p>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
                  {ch.content}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* 07. Personal Principles */}
        <section className="py-28 border-b border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase block">
                SECTION 07
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                My Personal Principles
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light">
                Six foundational operating truths that govern how I learn, build software, and navigate decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="p-8 rounded-3xl glass-card-3d border border-[var(--border-wine)] group space-y-4"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <p.icon size={18} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--text-primary)] group-hover:text-white transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 08. Dedicated Quotes Section */}
        <section className="py-28 border-b border-[var(--border-subtle)] relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-16 text-center space-y-3">
              <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase block">
                SECTION 08
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                Original Mottos That Represent My Journey
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light max-w-xl mx-auto">
                Personal principles and guiding philosophies distilled from late nights of engineering, problem-solving, and disciplined planning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quotes.map((q, i) => (
                <motion.div
                  key={q.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="p-8 sm:p-10 rounded-3xl glass-card-3d border border-[var(--border-wine)] relative overflow-hidden flex flex-col justify-between group shadow-wine-sm"
                >
                  <div className="absolute -top-3 -right-3 text-[var(--accent-wine)]/20 pointer-events-none group-hover:text-[var(--accent-ruby)]/20 transition-colors">
                    <Quote size={85} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="font-mono text-xs font-bold text-[var(--accent-ruby)]">
                        {q.num}
                      </span>
                      <span className="text-[var(--text-muted)]">/</span>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                        {q.category}
                      </span>
                    </div>

                    <blockquote className="font-serif text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed font-medium italic group-hover:gradient-text transition-all">
                      “{q.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                    <span>Semmozhiyan</span>
                    <span>Personal Philosophy</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 09. My Journey Roadmap */}
        <section className="py-28 border-b border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto space-y-3">
              <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase block">
                SECTION 09
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                The Journey Roadmap
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-light">
                An evolving strategic horizon from foundational engineering mastery to building a sustainable, value-generating startup.
              </p>
            </div>

            {/* Desktop Horizontal / Mobile Vertical Timeline */}
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--border-wine)] via-[var(--accent-ruby)] to-[var(--border-wine)] -translate-y-1/2 -z-0 opacity-40" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                {roadmap.map((stage, i) => (
                  <motion.div
                    key={stage.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="p-6 rounded-3xl glass-card-3d border border-[var(--border-wine)] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-7 h-7 rounded-full bg-[var(--accent-wine)]/40 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-mono text-xs font-bold flex items-center justify-center">
                          0{i + 1}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--accent-ruby)] uppercase tracking-wider font-semibold">
                          {stage.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-[var(--text-primary)] mb-2 group-hover:text-white transition-colors">
                        {stage.title}
                      </h3>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                        {stage.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] flex items-center gap-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                      <span>Horizon Step {i + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. The Closing Statement (Manifesto) */}
        <section className="py-32">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 sm:p-14 rounded-3xl glass-card-3d border-2 border-[var(--border-wine)] space-y-6 shadow-wine-lg"
            >
              <span className="px-4 py-1.5 rounded-full bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-mono text-xs font-bold tracking-widest uppercase inline-block">
                STILL IN PROGRESS
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                This is only the beginning.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-xl mx-auto">
                <p>
                  I'm still learning. I'm still building. I'm still figuring things out.
                </p>
                <p>
                  I don't have every answer, and I don't need to pretend that I do. What I have is a direction, a willingness to learn, and a long-term ambition to create something meaningful.
                </p>
                <p>
                  Every skill I develop, every system I understand, every problem I solve, and every responsible financial decision brings me closer to the future I'm working toward.
                </p>
                <p className="text-[var(--text-primary)] font-medium font-serif italic text-lg pt-2">
                  The goal is to become capable of building something of my own, and to build it well.
                </p>
                <p className="font-serif text-xl font-bold text-[var(--accent-vibrant)]">
                  The journey continues.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white font-mono text-xs font-bold tracking-widest uppercase shadow-wine-md hover:shadow-wine-lg transition-all"
                >
                  <ArrowLeft size={15} />
                  <span>Return to Portfolio</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="border-t border-[var(--border-subtle)] bg-[#0A070D]/90 py-12">
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)]">
            <div>
              &copy; {new Date().getFullYear()} Semmozhiyan · The Journey
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-white transition-colors">
                Portfolio
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

export default JourneyPage;
