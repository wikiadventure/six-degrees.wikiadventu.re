import { i18n } from "../../i18n";
import { wikiHeaders, WikiPreviewResponse, WikiRawPreview } from './type';
import { wiki } from '../search';
import { wikiPreviewMapChange } from '../search/onMapChange';


let abortSuggestions = new AbortController();
export async function loadSuggestions(input:string, n = 5) {
  abortSuggestions.abort();
  abortSuggestions = new AbortController();
  const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
  url.search = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    gpssearch: input,
    generator: "prefixsearch",
    prop: "description|pageimages|pageviews",
    redirects: "1", // Automatically resolve redirects
    piprop: "thumbnail",
    pithumbsize: "160",
    pilimit: "30",
    gpslimit: n.toString(), // Return at most five results
    origin: "*",
  }).toString();
  try {
    const response:WikiPreviewResponse = await fetch(url.toString(), { headers: wikiHeaders, signal: abortSuggestions.signal })
      .then((r) => r.json())
    if (typeof response?.query?.pages === 'undefined') return [];
    addToPreviewMap(response.query.pages);
    return response.query.pages
      .sort((a,b) => a.index-b.index)
      .map(p=>p.pageid);
  } catch (e) {
    return null
  }
}

export async function loadPreview(pageIds:number[]) {
  const newIds = pageIds.filter(id=>wiki.previewMap.get(id)?.description == null).slice();
  const promiseRest = newIds.length > 50 ? loadPreview(newIds.slice(50)) : Promise.resolve();
  const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
  url.search = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "description|pageimages|pageviews",
    piprop: "thumbnail",
    pithumbsize: "160",
    pvipdays: "7",
    pageids: newIds.slice(0,50).join("|"),
    redirects: "1", // Automatically resolve redirects
    origin: "*"
  }).toString();
  try {
    const response:WikiPreviewResponse = await fetch(url.toString(), { headers: wikiHeaders })
      .then((r) => r.json())
    if (typeof response?.query?.pages !== 'undefined') {
      await new Promise((res,rej)=>setTimeout(res,5000))
      addToPreviewMap(response.query.pages);
    }
  } catch(e) {
  }
  await promiseRest;
}

function addToPreviewMap(pages:WikiRawPreview[]) {
  for (const p of pages) {
    wiki.previewMap.set(p.pageid, {
      title: p.title,
      description: p.description,
      thumbnail: p.thumbnail
    })
  }
  wikiPreviewMapChange();
}

