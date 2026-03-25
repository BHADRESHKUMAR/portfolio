"use client"

import { CustomCursor } from "@/components/portfolio/CustomCursor"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
