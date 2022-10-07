import { ref, reactive, watch, computed, nextTick } from 'vue';
import { Lang, i18n, currentLang } from '../../i18n';
import { loadPreview } from '../wiki/actions';

export const isFetching = ref(false);

export const wiki = reactive<SearchStore>({
    search: {
        start: {
            input: "",
            id: "",
            title: ""
        },
        end: {
            input: "",
            id: "",
            title: ""
        }
    },
    result : {
        start: {
            id: "",
            title: ""
        },
        end: {
            id: "",
            title: ""
        },
        paths: [],
        idToTitle: {},
        time: -1
        
    }
})

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

export function swapSearch() {
    console.log("before : ", wiki.search);
    const s = wiki.search;
    // [s.start, s.end] = [s.end, s.start];
    [s.start.input, s.end.input] = [s.end.input, s.start.input];
    [s.start.id, s.end.id] = [s.end.id, s.start.id];
    [s.start.title, s.end.title] = [s.end.title, s.start.title];
    [s.start.thumbnail!.height, s.end.thumbnail!.height] = [s.end.thumbnail?.height!, s.start.thumbnail?.height!];
    [s.start.thumbnail!.width, s.end.thumbnail!.width] = [s.end.thumbnail?.width!, s.start.thumbnail?.width!];
    [s.start.thumbnail!.source, s.end.thumbnail!.source] = [s.end.thumbnail?.source!, s.start.thumbnail?.source!];
    [s.start.description, s.end.description] = [s.end.description, s.start.description];
    console.log("after : ", wiki.search);
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
    description?: string,
    thumbnail?: {
        source: string,
        width: number,
        height: number
    } 
}

type AvailableLang = 
    Lang.eo;