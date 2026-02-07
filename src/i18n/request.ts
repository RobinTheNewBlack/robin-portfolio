import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// After the proxy redirects to /en/
// or /th/ based on the user's preferred language,
// getRequestConfig receives { requestLocale } — the locale extracted from the URL segment by the proxy
// Dynamically imports the correct translation file (en.json or th.json)
// and returns the locale and messages to the Next.js app
export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as "en" | "th")) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default,
    };
});
