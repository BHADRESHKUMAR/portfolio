"use client"

import { motion } from "framer-motion"
import { SectionHeading } from "./SectionHeading"

export function EducationAndAchievements() {
  const achievements = [
    "Solved 300+ problems on LeetCode, enhancing problem-solving skills.",
    "Successfully completed CCNA Module I with hands-on networking fundamentals.",
    "Certified in Google IT Support Professional Certificate (Coursera).",
    "4,126,117 points earned in Google Hash Code, 2020.",
    "Facebook AR Scholarship Recipient, School of Innovation, 2020."
  ]

  return (
    <section id="education" className="py-24 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Background & Honors" subtitle="Academic history and notable milestones." number="05" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          
          {/* Left: Education Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border-t border-t-primary/50 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-primary/20 transition-colors duration-700" />
            
            <div className="relative z-10">
              <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-4 block">Education</span>
              
              <div className="flex flex-col mb-8">
                <span className="text-7xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/30 mb-2">
                  9.5<span className="text-3xl text-primary glow-text">GPA</span>
                </span>
                <span className="text-xl text-muted-foreground font-medium">B.Tech in Computer Engineering</span>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div>
                  <h4 className="text-lg font-bold text-foreground">Charotar University of Science and Technology (CHARUSAT)</h4>
                  <p className="text-muted-foreground font-mono mt-1 text-sm">Jun 2018 – Apr 2022 • Anand, Gujarat</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Achievements Numbered List */}
          <div className="flex flex-col justify-center">
            <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest mb-6 block">Achievements</span>
            <div className="space-y-6">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary border border-white/5 flex items-center justify-center shrink-0 font-mono text-sm text-accent group-hover:border-accent/50 group-hover:glow-border transition-colors">
                    0{idx + 1}
                  </div>
                  <p className="text-muted-foreground leading-relaxed pt-2 group-hover:text-foreground transition-colors">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}