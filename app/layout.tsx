"use client"

import "@/app/globals.css"
import "@/app/styles/carousel.css"
import { Inter } from "next/font/google"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import { useEffect } from "react"
import { useTheme } from "next-themes"
import type React from "react"

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
        <title>AT Creations Store</title>
        <meta
          name="description"
          content="AT Creations Store - Your one-stop shop for all things AT Creations"
        />
        <link rel="icon" href="https://cdn2.atcreations.ca/logo/logo_no_txt_no_bg.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-32 sm:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

