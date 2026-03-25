"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { SectionHeading } from "./SectionHeading"
import { ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react"

const experiences = [
  {
    role: "Frontend Engineer",
    company: "NBA - National Basketball Association",
    period: "May 2025 – Present",
    location: "Mumbai, India",
    responsibilities: [
      "Developed and enhanced a real-time monitoring dashboard for live streaming pipelines using React, enabling visibility into video delivery systems and stream health.",
      "Built highly performant UI components optimized for handling continuous real-time data updates, ensuring low latency and smooth rendering under high load conditions.",
      "Collaborated with backend and DevOps teams to integrate APIs for stream validation, playback monitoring, and system health metrics using ASP.NET and Azure.",
      "Improved usability of monitoring tools for video workflows, helping teams quickly identify playback issues, failures, and performance bottlenecks.",
      "Acted as a frontend point of contact, guiding feature implementation and collaborating across teams to deliver scalable solutions."
    ],
    active: true
  },
  {
    role: "Software Engineer",
    company: "Crest Data Systems",
    period: "Dec 2021 – May 2025",
    location: "Ahmedabad, India",
    responsibilities: [
      "Developed and maintained scalable web applications using React, Next.js, and TypeScript, ensuring high performance and maintainability.",
      "Optimized application performance by leveraging micro front-ends, gzip compression, and lazy loading, resulting in a 30% reduction in load times.",
      "Built reusable React Storybook components to maintain design consistency across multiple projects and accelerate development.",
      "Optimized frontend applications for performance across different screen sizes, network conditions, and resource-constrained environments.",
      "Focused on delivering low-latency playback experience and responsive UI for media-rich applications.",
      "Implemented unit and integration testing with Jest, Enzyme, and Cypress, improving code reliability and reducing bugs."
    ],
    active: false
  }
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" className="py-24 relative bg-background bg-grid-pattern">
      <div className="absolute inset-0 bg-background/90 z-0" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Work Experience" subtitle="My professional journey and impact." number="02" />

        <div ref={containerRef} className="relative max-w-5xl mx-auto mt-12">
          {/* Timeline line (left-side) */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5" />
          <motion.div
            className="absolute left-6 top-0 w-[2px] bg-gradient-to-b from-primary via-accent to-primary"
            style={{ height: lineHeight, boxShadow: "0 0 8px rgba(0,255,135,0.4)" }}
          />

          <div className="space-y-10 pl-16">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp, idx }: { exp: typeof experiences[0], idx: number }) {
  const [expanded, setExpanded] = useState(false)
  const visibleResponsibilities = expanded ? exp.responsibilities : exp.responsibilities.slice(0, 2)

  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className={`absolute -left-[2.75rem] top-6 w-4 h-4 rounded-full bg-background border-[3px] z-10 flex items-center justify-center ${exp.active ? 'border-primary' : 'border-muted-foreground/40'}`}>
        {exp.active && <div className="w-2 h-2 rounded-full bg-primary animate-ping" />}
      </div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${exp.active ? 'glow-border' : 'border border-white/10'}`}
      >
        {/* Top accent bar */}
        <div className={`h-1 w-full ${exp.active ? 'bg-gradient-to-r from-primary via-emerald-400 to-transparent' : 'bg-gradient-to-r from-muted-foreground/20 to-transparent'}`} />

        <div className="bg-secondary/40 p-6 md:p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-2xl font-bold font-display text-foreground mb-1">{exp.role}</h3>
              <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                {exp.company}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-xs font-mono text-muted-foreground shrink-0 sm:text-right">
              <div className="flex items-center gap-1.5 sm:justify-end">
                <Calendar size={12} />
                <span className={exp.active ? "text-primary border border-primary/30 px-2 py-0.5 rounded-full" : ""}>{exp.period}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:justify-end">
                <MapPin size={12} />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Bullet list */}
          <ul className="space-y-3 pt-5 border-t border-white/10">
            <AnimatePresence initial={false}>
              {visibleResponsibilities.map((resp, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground/90 leading-relaxed overflow-hidden"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span>{resp}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {exp.responsibilities.length > 2 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-5 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-foreground hover:bg-primary/20 bg-primary/10 px-3 py-1.5 rounded-full transition-colors cursor-hover"
            >
              {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Show {exp.responsibilities.length - 2} more</>}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
