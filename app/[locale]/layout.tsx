import "@/app/globals.css";
import "@/app/styles/carousel.css";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import type React from "react";
import { metadata } from "./metadata";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import ThemeHandler from "@/app/components/ThemeHandler";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="light dark:dark">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />
        {metadata.additionalMetaTags.map((tag, index) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeHandler />
          <Header />
          <main className="min-h-screen pt-32 sm:pt-24">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
