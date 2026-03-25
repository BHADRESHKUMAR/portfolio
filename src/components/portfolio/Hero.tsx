"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { ParticleBackground } from "./ParticleBackground"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = `> whoami
Bhadresh Dhakecha

> role
Senior Frontend Engineer

> speciality
Real-time Systems & Video Streaming

> status
✓ Available for new opportunities`

  useEffect(() => {
    let currentText = ""
    let i = 0
    const interval = setInterval(() => {
      currentText += fullText[i]
      setTypedText(currentText)
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 40) // fast typing speed
    
    return () => clearInterval(interval)
  }, [fullText])

  // Mouse Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 400 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  const outerX = useTransform(parallaxX, [-1, 1], [-10, 10])
  const outerY = useTransform(parallaxY, [-1, 1], [-10, 10])
  const innerX = useTransform(parallaxX, [-1, 1], [-20, 20])
  const innerY = useTransform(parallaxY, [-1, 1], [-20, 20])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize to -1 to 1
      const x = (e.clientX / innerWidth) * 2 - 1
      const y = (e.clientY / innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="rounded-xl overflow-hidden border border-white/10 bg-secondary/80 backdrop-blur-md shadow-2xl shadow-black/50">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 bg-black/40 border-b border-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive cursor-hover" />
                  <div className="w-3 h-3 rounded-full bg-accent cursor-hover" />
                  <div className="w-3 h-3 rounded-full bg-primary glow-border cursor-hover" />
                </div>
                <div className="mx-auto font-mono text-xs text-muted-foreground cursor-default">guest@portfolio:~</div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-6 md:p-8 font-mono text-sm md:text-base whitespace-pre-wrap min-h-[320px] cursor-text">
                <div className="text-foreground/90 leading-relaxed">
                  {typedText}
                  <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle" />
                </div>
              </div>
            </div>

            {/* Bottom Strip: Contact Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a href="mailto:bhadreshdhakecha4444@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all cursor-hover">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Email</span>
              </a>
              <a href="https://www.linkedin.com/in/bhadresh-dhakecha-502719172/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all cursor-hover">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
              <a href="https://github.com/BHADRESHKUMAR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all cursor-hover">
                <Github className="w-4 h-4" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a href="https://leetcode.com/u/bhadreshdhakecha4444/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-primary/50 hover:text-primary transition-all cursor-hover">
                <span className="text-sm font-bold tracking-tight">LC</span>
                <span className="text-sm font-medium">LeetCode</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Stylized "BD" Logo / Geometric Art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-center relative h-[500px]"
          >
            {/* Glowing Backdrop */}
            <div className="absolute w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]" />
            
            {/* Rotating Hexagons */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ x: outerX, y: outerY }}
            >
              <div className="absolute inset-0 flex items-center justify-center animate-[spin-slow_20s_linear_infinite]">
                <svg width="400" height="400" viewBox="0 0 400 400" className="text-primary/30 stroke-current">
                  <polygon points="200,50 330,125 330,275 200,350 70,275 70,125" fill="none" strokeWidth="1" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center animate-[spin-slow_30s_linear_infinite_reverse]">
                <svg width="360" height="360" viewBox="0 0 400 400" className="text-accent/20 stroke-current">
                  <polygon points="200,50 330,125 330,275 200,350 70,275 70,125" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>
            
            {/* Core Logo */}
            <motion.div 
              style={{ x: innerX, y: innerY }}
              className="relative z-10 w-48 h-48 flex items-center justify-center border border-white/10 bg-secondary/50 backdrop-blur-xl rounded-3xl rotate-12 glow-border hover:rotate-0 transition-transform duration-700 cursor-hover group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl" />
              <span className="text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-500 -rotate-12 group-hover:rotate-0">
                BD
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/50 z-20"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-primary glow-text">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  )
}
