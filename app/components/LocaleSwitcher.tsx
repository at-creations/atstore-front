"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Globe, ChevronDown } from "lucide-react";
import Image from "next/image";

interface LocaleSwitcherProps {
  color?: "blue" | "white" | "gray" | "black";
  className?: string;
}

export default function LocaleSwitcher({
  color = "blue",
  className = "",
}: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      const searchParams = window.location.search;
      const newUrl = `${pathname}${searchParams}`;
      router.replace(newUrl, { locale: newLocale });
    });
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Enhanced color maps with refined styling
  const colorMap = {
    blue: {
      btn: "bg-blue-800 text-white hover:bg-blue-600",
      dropdown: "border-blue-800 shadow-blue-900/30",
      icon: "text-blue-100",
    },
    white: {
      btn: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
      dropdown: "border-gray-100 shadow-gray-100/20",
      icon: "text-white",
    },
    gray: {
      btn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      dropdown: "border-gray-100 shadow-gray-100/20",
      icon: "text-gray-500",
    },
    black: {
      btn: "bg-gray-800 text-white hover:bg-gray-700",
      dropdown: "border-gray-100 shadow-gray-100/20",
      icon: "text-gray-400",
    },
  };

  const { btn, dropdown, icon } = colorMap[color];

  // Define the languages
  const languages = [
    { code: "en", name: "English", flag: "/icons/ca.svg" },
    { code: "vi", name: "Tiếng Việt", flag: "/icons/vi.svg" },
  ];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`flex items-center gap-2 rounded-full py-1.5 px-3 transition-all duration-300 ${btn} ${
          isPending ? "opacity-70" : ""
        }`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-label="Switch language"
        disabled={isPending}
      >
        <Globe className={`w-4 h-4 ${icon}`} aria-hidden="true" />
        <span className="font-medium text-sm">{locale.toUpperCase()}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${icon} ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg z-10 border ${dropdown} animate-fadeIn`}
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center w-full px-4 py-2.5 text-sm transition-colors ${
                  locale === lang.code
                    ? `font-medium relative ${
                        dropdownOpen
                          ? "bg-gray-100 dark:bg-gray-700/50 border-l-2 border-blue-600"
                          : ""
                      }`
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                }`}
                onClick={() => switchLocale(lang.code)}
                disabled={isPending}
              >
                <div className="h-4 w-4 mr-3 relative">
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    fill
                    sizes="16px"
                    className="object-cover rounded-sm"
                  />
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
