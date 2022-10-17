import { ref, reactive, watch, computed, nextTick } from 'vue';
import { Lang, i18n, currentLang } from '../../i18n';
import { loadPreview } from '../wiki/actions';

export const isFetching = ref(false);

export const initial = ():SearchStore => ({
    search: {
        start: -1,
        startInput: "",
        end: -1,
        endInput: ""
    },
    result : {
        start: -1,
        end: -1,
        time: -1,
        paths: []
    },
    previewMap: new Map(),
})

export const wiki = reactive<SearchStore>(initial());

export async function fetchAllShortestPaths() {
    isFetching.value = true;
    wiki.result.start = wiki.search.start;
    wiki.result.end = wiki.search.end;
    wiki.result.time = -1;
    wiki.result.paths = [];
    try {
        const data:SearchResult = await fetch(`https://${i18n.global.locale.value}wiki-graph-serverless-lfpojybovq-od.a.run.app/all-shortest-path/${wiki.search.start}/to/${wiki.search.end}`)
                                        .then(r=>r.json());
        wiki.result.paths = data.paths;
        wiki.result.time = data.time;
        isFetching.value = false;
        const idSet = new Set<number>();
        for (const path of wiki.result.paths!) {
            for (const id of path) {
                idSet.add(id);
            }
        }
        loadPreview(Array.from(idSet))
        await nextTick();
        document.querySelector('[search-result]')?.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    } catch(e) {
        isFetching.value = false;
    }
}
export const searchResult = ref<SearchResult>();

export function useAllShortestPaths() {
    return {
        fetch: fetchAllShortestPaths,
        isFetching,
        result: wiki.result
    }
}

watch(currentLang, v => {
    
    const assign = (from:any, to:any) => {
        for (const [k,e] of Object.entries(from)) {
            console.log({k,e})
            typeof e === 'object'
            ? Array.isArray(e)
                ? to[k] = e
                : e != null 
                    && assign(e, to[k])
            : ['string','number','bigint'].includes(typeof e) 
                && (to[k] = e)
        }
    }
    assign(initial(), wiki);
});

/**
 * Swap the end with the start
 */
export function swapSearch() {
    const s = wiki.search;
    [s.start, s.end] = [s.end, s.start];
}

export const wikiUrl = computed(()=>`https://${currentLang.value}.wikipedia.org/wiki/`);

type SearchResult = {
    time: number,
    idToTitle:{ [id: string]: string },
    paths:number[][]
}

type SearchStore = {
    search: {
        start: number,
        end: number,
        startInput: string,
        endInput: string
    },
    result: {
        start:number,
        end:number,
        time:number,
        paths:number[][]
    },
    previewMap: Map<number, WikiPage>
}

export type WikiPage = {
    title: string,
    description: string | null,
    thumbnail: {
        source: string,
        width: number,
        height: number
    } | null
}
