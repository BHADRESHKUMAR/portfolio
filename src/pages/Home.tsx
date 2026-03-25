"use client"

import { Navbar } from "@/components/portfolio/Navbar"
import { Hero } from "@/components/portfolio/Hero"
import { About } from "@/components/portfolio/About"
import { Experience } from "@/components/portfolio/Experience"
import { Projects } from "@/components/portfolio/Projects"
import { Skills } from "@/components/portfolio/Skills"
import { EducationAndAchievements } from "@/components/portfolio/Education"
import { Footer } from "@/components/portfolio/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationAndAchievements />
      </main>

      <Footer />
    </div>
  )
}
