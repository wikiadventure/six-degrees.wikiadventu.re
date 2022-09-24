import { i18n, Lang } from "../../i18n";
import { wikiHeaders, WikiRawSuggestion, WikiSuggestion } from "./type";
import { WikiPage, wiki } from '../search';

export async function loadSuggestions(input:string, n = 5) {
    const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
    url.search = new URLSearchParams({
      action: 'query',
      format: 'json',
      gpssearch: input,
      generator: 'prefixsearch',
      prop: 'pageprops|pageimages|pageterms',
      redirects: '1', // Automatically resolve redirects
      ppprop: 'displaytitle',
      piprop: 'thumbnail',
      pithumbsize: '160',
      pilimit: '30',
      wbptterms: 'description',
      gpsnamespace: "0", // Only return results in Wikipedia's main namespace
      gpslimit: n.toString(), // Return at most five results
      origin: '*',
    }).toString();
    const response = await fetch(url.toString(), { headers: wikiHeaders })
    .then((r) => r.json())
    .catch((error) => {
      console.log(error);
    })
    const suggestions:WikiSuggestion[] = [];
    if (typeof response?.query?.pages === 'undefined') return suggestions;
    for (const page of Object.values(response.query.pages) as WikiRawSuggestion[]) {
      if ( page.ns === 0 ) {
        suggestions.push({
          index: page.index,
          id: page.pageid+"",
          title: page.title,
          description: page?.terms?.description[0],
          thumbnail: page?.thumbnail
        });
      }
    }
    suggestions.sort((a,b) => a.index-b.index);
    return suggestions;
}

export async function loadPreview(pageIds:number[]) {
  const url = new URL(`https://${i18n.global.locale.value}.wikipedia.org/w/api.php`);
  url.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    pageids: pageIds.slice(0,50).join('|'),
    prop: 'pageprops|pageimages|pageterms',
    redirects: '1', // Automatically resolve redirects
    ppprop: 'displaytitle',
    piprop: 'thumbnail',
    pithumbsize: '160',
    pilimit: '30',
    wbptterms: 'description',
    origin: '*',
  }).toString();
  const response = await fetch(url.toString(), { headers: wikiHeaders })
  .then((r) => r.json())
  .catch((error) => {
    console.log(error);
  })
  const suggestions:Omit<WikiPage, "id">[] = [];
  if (typeof response?.query?.pages === 'undefined') return suggestions;
  for (const page of Object.values(response.query.pages) as WikiRawSuggestion[]) {
    wiki.result.idToTitle![page.pageid] = {
      title: page.title,
      description: page?.terms?.description[0],
      thumbnail: page?.thumbnail
    };
  }
}

