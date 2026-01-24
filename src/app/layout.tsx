import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eki Zulfar Rachman | Frontend Developer",
  description: "Portfolio website of Eki Zulfar Rachman - Frontend Developer and Network & Telecom Student. Creating innovative, functional, and user-friendly websites for digital solutions.",
  keywords: ["Frontend Developer", "Web Developer", "React", "Next.js", "Portfolio"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
