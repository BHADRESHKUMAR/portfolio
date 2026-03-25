"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { SectionHeading } from "./SectionHeading"
import { Zap, MonitorPlay, Code2 } from "lucide-react"

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        // Easing out function
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-foreground">
      {count}{suffix}
    </span>
  )
}

const codeLines = [
  { text: `/**`, highlight: false, classes: "text-slate-500" },
  { text: ` * About Bhadresh Dhakecha`, highlight: false, classes: "text-slate-500" },
  { text: ` * Frontend Developer working on real-time`, highlight: false, classes: "text-slate-500" },
  { text: ` * video monitoring and dashboard applications`, highlight: false, classes: "text-slate-500" },
  { text: ` */`, highlight: false, classes: "text-slate-500" },

  { text: `const expertise = {`, highlight: true, parts: [
    { t: "const", c: "text-primary" },
    { t: " expertise ", c: "text-blue-400" },
    { t: "= {", c: "text-primary" }
  ]},

  { text: `  frontend: "React, Next.js, TypeScript, reusable component architecture",`, highlight: true, parts: [
    { t: "  frontend", c: "text-accent" },
    { t: ": ", c: "text-foreground" },
    { t: "\"React, Next.js, TypeScript, reusable component architecture\"", c: "text-emerald-400" },
    { t: ",", c: "text-foreground" }
  ]},

  { text: `  performance: "Optimized rendering and API handling for smooth UI",`, highlight: true, parts: [
    { t: "  performance", c: "text-accent" },
    { t: ": ", c: "text-foreground" },
    { t: "\"Optimized rendering and API handling for smooth UI\"", c: "text-emerald-400" },
    { t: ",", c: "text-foreground" }
  ]},

  { text: `  realtime: "Working with live video streams and monitoring dashboards",`, highlight: true, parts: [
    { t: "  realtime", c: "text-accent" },
    { t: ": ", c: "text-foreground" },
    { t: "\"Working with live video streams and monitoring dashboards\"", c: "text-emerald-400" },
    { t: ",", c: "text-foreground" }
  ]},

  { text: `  focus: "Building scalable dashboards and clean UI systems",`, highlight: true, parts: [
    { t: "  focus", c: "text-accent" },
    { t: ": ", c: "text-foreground" },
    { t: "\"Building scalable dashboards and clean UI systems\"", c: "text-emerald-400" },
    { t: ",", c: "text-foreground" }
  ]},

  { text: `  learning: "Exploring backend architecture and system design"`, highlight: true, parts: [
    { t: "  learning", c: "text-accent" },
    { t: ": ", c: "text-foreground" },
    { t: "\"Exploring backend architecture and system design\"", c: "text-emerald-400" }
  ]},

  { text: `};`, highlight: true, parts: [{ t: "};", c: "text-foreground" }] },

  { text: ``, highlight: false, classes: "" },

  { text: `export default expertise;`, highlight: true, parts: [
    { t: "export default", c: "text-primary" },
    { t: " expertise;", c: "text-blue-400" }
  ]}
];

export function About() {
  const highlights = [
    { icon: <Zap className="w-5 h-5 text-primary" />, title: "Performance", desc: "Micro-frontends & lazy loading" },
    { icon: <MonitorPlay className="w-5 h-5 text-accent" />, title: "Video Streaming", desc: "Low-latency playback UI" },
    { icon: <Code2 className="w-5 h-5 text-emerald-400" />, title: "Architecture", desc: "Scalable enterprise apps" }
  ]

  const [activeLine, setActiveLine] = useState(5) // Start highlighting from line 5 (const expertise...)

  useEffect(() => {
    const highlightableLines = codeLines.map((line, idx) => line.highlight ? idx : -1).filter(idx => idx !== -1)
    let currentIdx = 0

    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % highlightableLines.length
      setActiveLine(highlightableLines[currentIdx])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="About Me" 
          subtitle="A brief introduction to my expertise and capabilities."
          number="01"
        />
        
        {/* Animated Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { end: 4, suffix: "+", label: "Years Experience" },
            { end: 5, suffix: "", label: "Enterprise Projects" },
            { end: 300, suffix: "+", label: "LeetCode Problems" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-primary/30 transition-colors"
            >
              <div className="text-primary glow-text mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code Block Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl"
        >
          <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
            <span className="text-xs font-mono text-muted-foreground">about.ts</span>
          </div>
          <div className="py-6 md:py-8 overflow-x-auto text-sm md:text-base font-mono leading-relaxed">
            <div className="flex flex-col min-w-max">
              {codeLines.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`px-6 md:px-8 py-0.5 transition-all duration-500 border-l-2 ${activeLine === idx ? 'bg-primary/10 border-primary shadow-[inset_0_0_10px_rgba(0,255,135,0.05)]' : 'border-transparent'}`}
                >
                  {line.parts ? (
                    <span>
                      {line.parts.map((p, i) => (
                        <span key={i} className={p.c}>{p.t}</span>
                      ))}
                    </span>
                  ) : (
                    <span className={line.classes}>{line.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="p-3 rounded-lg bg-background border border-white/5 group-hover:glow-border transition-all">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 font-display">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
