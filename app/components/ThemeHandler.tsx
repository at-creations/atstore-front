"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeHandler() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(darkModeMediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, [setTheme]);

  return null;
}