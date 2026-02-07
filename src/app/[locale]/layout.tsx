import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "@/styles/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Readonly<Props>) {
  // Receives params.locale from the [locale] URL segment
  const { locale } = await params;

  // Validates the locale (returns 404 for invalid ones like /fr/)
  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound();
  }
  // Calls getMessages() to load translations in json format
  const messages = await getMessages();

  return (
    // Wraps children in NextIntlClientProvider (makes translations available to all client components)
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </NextIntlClientProvider>
  );
}
