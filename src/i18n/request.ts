import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export const DEFAULT_LOCALE = "en";

export default getRequestConfig(async () => {
    const locale = (await cookies()).get("next_locale")?.value || DEFAULT_LOCALE;

    return {
        locale,
        messages: (await import(`@/i18n/messages/${locale}.json`)).default,
    };
});
