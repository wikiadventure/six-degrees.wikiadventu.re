import { i18n } from "../../i18n";
import { wikiHeaders, WikiPreviewResponse } from "./type";
import { wiki } from '../search';

export async function loadSuggestions(input:string, n = 5) {
    const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
    url.search = new URLSearchParams({
      action: 'query',
      format: 'json',
      formatversion: "2",
      gpssearch: input,
      generator: 'prefixsearch',
      prop: 'pageprops|pageimages|pageterms',
      redirects: '1', // Automatically resolve redirects
      ppprop: 'displaytitle',
      piprop: 'thumbnail',
      pithumbsize: '160',
      pilimit: '30',
      wbptterms: 'description',
      gpslimit: n.toString(), // Return at most five results
      origin: '*',
    }).toString();
    const response:WikiPreviewResponse = await fetch(url.toString(), { headers: wikiHeaders })
      .then((r) => r.json())
      .catch((error) => {
        console.log(error);
      });
    if (typeof response?.query?.pages === 'undefined') return [];
    for (const p of response.query.pages) {
        wiki.wikiPreviewMap.set(p.pageid, {
          title: p.title,
          description: p.description,
          thumbnail: p.thumbnail
        })
    }
    return response.query.pages
      .sort((a,b) => a.index-b.index)
      .map(p=>p.pageid);
}

export async function loadPreview(pageIds:number[]) {
  const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
  url.search = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "description|pageimages|pageviews",
    generator: "search",
    piprop: "thumbnail",
    pvipdays: "7",
    pageids: pageIds.slice(0,50).join('|'),
    redirects: "1", // Automatically resolve redirects
  }).toString();
  const response:WikiPreviewResponse = await fetch(url.toString(), { headers: wikiHeaders })
    .then((r) => r.json())
    .catch((error) => {
      console.log(error);
    });
  if (typeof response?.query?.pages === 'undefined') return [];
  for (const p of response.query.pages) {
      wiki.wikiPreviewMap.set(p.pageid, {
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail
      })
  }
}

