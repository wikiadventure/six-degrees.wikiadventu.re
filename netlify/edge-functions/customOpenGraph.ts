import type { Context } from "@netlify/edge-functions";

const langs = {
    en : "Shortest path between...",//English
    fr : "Chemin le plus court entre...",//French
    de : "Kürzester Weg zwischen...",//German
    it : "Il percorso più breve tra...",//Italian
    eo : "Plej mallonga vojo inter...",//Esperanto
} as const;
  
const langsKey = Object.keys(langs);

export default async (req: Request, ctx: Context) => {
    const res:Response = await ctx.next();
    if (!res.headers.get("content-type")?.startsWith("text/html")) return res;
    const url = new URL(req.url);
    const p = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    const [, lang, startS, endS, ...rest] = p.split(/\//);
    if (rest.length > 0) return res;
    if (!langsKey.includes(lang)) return res;

    const [start, end] = [parseInt(startS), parseInt(endS)];
    if (!(start > 0 && end > 0)) return res;
    // @ts-ignore
    const description = langs[lang];
    const ogUrl = `https://og-six-degrees.wikiadventu.re/api/og?lang=${lang}&start=${start}&end=${end}`;
    const page = await res.text();
    
    const updated = page.replace('<!--OpenGraph-->',/*html*/`
    <meta name="twitter:card" content="summary_large_image" >
    <meta name="twitter:site" content="@adventure_wiki" >
    <meta name="twitter:title" content="Six Degrees of Wiki Adventure" >
    <meta name="twitter:description" content="${description}" >
    <meta name="twitter:image" content="${ogUrl}">
    <meta name="twitter:image:alt" content="Thumbnail from Wikipédia" >
    <meta property="og:type" content="website" >
    <meta property="og:title" content="Six Degrees of Wiki Adventure" >
    <meta property="og:description" content="${description}" >
    <meta property="og:image" content="${ogUrl}" >
    <meta property="og:image:alt" content="Thumbnail from Wikipédia" >
    `)
    const newRes = new Response(updated, res);
    newRes.headers.delete("content-length");
    return newRes;
};
