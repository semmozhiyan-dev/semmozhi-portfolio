import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Server,
  Layers,
  Command,
  Search,
  X,
  FileText,
  Download,
  Check,
  Sparkles,
  Zap,
  Globe,
  Shield,
  MapPin,
  ExternalLink,
  Code2,
  Box,
  Compass,
  CheckCircle2,
  Cpu,
  Database,
  Briefcase,
  Terminal,
  Activity,
  ShoppingCart,
  Utensils,
  CreditCard,
  Quote,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import profileImg from './semmozhi.jpeg';
import JourneyPage from './JourneyPage.jsx';
import LessonsPage from './LessonsPage.jsx';

// --- Interactive 3D Tilt Component ---

const TiltCard3D = ({ children, className = "", onClick, ...props }) => {
  const cardRef = React.useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const [isHovered, setIsHovered] = React.useState(false);
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-3xl glass-card-3d overflow-hidden ${className}`}
        {...props}
      >
        {/* Dynamic Specular Light Sweep */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 340px at ${glarePos.x}% ${glarePos.y}%, rgba(222, 47, 82, 0.35), transparent 70%)`,
          }}
        />

        {/* Inner Content with 3D Pop */}
        <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// --- Custom Hooks ---

const useActiveSection = (sectionIds) => {
  const [active, setActive] = React.useState(sectionIds[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px' });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
};

// --- Atmospheric 3D Lighting ---

const AtmosphericBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  React.useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Velvet Wine Core Nebula */}
      <div className="absolute -top-[20%] left-[10%] w-[55vw] h-[55vw] rounded-full bg-[#3D0A13]/25 blur-[160px]" />
      
      {/* Rich Ruby Lateral Accent */}
      <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#781223]/20 blur-[170px]" />
      
      {/* Deep Obsidian Noir Floor */}
      <div className="absolute -bottom-[20%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-[#26050C]/25 blur-[160px]" />

      {/* Cursor-Interactive Fluid Light Orb */}
      <motion.div
        className="absolute w-[35vw] h-[35vw] rounded-full bg-[#A51D35]/12 blur-[140px] -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      />
    </div>
  );
};

// --- Typography & Subcomponents ---

const SectionHeader = ({ number, title, subtitle }) => (
  <div className="mb-14 border-b border-[var(--border-subtle)] pb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="font-mono text-xs font-bold text-[var(--accent-ruby)] tracking-widest uppercase">
        {number}
      </span>
      <div className="w-6 h-px bg-[var(--accent-ruby)]" />
      <span className="font-mono text-[11px] tracking-widest text-[var(--text-muted)] uppercase">
        {subtitle}
      </span>
    </div>
    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
      {title}
    </h2>
  </div>
);

