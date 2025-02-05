"use client"

import "@/app/globals.css"
import "@/app/styles/carousel.css"
import { Inter } from "next/font/google"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import { useEffect } from "react"
import { useTheme } from "next-themes"
import type React from "react" // Added import for React

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
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

