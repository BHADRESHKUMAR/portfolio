"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const { scrollYProgress } = useScroll()
  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const progressBarWidth = useTransform(scrollSpring, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = ['home', 'about', 'experience', 'projects', 'skills']
    sections.forEach((section) => {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent z-[100]"
        style={{ width: progressBarWidth }}
      />
      
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={cn(
          "pointer-events-auto transition-all duration-500 rounded-full border flex items-center justify-between px-6 py-3",
          isScrolled 
            ? "bg-background/70 backdrop-blur-md border-white/10 shadow-lg shadow-black/50" 
            : "bg-background/40 backdrop-blur-sm border-white/5"
        )}>
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-xl font-bold font-display text-foreground tracking-tighter mr-8 cursor-hover"
          >
            BD<span className="text-primary glow-text">_</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors relative group px-2 py-1 cursor-hover",
                    isActive ? "text-primary glow-text" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary glow-border animate-pulse"
                    />
                  )}
                </a>
              )
            })}
            <div className="w-px h-4 bg-border mx-2" />
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-sm font-mono text-primary hover:text-primary-foreground hover:bg-primary px-4 py-1.5 rounded-full transition-all duration-300 border border-primary/30 hover:glow-border cursor-hover"
            >
              ./contact
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground ml-4 cursor-hover"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full mt-4 left-4 right-4 pointer-events-auto md:hidden glass-card rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "text-base font-medium p-3 rounded-xl transition-colors cursor-hover",
                        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-white/5"
                      )}
                    >
                      {item.name}
                    </a>
                  )
                })}
                <a 
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="text-center font-mono rounded-xl bg-primary/10 text-primary border border-primary/20 p-3 mt-2 hover:bg-primary hover:text-primary-foreground transition-all cursor-hover"
                >
                  ./contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