const LuxuryButton = ({ children, href, to, onClick, icon: Icon, primary = false, className = "" }) => {
  const content = (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
        primary
          ? 'bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white shadow-wine-md hover:shadow-wine-lg border border-white/10'
          : 'bg-[#0E0B11]/80 border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-primary)] hover:bg-[#15101A] shadow-sm'
      } ${className}`}
    >
      {Icon && <Icon size={14} className={primary ? "text-white" : "text-[var(--accent-ruby)]"} />}
      <span>{children}</span>
    </motion.div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  if (href) {
    const isExt = href.startsWith('http') || href.startsWith('mailto');
    return (
      <a href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <button onClick={onClick} type="button">{content}</button>;
};

// --- Navigation ---

const Navigation = ({ activeSection, onOpenResume }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'journey', label: 'Journey', href: '#journey' },
    { id: 'lessons', label: 'Lessons', href: '#lessons' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)]' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand: The Tale Of Semmozhiyan */}
        <a href="#about" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--accent-wine)] to-[var(--accent-ruby)] flex items-center justify-center text-white shadow-wine-sm border border-white/10 group-hover:scale-105 transition-transform duration-300">
            <span className="font-serif font-black text-sm tracking-wider">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[var(--text-primary)] group-hover:gradient-text transition-all">
              The Tale Of Semmozhiyan
            </span>
            <span className="font-mono text-[9px] tracking-widest text-[var(--text-secondary)] uppercase">
              Site Reliability Engineer
            </span>
          </div>
        </a>

        {/* Minimalist Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0E0B11]/70 px-4 py-2 rounded-full border border-[var(--border-subtle)] backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-4 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-all duration-300 rounded-full ${
                  isActive ? 'text-white font-semibold' : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="luxuryNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] rounded-full -z-10 shadow-wine-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-primary)] font-mono text-xs font-semibold transition-all duration-300 shadow-sm"
          >
            <FileText size={13} className="text-[var(--accent-ruby)]" />
            <span>RESUME</span>
          </motion.button>
        </div>

      </div>
    </motion.header>
  );
};

// --- Hero Section (Haute-Luxury Editorial 3D) ---

const Hero = ({ onOpenResume }) => {
  const focusAreas = [
    'Site Reliability Engineering',
    'DevOps',
    'Full-Stack Development',
    'CI/CD Automation',
    'Observability',
    'Cloud Infrastructure'
  ];

  return (
    <section id="about" className="relative pt-36 pb-28 md:pt-48 md:pb-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Discrete Role Tag */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--accent-wine)]/20 border border-[var(--border-wine)] text-xs font-mono text-[var(--accent-vibrant)] mb-8 shadow-wine-sm">
                <Sparkles size={12} className="text-[var(--accent-ruby)]" />
                <span>SITE RELIABILITY ENGINEER · SOFTWARE DEVELOPER</span>
              </div>

              {/* Grand Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
                <span>Building </span>
                <span className="gradient-text italic font-normal">Reliable </span>
                <span>Software.</span>
                <br />
                <span>Engineering for Scale.</span>
              </h1>

              {/* Lead Text */}
              <p className="text-[var(--text-primary)] text-base sm:text-lg leading-relaxed max-w-xl font-medium mb-4">
                Engineering reliable digital experiences. Building applications, automating deployments, and improving system reliability.
              </p>

              {/* Narrative Paragraphs */}
              <div className="space-y-4 text-sm text-[var(--text-secondary)] font-light leading-relaxed max-w-xl">
                <p>
                  I'm a software engineer and Site Reliability Engineer focused on building dependable applications, improving deployment workflows, and maintaining reliable digital systems.
                </p>
                <p>
                  My experience spans full-stack development, backend engineering, cloud infrastructure, CI/CD automation, monitoring, and production troubleshooting. I enjoy turning complex technical challenges into practical, scalable solutions.
                </p>
                <p>
                  Currently, I'm working at <strong className="text-[var(--text-primary)] font-semibold">NexGenAds Technologies Pvt. Ltd.</strong>, contributing to projects across digital ordering, CRM, and point-of-sale systems, while continuing to build and refine my own products.
                </p>
              </div>
            </motion.div>

            {/* Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 rounded-3xl glass-card-3d border-l-4 border-l-[var(--accent-ruby)] space-y-3"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Core Focus Areas
              </div>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="px-3.5 py-1.5 rounded-full bg-[#050406]/70 border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <LuxuryButton href="#projects" primary icon={ArrowUpRight}>
                Explore Projects ↗
              </LuxuryButton>
              <LuxuryButton href="#experience" icon={Briefcase}>
                View Experience
              </LuxuryButton>
              
              <div className="flex items-center gap-2 pl-2">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://github.com/semmozhiyan-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-secondary)] hover:text-white transition-all shadow-sm"
                  title="GitHub"
                >
                  <Github size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-secondary)] hover:text-white transition-all shadow-sm"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="mailto:semmozhiyan40@gmail.com"
                  className="p-3.5 rounded-2xl bg-[#0E0B11] border border-[var(--border-subtle)] hover:border-[var(--border-wine)] text-[var(--text-secondary)] hover:text-white transition-all shadow-sm"
                  title="Email"
                >
                  <Mail size={16} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* 3D Interactive Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm"
            >
              <TiltCard3D className="shadow-card-3d">
                {/* Image Container */}
                <div className="relative rounded-[22px] overflow-hidden bg-[#0A070D] aspect-[3/4]">
                  <img
                    src={profileImg}
                    alt="Semmozhiyan — Site Reliability Engineer"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://github.com/semmozhiyan-dev.png"; }}
                    className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.92] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050406] via-[#050406]/20 to-transparent opacity-85" />

                  {/* Top Location Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050406]/85 border border-white/10 backdrop-blur-md">
                    <MapPin size={11} className="text-[var(--accent-ruby)]" />
                    <span className="font-mono text-[10px] text-[var(--text-primary)]">India · IST</span>
                  </div>

                  {/* Bottom Operational Plaque */}
                  <div className="absolute bottom-4 inset-x-4 p-5 rounded-2xl bg-[#0E0B11]/90 border border-[var(--border-wine)] backdrop-blur-xl shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] block">
                          Current Role
                        </span>
                        <div className="font-serif font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-ruby)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-ruby)]" />
                          </span>
                          NexGenAds Technologies
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-muted)] block">
                          Role
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--accent-vibrant)]">
                          SRE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard3D>

              <div className="mt-5 text-center font-mono text-[11px] text-[var(--text-muted)]">
                NexGenAds Technologies Pvt. Ltd. · SRE & Software Engineer
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Professional Experience Section ---

const ProfessionalExperience = () => {
  const responsibilities = [
    'Support the reliability and operational stability of web applications and backend services.',
    'Work with deployment pipelines, infrastructure configuration, and application environments.',
    'Monitor application health, investigate issues, and troubleshoot service failures.',
    'Collaborate with development teams to improve deployment consistency and production readiness.',
    'Contribute to performance optimization, incident investigation, and operational improvements.'
  ];

  const tools = [
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Prometheus',
    'Grafana',
    'NGINX',
    'Linux',
    'AWS'
  ];

  const companyProjects = [
    {
      title: '1Grow',
      badge: 'DIGITAL MENU & ORDERING',
      desc: 'A digital menu and customer ordering platform designed to help hospitality businesses present menus online and streamline the ordering experience.',
      focus: 'Reliability, deployment, application monitoring, and troubleshooting, based on actual contributions.',
      icon: Utensils
    },
    {
      title: 'CRM Platform',
      badge: 'BUSINESS OPERATIONS',
      desc: 'A customer relationship management platform designed to centralize customer information, support business workflows, and improve operational visibility.',
      focus: 'Service health, deployment operations, backups, monitoring, and incident troubleshooting where applicable.',
      icon: Database
    },
    {
      title: 'MultiMenu POS',
      badge: 'POINT OF SALE & INVENTORY',
      desc: 'A point-of-sale system designed to support billing, inventory operations, order processing, and day-to-day restaurant workflows.',
      focus: 'End-to-end verification, backend and frontend troubleshooting, service reliability, and deployment support.',
      icon: CreditCard
    }
  ];

  return (
    <section id="experience" className="py-28 border-b border-[var(--border-subtle)] relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="01"
          subtitle="Work History & Roles"
          title="Professional Experience"
        />

        {/* Company Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <TiltCard3D className="p-8 sm:p-10 border border-[var(--border-wine)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-mono text-[10px] uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)] animate-pulse" />
                  Current Role
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  Site Reliability Engineer
                </h3>
                <span className="font-mono text-sm text-[var(--accent-vibrant)] font-semibold">
                  NexGenAds Technologies Pvt. Ltd.
                </span>
              </div>
              <div className="text-left md:text-right">
                <span className="font-mono text-xs text-[var(--text-muted)] block">Focus</span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                  Reliability · Deployments · Monitoring
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light mb-8 max-w-3xl">
              Working on web applications and business-critical systems with a focus on system reliability, deployment workflows, monitoring, and operational efficiency.
            </p>

            {/* Key Responsibilities */}
            <div className="mb-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
                Key Responsibilities
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                    <CheckCircle2 size={15} className="text-[var(--accent-ruby)] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Utilized */}
            <div className="pt-6 border-t border-[var(--border-subtle)]">
              <h4 className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-3">
                Core Tooling & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg bg-[#050406]/80 border border-white/10 font-mono text-xs text-[var(--text-primary)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard3D>
        </motion.div>

        {/* Professional Projects at NexGenAds */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ruby)]" />
            <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
              Professional Projects at NexGenAds
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyProjects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <TiltCard3D className="p-8 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <p.icon size={18} />
                      </div>
                      <span className="font-mono text-[9px] text-[var(--accent-ruby)] font-bold tracking-widest uppercase">
                        {p.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:gradient-text transition-all">
                      {p.title}
                    </h4>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)]">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                      Contribution Focus
                    </span>
                    <p className="text-[11px] text-[var(--text-secondary)] font-light leading-relaxed">
                      {p.focus}
                    </p>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Personal Projects Section ---

const PersonalProjects = () => {
  const projects = [
    {
      title: 'Foodela',
      badge: 'FOOD ORDERING PLATFORM',
      desc: 'A food ordering application built with a modern frontend and backend architecture to deliver a responsive browsing and ordering experience.',
      stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Java Spring Boot', 'Supabase'],
      links: {
        demo: 'https://github.com/semmozhiyan-dev',
        code: 'https://github.com/semmozhiyan-dev',
        caseStudy: null
      },
      icon: Utensils
    },
    {
      title: 'Vendora',
      badge: 'FULL-STACK E-COMMERCE',
      desc: 'A full-stack e-commerce platform featuring product discovery, user authentication, shopping carts, order management, and payment integration.',
      stack: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Razorpay'],
      links: {
        demo: 'https://github.com/semmozhiyan-dev',
        code: 'https://github.com/semmozhiyan-dev',
        caseStudy: null
      },
      icon: ShoppingCart
    },
    {
      title: 'Orivex',
      badge: 'SUBSCRIPTION & REVENUE MANAGEMENT',
      status: 'In Development',
      desc: 'A subscription management platform designed around recurring billing, payment workflows, tenant administration, and revenue operations.',
      stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Jenkins', 'Prometheus', 'Grafana'],
      links: {
        demo: null,
        code: 'https://github.com/semmozhiyan-dev',
        caseStudy: null
      },
      icon: CreditCard
    }
  ];

  return (
    <section id="projects" className="py-28 border-b border-[var(--border-subtle)] relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="02"
          subtitle="Independent Software Products"
          title="Personal Projects & Products"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <TiltCard3D className="p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <p.icon size={18} />
                    </div>
                    {p.status ? (
                      <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-bold tracking-widest uppercase">
                        {p.status}
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] text-[var(--accent-ruby)] font-bold tracking-widest uppercase">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:gradient-text transition-all">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                    {p.desc}
                  </p>

                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#050406]/70 border border-white/5 font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.links.demo && (
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-vibrant)] hover:text-white font-semibold transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight size={12} />
                      </a>
                    )}
                    {p.links.code && (
                      <a
                        href={p.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                  {p.status && (
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      Active Build
                    </span>
                  )}
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- The Journey Homepage Preview Section ---

const JourneyPreview = () => {
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

  return (
    <section id="journey" className="py-28 border-b border-[var(--border-subtle)] relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="03"
          subtitle="The Road to Building Something of My Own"
          title="The Journey & Founder Ambition"
        />

        {/* Founder Ambition Lead Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <TiltCard3D className="p-8 sm:p-12 border border-[var(--border-wine)] shadow-wine-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-mono text-[10px] uppercase tracking-wider">
                  <Sparkles size={11} className="text-[var(--accent-ruby)]" />
                  <span>A PERSONAL STORY · AN EVOLVING VISION</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] leading-snug">
                  Learn First. Build Experience. Create Something of My Own.
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light max-w-2xl">
                  My long-term ambition is to build a technology startup of my own. I don't want to rush into entrepreneurship without understanding what it takes to build a sustainable business. My plan is to gain experience in the industry, strengthen my technical skills, learn from real business problems, and build financial stability before taking that step.
                </p>

                <div className="pt-2">
                  <Link
                    to="/journey"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white font-mono text-xs font-bold tracking-widest uppercase shadow-wine-md hover:shadow-wine-lg transition-all"
                  >
                    <span>Read the Full Journey Manifesto</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#050406]/70 border border-white/5 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                  Walkthrough Chapters
                </span>
                <ul className="space-y-2.5 font-mono text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>01. The Beginning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>02. Learning to Build</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>03. Systems Behind Software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>04. Long-Term Vision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>05. Why Money Matters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>06. Definition of Success</span>
                  </li>
                </ul>
              </div>
            </div>
          </TiltCard3D>
        </motion.div>

        {/* 4 Quotes Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ruby)]" />
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                Guiding Philosophies & Mottos
              </h3>
            </div>
            <Link
              to="/journey"
              className="font-mono text-xs text-[var(--accent-vibrant)] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Explore all principles</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map((q, i) => (
              <motion.div
                key={q.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <TiltCard3D className="p-8 h-full flex flex-col justify-between group shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--accent-ruby)]">
                          {q.num}
                        </span>
                        <span className="text-[var(--text-muted)]">/</span>
                        <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-widest">
                          {q.category}
                        </span>
                      </div>
                      <Quote size={16} className="text-[var(--accent-ruby)]/40" />
                    </div>

                    <blockquote className="font-serif text-base sm:text-lg text-[var(--text-primary)] leading-relaxed italic group-hover:gradient-text transition-all">
                      “{q.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
                    Original personal motto · Semmozhiyan
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Lessons Life Taught Me Homepage Preview Section ---

const LessonsPreview = () => {
  const highlights = [
    {
      num: '01',
      title: 'Patience',
      subtitle: 'Not Everything Happens on My Timeline',
      quote: 'I cannot control how quickly every result arrives, but I can control the quality of the effort I bring today.'
    },
    {
      num: '02',
      title: 'Failure',
      subtitle: 'A Result Is Not My Identity',
      quote: 'Failure can be expensive, but repeating it without learning is even more expensive.'
    },
    {
      num: '04',
      title: 'Consistency',
      subtitle: 'Small Actions Compound',
      quote: 'My future is influenced not only by my biggest decisions, but also by the small ones I repeat.'
    }
  ];

  return (
    <section id="lessons" className="py-28 border-b border-[var(--border-subtle)] relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="04"
          subtitle="Experiential Wisdom & Reflections"
          title="Lessons Life Taught Me"
        />

        {/* Lead Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <TiltCard3D className="p-8 sm:p-12 border border-[var(--border-wine)] shadow-wine-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] font-mono text-[10px] uppercase tracking-wider">
                  <Sparkles size={11} className="text-[var(--accent-ruby)]" />
                  <span>REFLECTIONS ON GROWTH, PATIENCE & PURPOSE</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[var(--text-primary)] leading-snug">
                  Some lessons are learned through success. Others change you through experience.
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light max-w-2xl">
                  Life doesn't always teach its most important lessons through achievements or advice. Sometimes, the lessons come from waiting longer than expected, making the wrong decision, or realizing that the way I once viewed the world was incomplete. I'm not writing these lessons because I have everything figured out. I'm writing them because I'm still learning.
                </p>

                <div className="pt-2">
                  <Link
                    to="/lessons"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white font-mono text-xs font-bold tracking-widest uppercase shadow-wine-md hover:shadow-wine-lg transition-all"
                  >
                    <span>Explore All 8 Life Lessons</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#050406]/70 border border-white/5 space-y-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                  The Eight Chapters
                </span>
                <ul className="space-y-2.5 font-mono text-xs text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>01. Patience & Timeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>02. Failure & Identity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>03. Trust & Character</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>04. Consistency & Habits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>05. Curating Your Circle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>06. Embracing Uncertainty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>07. Money as a Tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ruby)]" />
                    <span>08. Self-Respect & Growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </TiltCard3D>
        </motion.div>

        {/* 3 Spotlight Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-ruby)]" />
              <h3 className="font-serif text-xl font-bold text-[var(--text-primary)]">
                Core Realizations
              </h3>
            </div>
            <Link
              to="/lessons"
              className="font-mono text-xs text-[var(--accent-vibrant)] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Read all 8 chapters</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <TiltCard3D className="p-8 h-full flex flex-col justify-between group shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--accent-ruby)]">
                          LESSON {h.num}
                        </span>
                      </div>
                      <Quote size={16} className="text-[var(--accent-ruby)]/40" />
                    </div>

                    <h4 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-1">
                      {h.title}
                    </h4>
                    <p className="font-mono text-xs text-[var(--text-muted)] mb-5">
                      {h.subtitle}
                    </p>

                    <blockquote className="font-serif text-sm text-[var(--text-primary)] leading-relaxed italic group-hover:gradient-text transition-all">
                      “{h.quote}”
                    </blockquote>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      to="/lessons"
                      className="font-mono text-xs text-[var(--accent-ruby)] group-hover:text-[var(--accent-vibrant)] flex items-center gap-1.5 transition-colors font-semibold"
                    >
                      <span>Read chapter</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Contact ("Direct Transmission") ---

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({ subject: 'SRE Collaboration', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      setSubmitted(true);
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="05"
          subtitle="Direct Communication"
          title="Initiate Transmission & Collaboration"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative & Direct Endpoints */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
              Let's Build for <span className="gradient-text italic font-normal">Permanence</span>.
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-light">
              Whether you are discussing site reliability engineering roles, application deployments, or cloud infrastructure challenges, my inbox is open.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { icon: Mail, label: 'Direct Email', value: 'semmozhiyan40@gmail.com', href: 'mailto:semmozhiyan40@gmail.com' },
                { icon: Linkedin, label: 'LinkedIn Network', value: 'Semmozhiyan N S', href: 'https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/' },
                { icon: Github, label: 'GitHub Repositories', value: '@semmozhiyan-dev', href: 'https://github.com/semmozhiyan-dev' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card-3d group transition-all"
                >
                  <div className="p-3 rounded-xl bg-[var(--accent-wine)]/25 border border-[var(--border-wine)] text-[var(--accent-vibrant)] group-hover:scale-105 transition-transform">
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-white truncate">{item.value}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass-card-3d rounded-3xl p-8 border border-[var(--border-wine)] shadow-wine-md">
              <div className="border-b border-[var(--border-subtle)] pb-4 mb-6">
                <h4 className="font-serif text-lg font-bold text-[var(--text-primary)]">Send Direct Message</h4>
                <p className="text-xs text-[var(--text-secondary)] font-light">All communications are received with confidentiality.</p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-14 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-vibrant)] flex items-center justify-center mx-auto">
                    <Check size={28} />
                  </div>
                  <h5 className="font-serif text-xl font-bold text-[var(--text-primary)]">Transmission Received</h5>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto font-light leading-relaxed">
                    Thank you for reaching out. I will review your message and reply promptly.
                  </p>
                </motion.div>
              ) : (
                <form
                  className="space-y-6"
                  action="https://formspree.io/f/mwpbjoad"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="block font-mono text-[11px] text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                      Subject Matter
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-[#050406] border border-[var(--border-subtle)] focus:border-[var(--accent-ruby)] p-4 text-xs rounded-2xl outline-none text-[var(--text-primary)] font-mono transition-colors"
                    >
                      <option value="SRE Collaboration">Site Reliability Engineering Collaboration</option>
                      <option value="Career Opportunity">Career Opportunity / SRE Position</option>
                      <option value="Cloud Consultation">Cloud Architecture & Deployment Consultation</option>
                      <option value="General Conversation">General Conversation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
                      Message Content
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-[#050406] border border-[var(--border-subtle)] focus:border-[var(--accent-ruby)] p-4 text-xs rounded-2xl outline-none text-[var(--text-primary)] font-mono transition-colors resize-none placeholder-[var(--text-muted)]"
                      placeholder="Please convey the context of your inquiry or system specifications..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white font-mono text-xs font-bold tracking-widest uppercase hover:shadow-wine-md transition-all duration-300 border border-white/10"
                  >
                    Submit Transmission
                  </motion.button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Architectural Luxury Footer ---

const Footer = () => (
  <footer className="border-t border-[var(--border-subtle)] bg-[#0A070D]/90 py-16 relative">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      
      <div className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--accent-wine)] to-[var(--accent-ruby)] flex items-center justify-center text-white shadow-wine-sm">
            <span className="font-serif font-black text-xs">S</span>
          </div>
          <span className="font-serif font-bold text-base tracking-wide text-[var(--text-primary)]">
            The Tale Of Semmozhiyan
          </span>
        </div>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          Site Reliability Engineer · NexGenAds Technologies Pvt. Ltd.
        </p>
      </div>

      <div className="flex items-center gap-6 font-mono text-xs text-[var(--text-muted)]">
        <Link to="/journey" className="hover:text-[var(--text-primary)] transition-colors">
          The Journey
        </Link>
        <Link to="/lessons" className="hover:text-[var(--text-primary)] transition-colors">
          Life Lessons
        </Link>
        <a href="https://github.com/semmozhiyan-dev" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors">
          LinkedIn
        </a>
        <a href="mailto:semmozhiyan40@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
          Email
        </a>
      </div>

      <div className="font-mono text-[11px] text-[var(--text-muted)]">
        &copy; {new Date().getFullYear()} Semmozhiyan. All rights reserved.
      </div>

    </div>
  </footer>
);

// --- Command Palette (⌘K) ---

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const actions = [
    { id: 'about', label: 'About & Introduction', href: '/#about', desc: 'Building Reliable Software. Engineering for Scale.' },
    { id: 'experience', label: 'Professional Experience', href: '/#experience', desc: 'NexGenAds Technologies · SRE Role & Projects' },
    { id: 'projects', label: 'Personal Projects', href: '/#projects', desc: 'Foodela, Vendora & Orivex product suite' },
    { id: 'journey', label: 'The Journey & Ambition', href: '/journey', desc: 'The road to building something of my own' },
    { id: 'lessons', label: 'Lessons Life Taught Me', href: '/lessons', desc: 'Patience, failure, consistency, and 8 life lessons' },
    { id: 'contact', label: 'Direct Transmission', href: '/#contact', desc: 'Connect with Semmozhiyan' },
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (href) => {
    if (href.startsWith('/#')) {
      window.location.href = href;
    } else {
      window.location.href = href;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed left-1/2 top-[22%] -translate-x-1/2 w-full max-w-lg bg-[#0E0B11] border border-[var(--border-wine)] shadow-2xl rounded-3xl overflow-hidden z-[80]"
          >
            <div className="flex items-center px-6 py-4 border-b border-[var(--border-subtle)] bg-[#050406]">
              <Search size={15} className="text-[var(--accent-ruby)] mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search portfolio sections, projects, or journey..."
                className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] font-mono text-xs"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <span className="px-2 py-0.5 text-[9px] font-mono rounded border border-[var(--border-subtle)] bg-[#0E0B11] text-[var(--text-muted)]">
                ESC
              </span>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-3">
              {filtered.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleNavigate(action.href)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-[#050406] text-[var(--text-secondary)] hover:text-white transition-all text-left group"
                >
                  <div>
                    <div className="font-serif text-sm font-bold group-hover:text-white">{action.label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">{action.desc}</div>
                  </div>
                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 text-[var(--accent-ruby)] transition-opacity" />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-[var(--text-muted)] font-mono text-xs">
                  No matching section found for "{query}"
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-[#050406] border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
              <span>Navigation</span>
              <span>Press ESC to dismiss</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Resume Modal ---

const ResumeModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-[80]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="fixed inset-4 md:inset-10 bg-[#0E0B11] border border-[var(--border-wine)] shadow-2xl rounded-3xl overflow-hidden z-[90] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[#050406]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-ruby)] flex items-center justify-center">
                <FileText size={15} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-[var(--text-primary)]">
                  SEMMOZHIYAN_RESUME.pdf
                </h3>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">Site Reliability Engineer · NexGenAds Technologies</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/SEMMOZHIYAN_RESUME%20(4).pdf"
                download
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-wine)]/30 border border-[var(--border-wine)] text-[var(--accent-vibrant)] hover:text-white font-mono text-xs font-semibold transition-colors"
                title="Download PDF"
              >
                <Download size={13} />
                <span>Download</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#050406] relative">
            <iframe
              src="/SEMMOZHIYAN_RESUME%20(4).pdf"
              className="w-full h-full"
              title="Semmozhiyan Resume"
            />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// --- Floating Action Controls ---

const FloatingActions = ({ onOpenCmd, onOpenResume }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 250);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-3 bg-[#0E0B11]/90 backdrop-blur-xl border border-[var(--border-wine)] text-[var(--text-primary)] rounded-full shadow-wine-md hover:shadow-wine-lg transition-all font-mono text-xs font-bold"
          >
            <Download size={14} className="text-[var(--accent-ruby)]" />
            <span>RESUME</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCmd}
            className="p-3.5 bg-gradient-to-r from-[var(--accent-wine)] to-[var(--accent-ruby)] text-white rounded-full shadow-wine-md hover:shadow-wine-lg transition-all border border-white/10"
            title="Command Palette (⌘K)"
          >
            <Command size={18} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Home Page Component ---

const HomePage = ({ onOpenResume }) => {
  React.useEffect(() => {
    document.title = "The Tale Of Semmozhiyan | Site Reliability Engineer & Software Developer";
  }, []);

  const activeSection = useActiveSection(['about', 'experience', 'projects', 'journey', 'lessons', 'contact']);

  return (
    <>
      <Navigation
        activeSection={activeSection}
        onOpenResume={onOpenResume}
      />

      <main>
        <Hero onOpenResume={onOpenResume} />
        <ProfessionalExperience />
        <PersonalProjects />
        <JourneyPreview />
        <LessonsPreview />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

// --- App Root with Routes ---

const App = () => {
  const [isCmdOpen, setIsCmdOpen] = React.useState(false);
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#050406] text-[var(--text-primary)] selection:bg-[var(--accent-wine)] selection:text-white relative overflow-x-hidden">
      <AtmosphericBackground />

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage onOpenResume={() => setIsResumeOpen(true)} />} />
          <Route path="/journey" element={<JourneyPage onOpenResume={() => setIsResumeOpen(true)} />} />
          <Route path="/lessons" element={<LessonsPage onOpenResume={() => setIsResumeOpen(true)} />} />
        </Routes>

        <FloatingActions
          onOpenCmd={() => setIsCmdOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        <CommandPalette
          isOpen={isCmdOpen}
          onClose={() => setIsCmdOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
