"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Globe } from "lucide-react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-white"
        onClick={() => setDropdownOpen(!dropdownOpen)}
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
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
          <button
            className={`block w-full text-left text-blue-700 px-4 py-2 text-sm ${
              locale === "en" ? "font-bold" : ""
            }`}
            onClick={() => switchLocale("en")}
            disabled={isPending}
          >
            English
          </button>
          <button
            className={`block w-full text-left text-blue-700 px-4 py-2 text-sm ${
              locale === "vi" ? "font-bold" : ""
            }`}
            onClick={() => switchLocale("vi")}
            disabled={isPending}
          >
            Tiếng Việt
          </button>
        </div>
      )}
    </div>
  );
}
