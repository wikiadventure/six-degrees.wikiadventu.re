import { hc } from "hono/client";
import { currentLang } from "../../i18n";
import type { db_wikiadventu_re } from "db-wikiadventu-re/types/client";

export const apiClient = hc(import.meta.env.VITE_API_DB_URL, {
    fetch: (input, init) => fetch(input, {
        ...init,
        headers: new Headers({
            "Accept-Language": currentLang.value,
            ...init?.headers
        }),
        credentials: "include",
    }).then(r=> {
        if (r.status >= 200 && r.status < 300) return r;
        throw r;
    })
}) as unknown as (typeof db_wikiadventu_re);