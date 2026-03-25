"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  number?: string
}

export function SectionHeading({ title, subtitle, number = "00" }: SectionHeadingProps) {
  return (
    <div className="mb-16 relative pl-6">
      {/* Strong left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary glow-border rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-primary/70 text-sm mb-2"
      >
        // {number}
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold mb-3 font-display"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-muted-foreground max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}