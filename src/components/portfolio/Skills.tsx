"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SectionHeading } from "./SectionHeading"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const coreSkills = [
  { name: "React.js", percent: 95, context: "Used in NBA MCD, Armis, Splunk, Chromecast" },
  { name: "JavaScript ES6+", percent: 95, context: "5+ years of extensive use" },
  { name: "TypeScript", percent: 90, context: "4+ years across all enterprise projects" },
  { name: "Performance Optimization", percent: 88, context: "Micro-frontends, WebWorkers, Lazy Loading" },
  { name: "Real-time Systems", percent: 85, context: "SignalR, WebSocket streaming dashboards" },
  { name: "Next.js", percent: 80, context: "SSR, SSG, and SEO optimized pages" }
]

const otherSkills = [
  { name: "Redux", weight: 3 },
  { name: "Context API", weight: 4 },
  { name: "Tailwind CSS", weight: 4 },
  { name: "Micro Frontends", weight: 5 },
  { name: "Lazy Loading", weight: 4 },
  { name: "SignalR", weight: 3 },
  { name: "Jest & Enzyme", weight: 2 },
  { name: "AWS", weight: 2 },
  { name: "Docker", weight: 2 },
  { name: "Cypress", weight: 3 },
  { name: "Video Streaming SDKs", weight: 4 },
  { name: "OpenTelemetry", weight: 3 },
  { name: "WebWorkers", weight: 3 }
]

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
  const [activeTags, setActiveTags] = useState<Set<number>>(new Set())

  const toggleTag = (idx: number) => {
    setActiveTags(prev => {
      const newSet = new Set(prev)
      if (newSet.has(idx)) newSet.delete(idx)
      else newSet.add(idx)
      return newSet
    })
  }

  return (
    <section id="skills" className="py-24 relative bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Technical Arsenal" subtitle="Core proficiencies and tools I work with daily." number="04" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          
          {/* Left: Core Skills as Animated Bars */}
          <div className="relative">
            <h3 className="text-xl font-display font-bold mb-8 text-foreground">Core Technologies</h3>
            
            <AnimatePresence>
              {hoveredSkill !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute -top-12 left-0 right-0 glass-card bg-secondary/90 text-sm font-medium border border-primary/50 text-foreground p-3 rounded-xl z-20 shadow-xl shadow-primary/20 text-center"
                >
                  <span className="text-primary mr-2 font-bold">{coreSkills[hoveredSkill].name}:</span> 
                  <span className="text-muted-foreground">{coreSkills[hoveredSkill].context}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6 relative mt-4">
              {coreSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="group cursor-hover relative"
                  onMouseEnter={() => setHoveredSkill(idx)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center mb-2 transition-colors duration-300 group-hover:text-primary">
                    <span className="font-mono text-sm text-foreground/90 group-hover:text-primary transition-colors">{skill.name}</span>
                    <span className="font-mono text-xs text-primary">{skill.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                      className={`h-full rounded-full relative transition-all duration-300 ${hoveredSkill === idx ? 'bg-primary glow-border' : 'bg-gradient-to-r from-primary/50 to-primary glow-border'}`}
                    >
                      {/* Inner shine effect */}
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px] animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tag Cloud Hybrid */}
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-display font-bold text-foreground">Tools & Concepts</h3>
              <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded border border-white/5">
                {activeTags.size} selected
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-start glass-card p-8 rounded-3xl border border-white/5">
              {otherSkills.map((skill, idx) => {
                const sizes = {
                  1: "text-xs",
                  2: "text-sm",
                  3: "text-base",
                  4: "text-lg",
                  5: "text-xl font-bold"
                }
                const sizeClass = sizes[skill.weight as keyof typeof sizes] || "text-base"
                const isActive = activeTags.has(idx)
                
                return (
                  <motion.button
                    key={idx}
                    onClick={() => toggleTag(idx)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-hover ${sizeClass} ${
                      isActive 
                        ? 'bg-primary text-primary-foreground border-primary glow-border scale-105' 
                        : 'bg-background/50 border border-white/5 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:glow-text'
                    }`}
                  >
                    {skill.name}
                    {isActive && <Loader2 className="w-3 h-3 animate-spin" />}
                  </motion.button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
