import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "./providers"

const siteUrl = "https://bhadresh.co"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bhadresh Dhakecha | Senior Frontend Engineer",
    template: "%s | Bhadresh Dhakecha",
  },
  description:
    "Bhadresh Dhakecha — Senior Frontend Engineer with 4+ years of experience building real-time systems, video streaming UIs, and high-performance React applications. Currently at NBA. Based in Mumbai, India.",
  keywords: [
    "Bhadresh Dhakecha",
    "Bhadresh",
    "bhadresh.co",
    "Frontend Engineer",
    "Senior Frontend Engineer",
    "React Developer",
    "React.js",
    "TypeScript Developer",
    "Next.js Developer",
    "JavaScript Engineer",
    "Mumbai Frontend Developer",
    "India Frontend Engineer",
    "Real-time systems developer",
    "Video streaming frontend",
    "NBA Frontend Engineer",
    "SignalR React",
    "Framer Motion developer",
    "Tailwind CSS",
    "Performance optimization React",
    "WebWorkers React",
    "OpenTelemetry frontend",
    "Portfolio",
    "Web Developer India",
    "Crest Data Systems",
  ],
  authors: [{ name: "Bhadresh Dhakecha", url: siteUrl }],
  creator: "Bhadresh Dhakecha",
  publisher: "Bhadresh Dhakecha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bhadresh Dhakecha Portfolio",
    title: "Bhadresh Dhakecha | Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer specializing in React.js, TypeScript, real-time systems, and video streaming. 4+ years of enterprise experience at NBA, Armis, Splunk, Chromecast, and Palo Alto Networks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bhadresh Dhakecha - Senior Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhadresh Dhakecha | Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer specializing in React.js, real-time systems, and video streaming. NBA, Armis, Splunk.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bhadresh Dhakecha",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle: "Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 4+ years of experience in React.js, TypeScript, real-time systems, and video streaming. Currently building mission control dashboards at the NBA.",
  worksFor: {
    "@type": "Organization",
    name: "National Basketball Association",
    url: "https://www.nba.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  email: "bhadreshdhakecha4444@gmail.com",
  sameAs: [
    "https://linkedin.com/in/bhadreshdhakecha",
    "https://github.com/bhadreshdhakecha",
    siteUrl,
  ],
  knowsAbout: [
    "React.js",
    "TypeScript",
    "Next.js",
    "JavaScript",
    "Frontend Development",
    "Real-time Systems",
    "Video Streaming",
    "SignalR",
    "WebWorkers",
    "OpenTelemetry",
    "Performance Optimization",
    "Micro Frontends",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Charotar University of Science and Technology (CHARUSAT)",
    url: "https://www.charusat.ac.in",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "B.Tech in Computer Engineering",
      credentialCategory: "degree",
      educationalLevel: "Bachelor's Degree",
      recognizedBy: {
        "@type": "EducationalOrganization",
        name: "Charotar University of Science and Technology",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
