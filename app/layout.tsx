"use client"

import "@/app/globals.css"
import "@/app/styles/carousel.css"
import { Inter } from "next/font/google"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import { useEffect } from "react"
import { useTheme } from "next-themes"
import type React from "react"
import { metadata } from "./metadata"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setTheme(darkModeMediaQuery.matches ? "dark" : "light")

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange)
    }
  }, [setTheme])

  return (
    <html lang="en" className={theme}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
        {metadata.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-32 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

