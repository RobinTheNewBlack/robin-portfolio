import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "th"], // supported locales
  defaultLocale: "en", // default locale
  localePrefix: "always", // always prefix locale in URLs
});
