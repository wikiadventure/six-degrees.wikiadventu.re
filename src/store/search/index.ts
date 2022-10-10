import { ref, reactive, watch, computed, nextTick } from 'vue';
import { Lang, i18n, currentLang } from '../../i18n';
import { loadPreview } from '../wiki/actions';

export const isFetching = ref(false);

export const initial = () => ({
    search: {
        start: {
            input: "",
            id: "",
            title: "",
            description: null,
            thumbnail: {
                source: null,
                width: null,
                height: null
            }
        },
        end: {
            input: "",
            id: "",
            title: "",
            description: null,
            thumbnail: {
                source: null,
                width: null,
                height: null
            }
        }
    },
    result : {
        start: {
            id: "",
            title: "",
            description: null,
            thumbnail: {
                source: null,
                width: null,
                height: null
            }
        },
        end: {
            id: "",
            title: "",
            description: null,
            thumbnail: {
                source: null,
                width: null,
                height: null
            }
        },
        paths: [],
        idToTitle: {},
        time: -1
        
    }
})

export const wiki = reactive<SearchStore>(initial());


export async function fetchAllShortestPaths() {
    isFetching.value = true;
    wiki.result.start = wiki.search.start;
    wiki.result.end = wiki.search.end;
    wiki.result.time = -1;
    wiki.result.idToTitle = {};
    wiki.result.paths = [];
    try {
        const data:SearchResult = await fetch(`https://${i18n.global.locale.value}wiki-graph-serverless-lfpojybovq-od.a.run.app/all-shortest-path/${wiki.search.start.id}/to/${wiki.search.end.id}`)
                                        .then(r=>r.json());
        wiki.result.paths = data.paths;
        wiki.result.idToTitle = {};
        // @ts-ignore
        Object.entries(data.idToTitle).forEach(([k,v])=>wiki.result.idToTitle![k] = {
            title: v.replaceAll(/_/g, " ")
        });
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

watch(currentLang, v=>{
    const s = wiki.search.start;
    s.input = "";
    s.id = "";
    s.title = "";
    s.thumbnail = undefined;
    s.description = undefined;

    const e = wiki.search.end;
    e.input = "";
    e.id = "";
    e.title = "";
    e.thumbnail = undefined;
    e.description = undefined;

    const r = wiki.result;

    const rs = r.start;
    rs.id = "";
    rs.title = "";
    rs.thumbnail = undefined;
    rs.description = undefined;

    const re = r.end;
    re.id = "";
    re.title = "";
    re.thumbnail = undefined;
    re.description = undefined;

    r.time = -1;
    r.idToTitle = {};
    r.paths = [];
});

/**
 * Swap the end with the start
 */
export function swapSearch() {
    const ss = wiki.search.start;
    const se = wiki.search.start;
    const sst = ss.thumbnail;
    const set = se.thumbnail;
    [ss.input, se.input] = [se.input, ss.input];
    [ss.id, se.id] = [se.id, ss.id];
    [ss.title, se.title] = [se.title, ss.title];
    [sst.height, set.height] = [set.height, sst.height];
    [sst.width, set.width] = [set.width, sst.width];
    [sst.source, set.source] = [set.source, sst.source];
    [ss.description, se.description] = [se.description, ss.description];
}

export const wikiUrl = computed(()=>`https://${currentLang.value}.wikipedia.org/wiki/`);

type SearchResult = {
    time: number,
    idToTitle:{ [id: string]: string },
    paths:number[][]
}

type SearchStore = {
    search: {
        start:WikiPage & {input:string},
        end:WikiPage & {input:string},
    }
    result: {
        start:WikiPage,
        end:WikiPage,
        time:number,
        paths:number[][],
        idToTitle:{ [id: string]: Omit<WikiPage, "id"> }
    }
}

export type WikiPage = {
    id: string,// number as string
    title: string,
    description: string | null,
    thumbnail: {
        source: string | null,
        width: number | null,
        height: number | null
    } 
}
