import { I18n } from "i18n-js";
import translation_en_us from "./lang/en_us.json";

export const i18n = new I18n({
    "en-US": translation_en_us
});

i18n.locale = "en-US";
i18n.defaultLocale = "en-US";
i18n.enableFallback = true;
