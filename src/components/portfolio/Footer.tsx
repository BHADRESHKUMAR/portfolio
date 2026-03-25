"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { useRef, useState } from "react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const btnRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { damping: 15, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 15, stiffness: 150 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < 80) {
      mouseX.set(distanceX * 0.2) // Max ~16px offset
      mouseY.set(distanceY * 0.2)
    } else {
      mouseX.set(0)
      mouseY.set(0)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <footer 
      id="contact" 
      ref={sectionRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className="relative bg-background pt-32 pb-12 overflow-hidden border-t border-white/5"
    >
      {/* Scanline / noise texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      {/* Background flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary/5 blur-[120px] rounded-t-[100%] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-white/10 mb-6 font-mono text-xs text-muted-foreground"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            System Online
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-display mb-6"
          >
            Let's Build Something <br className="hidden md:block"/> <span className="text-primary glow-text">Great.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mb-12"
          >
            I'm currently open for new opportunities. Whether you have a question or just want to discuss real-time systems, I'll try my best to get back to you!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
            ref={btnRef}
            style={{ x: springX, y: springY }}
          >
            {/* Animated border container for the email button */}
            <div className="relative p-[2px] rounded-full overflow-hidden group cursor-hover" onClick={() => window.location.href = 'mailto:bhadreshdhakecha4444@gmail.com'}>
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,hsl(var(--primary))_360deg)] animate-[spin_3s_linear_infinite]" />
              <div className="relative bg-background rounded-full px-8 py-4 flex items-center gap-3 transition-colors group-hover:bg-secondary/50">
                <Mail className="w-5 h-5 text-primary group-hover:glow-text" />
                <span className="font-mono text-foreground font-medium group-hover:text-primary transition-colors">Say Hello</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
          <div className="text-sm font-mono text-muted-foreground">
            &copy; {new Date().getFullYear()} / Bhadresh Dhakecha
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/bhadresh-dhakecha-502719172/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all cursor-hover">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://github.com/BHADRESHKUMAR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-border transition-all cursor-hover">
              <Github className="w-4 h-4" />
            </a>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-hover"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
