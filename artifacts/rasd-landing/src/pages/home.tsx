import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import RasdVideo from "@/components/RasdVideo";
import { 
  Shield, 
  Zap, 
  Lock, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Menu, 
  X,
  Clock,
  DollarSign,
  User,
  Brain,
  FileSearch,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Stats", href: "#stats" },
  { label: "Why", href: "#why" },
  { label: "Compare", href: "#compare" },
  { label: "Live Proof", href: "#proof" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
          data-testid="nav-logo"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">RASD</span>
          <span className="text-muted-foreground font-normal text-base">رصد</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary/5"
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/50 px-4 pb-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b border-border/30 last:border-0"
              data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\\s+/g, "-")}`}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ value, duration = 2, decimals = 0, suffix = "", prefix = "" }: { value: number, duration?: number, decimals?: number, suffix?: string, prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * value);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  // Handle formatting large numbers like 4990000
  const formattedCount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count);

  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

const CountdownStat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(197);
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    if (!isInView) return;
    
    setPhase(1);
    const duration = 2000;
    const startValue = 197;
    let startTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startValue * (1 - easeProgress));
      setCount(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(0);
        setPhase(2);
        setTimeout(() => {
          setPhase(3);
        }, 300);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView]);

  return (
    <div ref={ref} className="flex justify-center items-center min-h-[8rem] mb-4">
      {phase < 3 ? (
        <div className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground/80 tabular-nums">
          {count} Days
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl md:text-7xl font-bold tracking-tighter"
        >
          <span className="text-muted-foreground/40 text-3xl md:text-4xl line-through">197 Days</span>
          <span className="text-foreground/40 text-3xl md:text-4xl">→</span>
          <span className="text-primary glow-text-cyan">2ms</span>
        </motion.div>
      )}
    </div>
  );
};

const TerminalProof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState<number>(0);
  
  const codeLines = [
    '{',
    '  "event":       "CreateRole — IAM privilege escalation attempt",',
    '  "time":        "02:17 AM — outside business hours",',
    '  "source_ip":   "UNKNOWN — never seen before",',
    '  "risk_score":  100,',
    '  "tier":        "CRITICAL ⚠",',
    '  "action":      "ALL SESSIONS REVOKED — access denied",',
    '  "latency_ms":  2,',
    '  "ai_reasons": [',
    '    "High-risk IAM action detected               → score ×1.3",',
    '    "Access at 2AM, outside business hours       → score ×1.2",',
    '    "Targeting CRITICAL sensitivity resource     → score ×1.5",',
    '    "Final score: 117 → capped at 100 → CRITICAL"',
    '  ],',
    '  "human_summary": "Insider attempted to create an admin role at 2AM from an unrecognized IP. Blocked in 2ms. Sessions revoked. SOC alerted."',
    '}'
  ];

  useEffect(() => {
    if (!isInView) return;
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setVisibleLines(prev => prev + 1);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 150); // fast typing effect
    
    return () => clearInterval(interval);
  }, [isInView, codeLines.length]);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-border bg-black shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#1e1e1e] border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs font-mono text-muted-foreground">rasd-inference-pipeline.sh</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-red-500 font-semibold">CRITICAL</span>
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-[#00ff41]">
        {codeLines.slice(0, visibleLines).map((line, i) => {
          // Highlight critical rows
          const isCritical = line.includes('"risk_score":  100') || line.includes('"tier":        "CRITICAL ⚠"');
          return (
            <div key={i} className={isCritical ? "text-[#ff5f56] font-bold" : ""}>
              {line}
            </div>
          );
        })}
        {visibleLines < codeLines.length && (
          <span className="animate-pulse font-bold text-[#00ff41]">|</span>
        )}
        {visibleLines === codeLines.length && (
          <span className="animate-pulse font-bold text-[#00ff41] ml-1">|</span>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}} />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/50 border border-primary/20 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">LIVE — Actively monitoring in AWS eu-north-1</span>
            </div>
          </FadeIn>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4 flex items-center justify-center gap-6">
              <span className="glow-text-cyan text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">RASD</span>
              <span className="text-4xl sm:text-5xl md:text-6xl text-muted-foreground font-normal">رصد</span>
            </h1>
          </motion.div>
          
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 mb-4 max-w-3xl mx-auto leading-tight">
              The AI system that catches what humans miss — in 2 milliseconds.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-lg text-primary tracking-widest uppercase mb-12 font-semibold">
              Real-time. Intelligent. Zero Trust.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 glow-cyan-hover bg-primary text-primary-foreground font-semibold rounded-full">
                View Architecture
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="relative mx-auto max-w-4xl rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_40px_rgba(0,212,255,0.12)]">
              <RasdVideo />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">Watch how RASD detects insider threats in real-time</p>
          </FadeIn>
        </div>
      </section>

      {/* 2. WHAT IS RASD? */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Uncompromising Defense</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built to operate in millisecond windows, enforcing Zero Trust at the edge.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <Card className="bg-card border-border/50 h-full hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Learn Normal Behavior</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    RASD studies what each employee normally does on the cloud — when they log in, what files they access, what actions they perform.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="bg-card border-border/50 h-full hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Detect Anomalies Instantly</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The moment someone does something unusual — accessing sensitive files at 3AM, downloading bulk data, or escalating their own privileges — RASD flags it in milliseconds.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="bg-card border-border/50 h-full hover:border-primary/50 transition-colors duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Automatic Response</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    RASD doesn't just alert — it automatically enforces security policies. Block sessions, require extra verification, or lock accounts — all without human intervention.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <div className="mb-24 mt-8">
              <CountdownStat />
              <div className="text-sm md:text-lg text-muted-foreground font-medium uppercase tracking-widest mt-4">Industry Average vs RASD</div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 mb-20 items-start justify-center">
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  <AnimatedCounter value={0.9999} decimals={4} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">AUC-ROC Score</div>
                <div className="text-xs text-primary mt-1">Near-Perfect AI</div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  <AnimatedCounter value={3} suffix="ms" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Attack Response Time</div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight flex items-baseline">
                  <AnimatedCounter value={4990000} prefix="$" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider text-balance">Avg. Insider Breach Cost Prevented</div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  <AnimatedCounter value={0.017} decimals={3} suffix="%" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">False Positive Rate</div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                  <AnimatedCounter value={1000} suffix="+" />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">Behavioral Profiles Learned</div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.8}>
            <div className="w-full bg-gradient-to-r from-orange-950/40 via-red-900/30 to-orange-950/40 border border-orange-500/50 rounded-2xl p-8 md:p-12 shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0" />
              <h3 className="text-2xl md:text-4xl font-bold text-orange-400 mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
                <span className="text-4xl">⚠</span> 
                <span>The industry average time to detect an insider threat is 197 days.</span>
              </h3>
              <p className="text-xl md:text-2xl text-foreground/90 font-medium">
                RASD does it in <span className="text-orange-400 font-bold">2 milliseconds</span>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. WHY EXTRAORDINARY */}
      <section id="why" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Why This Is Extraordinary</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Not an iteration. A fundamental shift in security architecture.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            <FadeIn delay={0.1}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">What Takes the Industry 197 Days, We Do in 2ms</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    IBM's 2024 Cost of a Data Breach Report found the average insider threat takes 197 days to detect. RASD detected and blocked a live simulated attack in 2 milliseconds. That's not an improvement. That's a different category entirely.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Near-Perfect AI — 0.9999 AUC-ROC</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We tested on 200,000 real events. Out of 199,615 innocent actions, we raised only 33 false alarms. Out of 385 real threats, we caught 361. An AI model this accurate doesn't just work — it works well enough to bet an organisation's security on.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">A $4.99M Problem for $80 a Month</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The average insider threat breach costs $4,990,000 according to IBM. RASD prevents it for $80.40/month on AWS. No servers. No maintenance team. No 6-figure security contracts. Just math, running in the cloud.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">It Knows You Better Than Your Manager Does</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    RASD learned 1,000 unique behavioral fingerprints — one for each user — using 600,000 real events from the CERT insider threat dataset. It knows what time you usually log in, which files you normally touch, and how fast you typically work. The moment something feels off, it acts.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Catches the Attacks Firewalls Can't See</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Firewalls block strangers. RASD catches insiders — employees with valid credentials doing dangerous things quietly. We simulated 4 real attack types: data exfiltration, privilege escalation, lateral movement, and credential compromise. RASD detected all of them before a single byte of damage was done.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.6}>
              <Card className="bg-background border-border/50 h-full hover:border-primary/60 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.2)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary glow-cyan">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">It Explains Every Decision — No Black Box</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every alert comes with a plain-language explanation powered by SHAP AI. Top 3 features. Exact contribution scores. Full audit trail secured with a SHA-256 cryptographic chain. If RASD locks someone out, it can prove exactly why — in court, if necessary.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. COMPARE TABLE */}
      <section id="compare" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">How We Compare</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                RASD doesn't compete with legacy tools. It makes them obsolete.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="w-full overflow-x-auto rounded-2xl border border-border/50 bg-card/40 shadow-2xl backdrop-blur-sm">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="p-6 text-muted-foreground font-semibold">Feature</th>
                    <th className="p-6 text-muted-foreground font-semibold">Traditional SIEM</th>
                    <th className="p-6 text-muted-foreground font-semibold">Rule-Based Systems</th>
                    <th className="p-6 text-primary font-bold bg-primary/10 border-b-2 border-primary glow-text-cyan">RASD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Detection Speed</td>
                    <td className="p-6 text-muted-foreground">Hours – Days</td>
                    <td className="p-6 text-muted-foreground">Minutes</td>
                    <td className="p-6 text-primary font-bold bg-primary/5">2ms ⚡</td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">False Positive Rate</td>
                    <td className="p-6 text-muted-foreground">40–60%</td>
                    <td className="p-6 text-muted-foreground">20–40%</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">0.017% <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Explains Decisions</td>
                    <td className="p-6 text-muted-foreground">No</td>
                    <td className="p-6 text-muted-foreground">No</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">Yes (SHAP AI) <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Auto-Enforces Policy</td>
                    <td className="p-6 text-muted-foreground">No</td>
                    <td className="p-6 text-muted-foreground">Rarely</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">Always <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Per-User AI Profiles</td>
                    <td className="p-6 text-muted-foreground">No</td>
                    <td className="p-6 text-muted-foreground">No</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">1,000+ <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Monthly Cost</td>
                    <td className="p-6 text-muted-foreground">$5,000–$50,000</td>
                    <td className="p-6 text-muted-foreground">$2,000+</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">$80.40 <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                  <tr className="hover:bg-card/60 transition-colors">
                    <td className="p-6 font-medium">Needs a Team to Run</td>
                    <td className="p-6 text-muted-foreground">Yes (large SOC)</td>
                    <td className="p-6 text-muted-foreground">Yes</td>
                    <td className="p-6 text-primary font-bold bg-primary/5 flex items-center gap-2">No <CheckCircle className="w-4 h-4" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. LIVE PROOF TERMINAL */}
      <section id="proof" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border/40">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">This happened in real life. April 17, 2026. AWS eu-north-1.</h2>
              <p className="text-muted-foreground text-lg font-mono">
                Real JSON. Real Lambda. Real AWS. Not a simulation.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <TerminalProof />
          </FadeIn>
        </div>
      </section>

      {/* 7. HOW IT WORKS (pipeline) */}
      <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Inference Pipeline</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Millisecond decision making at scale.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 relative z-10 justify-between items-stretch">
            {[
              { step: "01", title: "CloudTrail Event", desc: "Employee performs an action on AWS" },
              { step: "02", title: "Feature Extraction", desc: "43 behavioral features extracted in real-time" },
              { step: "03", title: "AI Scoring", desc: "XGBoost model scores the risk (0–100)" },
              { step: "04", title: "Risk Decision", desc: "LOW / MEDIUM / HIGH / CRITICAL tier assigned" },
              { step: "05", title: "Auto-Enforcement", desc: "IAM policy enforced: allow, MFA, restrict, or block" }
            ].map((item, index) => (
              <FadeIn key={item.step} delay={index * 0.15} className="flex-1 flex flex-row lg:flex-col items-stretch">
                {/* Card */}
                <div className="flex-1 bg-card border border-border/50 rounded-xl p-6 group hover:border-primary/50 transition-colors flex flex-col lg:items-center">
                  <div className="w-10 h-10 rounded-full bg-background border border-primary/60 text-primary font-bold text-sm flex items-center justify-center mb-4 glow-cyan flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="text-left lg:text-center">
                    <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                {/* Arrow between steps */}
                {index < 4 && (
                  <>
                    {/* Vertical arrow on mobile */}
                    <div className="lg:hidden flex items-center justify-start pl-10 py-1">
                      <div className="w-0.5 h-6 bg-border" />
                    </div>
                    {/* Horizontal arrow on desktop */}
                    <div className="hidden lg:flex items-center justify-center px-1 flex-shrink-0">
                      <div className="h-0.5 w-6 bg-border" />
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-border flex-shrink-0" />
                    </div>
                  </>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TECH STACK */}
      <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border/40">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Built on AWS</h2>
          </FadeIn>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Python", "PyTorch", "XGBoost", "AWS Lambda", "Amazon Kinesis", 
              "DynamoDB", "S3", "CloudTrail", "IAM", "Docker", "SHAP", "Zero Trust Architecture"
            ].map((tech, i) => (
              <FadeIn key={tech} delay={i * 0.05}>
                <Badge variant="outline" className="px-6 py-3 text-sm md:text-base border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-cyan-hover bg-primary/5">
                  {tech}
                </Badge>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MEET THE TEAM */}
      <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Engineering Team</h2>
              <p className="text-muted-foreground">The architects behind RASD.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {[
              {
                name: "Essam Khaled Alotaibi",
                role: "Lead Security Engineer — Zero Trust & IAM",
                linkedin: "https://www.linkedin.com/in/essam-al-otaibi-a5749b260/",
                cv: `${import.meta.env.BASE_URL}cv/essam.pdf`
              },
              {
                name: "Badi Khalid Alotaibi",
                role: "AWS & ML Infrastructure — S3, DynamoDB, SageMaker",
                linkedin: "https://www.linkedin.com/in/badi-alotaibi-96257a341",
                cv: `${import.meta.env.BASE_URL}cv/badi.pdf`
              },
              {
                name: "Basil Aidhah Al Zahrani",
                role: "Lead ML Engineer — Autoencoder & Baseline Learning",
                linkedin: "https://www.linkedin.com/in/basil-al-zahrani-861738262",
                cv: `${import.meta.env.BASE_URL}cv/basil.pdf`
              },
              {
                name: "Basel Falah Alharbi",
                role: "Real-time Integration — Lambda, Kinesis & Performance",
                linkedin: "https://www.linkedin.com/in/basel-a-27243b31a",
                cv: `${import.meta.env.BASE_URL}cv/basel.pdf`
              },
              {
                name: "Monther Abdulaziz Alqarzee",
                role: "Integration Lead & DevOps — CI/CD, Testing & Monitoring",
                linkedin: "https://www.linkedin.com/in/monther-alqarzaee",
                cv: `${import.meta.env.BASE_URL}cv/monther.pdf`
              }
            ].map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <Card className="bg-card border-border/50 h-full hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-8 flex-grow">{member.role}</p>
                    
                    <div className="flex gap-3 mt-auto">
                      <Button variant="outline" size="sm" className="flex-1 border-[#0A66C2]/40 text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] transition-all duration-200" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" data-testid={`btn-linkedin-${member.name}`}>
                          <FaLinkedin className="w-4 h-4 mr-2" /> LinkedIn
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-200" asChild>
                        <a href={member.cv} target="_blank" rel="noopener noreferrer" data-testid={`btn-cv-${member.name}`}>
                          <FileText className="w-4 h-4 mr-2" /> CV
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="py-12 px-4 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-foreground font-semibold mb-2 flex items-center justify-center gap-2">
            RASD <span className="text-muted-foreground font-normal mx-2">|</span> رصد
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Imam AbdulRahman Bin Faisal University | Spring 2026
          </p>
          <p className="text-xs text-muted-foreground/60">
            AI-Based Insider Threat Detection Graduation Project
          </p>
        </div>
      </footer>

    </div>
  );
}
