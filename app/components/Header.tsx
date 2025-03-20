"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Home, ShoppingBag, Search, X, Users, Phone } from "lucide-react";
import Image from "next/image";
import { CDN_HOST } from "@/app/constants";
import LocaleSwitcher from "./LocaleSwitcher";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

export default function Header() {
  const t = useTranslations("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: t("home"), href: "/", icon: Home },
    { name: t("products"), href: "/products", icon: ShoppingBag },
    { name: t("search"), href: "/search", icon: Search },
    { name: t("about"), href: "/about", icon: Users },
    { name: t("contact"), href: "/contact", icon: Phone },
  ];

  // Check if the current path matches the nav item's href
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add animation logic
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (mobileMenuOpen) {
      // Get the scroll height to use for the animation
      const height = mobileMenu.scrollHeight;

      // Start with 0 height and opacity
      mobileMenu.style.height = "0px";
      mobileMenu.style.opacity = "0";

      // Force a reflow
      void mobileMenu.offsetHeight;

      // Apply transitions
      mobileMenu.style.height = `${height}px`;
      mobileMenu.style.opacity = "1";
    } else {
      // Only apply if the element exists in the DOM
      if (mobileMenu.style) {
        mobileMenu.style.height = "0px";
        mobileMenu.style.opacity = "0";
      }
    }
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-md shadow-blue-900/30 fixed top-0 left-0 w-full z-30 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Switch to flex layout on mobile and tablet, grid on desktop (lg) */}
        <div className="flex lg:grid lg:grid-cols-5 items-center h-16 justify-between">
          {/* Logo on the left */}
          <div className="flex-shrink-0 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src={`${CDN_HOST}/data/blue_nav_logo.png`}
                alt="Logo"
                width={450}
                height={150}
                className="w-auto h-8"
              />
            </Link>
          </div>

          {/* Navigation in the center - desktop only (lg and up) */}
          <div className="hidden lg:flex justify-center lg:col-span-3">
            <nav className="flex-1 max-w-md">
              <ul className="flex justify-between w-full">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.name} className="whitespace-nowrap">
                      <Link
                        href={item.href}
                        className={`flex items-center px-2.5 py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200 ${
                          active
                            ? "border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                            : ""
                        }`}
                      >
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right side with locale switcher & mobile menu button */}
          <div className="flex items-center justify-end gap-4 lg:col-span-1">
            {/* Mobile navigation toggle & locale switcher */}
            <LocaleSwitcher color="blue" />
            <button
              className="lg:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu with animations - show on smaller than lg screens */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            !mobileMenuOpen
              ? "invisible"
              : "visible border-t border-gray-200 dark:border-gray-800"
          }`}
          style={{ height: 0, opacity: 0 }}
        >
          <div className="py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 ${
                      active
                        ? "text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800 border-l-2 border-blue-600 dark:border-blue-400"
                        : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
