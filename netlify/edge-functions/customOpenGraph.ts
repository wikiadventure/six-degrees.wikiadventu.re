import { Context } from "netlify:edge";

const langs = {
    en : "Shortest path between...",//English
    fr : "Chemin le plus court entre...",//French
    de : "Kürzester Weg zwischen...",//German
    it : "Il percorso più breve tra...",//Italian
    eo : "Plej mallonga vojo inter...",//Esperanto
} as const;
  
const langsKey = Object.keys(langs);

type LangType = typeof langs;

export default async (req: Request, ctx: Context) => {
    // console.log("req", req);
    const res:Response = await ctx.next();
    // if (res.headers.get("content-type") != "text/html") return res;
    const url = new URL(req.url);
    const p = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
    // console.log("res url p", res, url, p);
    const [, lang, startS, endS, ...rest] = p.split(/\//);
    // console.log("lang startS endS  ...rest", lang, startS, endS, ...rest);
    if (rest.length > 0) return res;
    if (!langsKey.includes(lang)) return res;

    const [start, end] = [parseInt(startS), parseInt(endS)];
    // console.log("start end", start, end);
    if (!(start > 0 && end > 0)) return res;

    // @ts-ignore
    const description = langs[lang];
    // const ogUrl = `https://og-six-degrees.wikiadventu.re/api/og?lang=${lang}&start=${start}&end=${end}`;
    const ogUrl = 'https://picsum.photos/1200/630';
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
    // console.log("updated", updated);
    const newRes = new Response(updated);
    console.log("old : ", res);
    console.log("new : ", newRes);
    return newRes;
};
