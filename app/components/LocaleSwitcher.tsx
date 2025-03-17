"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

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

  // Color maps for text and hover states
  const colorMap = {
    blue: {
      text: "text-blue-600",
      hover: "hover:text-blue-800",
      dropdown: "text-blue-600",
    },
    white: {
      text: "text-white",
      hover: "hover:text-gray-200",
      dropdown: "text-blue-600",
    },
    gray: {
      text: "text-gray-700",
      hover: "hover:text-gray-900",
      dropdown: "text-gray-700",
    },
    black: {
      text: "text-black",
      hover: "hover:text-gray-700",
      dropdown: "text-black",
    },
  };

  const { text, hover, dropdown } = colorMap[color];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className={`flex items-center ${text} ${hover} transition-colors duration-200`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-label="Switch language"
      >
        <Globe className="w-5 h-5 mr-1" />
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <button
            className={`flex items-center w-full ${dropdown} px-4 py-2 text-sm ${
              locale === "en"
                ? "font-bold bg-gray-50 border-l-2 border-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => switchLocale("en")}
            disabled={isPending}
          >
            <img src="/icons/ca.svg" className="h-4 w-4 mr-2" alt="English" />
            <span>English</span>
          </button>
          <button
            className={`flex items-center w-full ${dropdown} px-4 py-2 text-sm ${
              locale === "vi"
                ? "font-bold bg-gray-50 border-l-2 border-blue-600"
                : "hover:bg-gray-100"
            }`}
            onClick={() => switchLocale("vi")}
            disabled={isPending}
          >
            <img
              src="/icons/vi.svg"
              className="h-4 w-4 mr-2"
              alt="Vietnamese"
            />
            <span>Tiếng Việt</span>
          </button>
        </div>
      )}
    </div>
  );
}
