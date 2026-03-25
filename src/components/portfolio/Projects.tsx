"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { SectionHeading } from "./SectionHeading"
import React, { useRef, useState } from "react"

const projects = [
  {
    title: "NBA – Mission Control Dashboard",
    period: "May 2025 – Present",
    tech: ["React.js", "TypeScript", "SignalR", "MediaKind SDK"],
    description: "Real-time mission control dashboard monitoring live game operations, including game state, score updates, and blackout status. Integrated video streaming using Video SDK to enable live playback monitoring. Implemented SignalR for low-latency updates and optimized UI for high-frequency real-time data.",
    color: "from-primary",
    accentColor: "rgba(0,255,135,0.15)"
  },
  {
    title: "Armis – Security Analytics Dashboard",
    period: "Jun 2024 – May 2025",
    tech: ["React.js", "TypeScript", "Webworker"],
    description: "Real-time security alert dashboards with streaming data visualization and automated report generation. Utilized Webworkers to offload heavy data processing from the main thread for smooth rendering.",
    color: "from-accent",
    accentColor: "rgba(255,107,53,0.15)"
  },
  {
    title: "Splunk – Observability Platform",
    period: "Jun 2023 – Jun 2024",
    tech: ["React.js", "TypeScript", "OpenTelemetry"],
    description: "Real-time dashboards and alert systems using streaming data for infrastructure monitoring. Built integrations for AWS, Linux, Windows, ECS, and Kubernetes via OpenTelemetry pipelines. Led a frontend team of 3 engineers.",
    color: "from-blue-500",
    accentColor: "rgba(59,130,246,0.15)"
  },
  {
    title: "Chromecast Streaming Platform",
    period: "Oct 2022 – Jun 2023",
    tech: ["React.js", "TypeScript", "Video Streaming"],
    description: "Frontend for Chromecast-based video streaming enabling seamless playback on large-screen devices. Worked on VCMS workflows including content ingestion, metadata handling, and playback configuration.",
    color: "from-purple-500",
    accentColor: "rgba(168,85,247,0.15)"
  },
  {
    title: "Palo Alto Networks – Deployment Automation Portal",
    period: "Mar 2022 – Oct 2022",
    tech: ["React.js", "TypeScript"],
    description: "Automated firewall deployment workflows with real-time configuration validation. Implemented real-time threat monitoring dashboards to track firewall alerts and designed the firewall creation flow with uCPE validation.",
    color: "from-orange-500",
    accentColor: "rgba(249,115,22,0.15)"
  }
]

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Enterprise Projects" subtitle="Scalable architectures and real-time dashboards." number="03" />

        <div className="mb-8 inline-block px-4 py-2 rounded-md bg-secondary/50 border border-white/5 font-mono text-sm text-primary/80">
          <span className="text-accent">const</span> <span className="text-foreground">enterprise_projects</span> = projects.<span className="text-blue-400">map</span>(p {'=>'} {'<'}Project /{'>'});
        </div>

        <div className="flex flex-col gap-5">
          {projects.map((project, idx) => (
            <TiltCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TiltCard({ project, idx }: { project: typeof projects[0], idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useMotionTemplate`${mouseYSpring}deg`
  const rotateY = useMotionTemplate`${mouseXSpring}deg`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct * 6)
    y.set(yPct * -6)
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.08 }}
      className={`relative glass-card rounded-2xl border border-white/5 overflow-hidden cursor-hover transition-shadow duration-300 ${isHovering ? `shadow-[0_0_30px_${project.accentColor}]` : ''}`}
    >
      {/* Glare */}
      <motion.div
        className="absolute inset-0 z-50 pointer-events-none rounded-2xl"
        style={{
          background: useMotionTemplate`radial-gradient(circle 400px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.07), transparent 70%)`,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}
      />

      {/* Left color accent bar */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${project.color} to-transparent`} />

      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6" style={{ transform: "translateZ(30px)" }}>

        {/* Left: number + title + desc */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono px-2 py-1 rounded bg-secondary text-muted-foreground border border-white/10 shrink-0">
              {project.period}
            </span>
            <span className="text-xs font-mono text-muted-foreground/40">#{String(idx + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Right: tech tags stacked */}
        <div className="flex flex-wrap md:flex-col gap-2 md:min-w-[160px] md:items-end shrink-0">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded border border-primary/10 whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
