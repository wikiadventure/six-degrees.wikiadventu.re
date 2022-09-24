import { ref, reactive, watch, computed } from 'vue';
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
    wiki.search.start.input = "";
    wiki.search.start.id = "";
    wiki.search.start.title = "";
    wiki.search.start.thumbnail = undefined;
    wiki.search.start.description = undefined;

    wiki.search.end.input = "";
    wiki.search.end.id = "";
    wiki.search.end.title = "";
    wiki.search.end.thumbnail = undefined;
    wiki.search.end.description = undefined;

    wiki.result.start.id = "";
    wiki.result.start.title = "";
    wiki.result.start.thumbnail = undefined;
    wiki.result.start.description = undefined;

    wiki.result.end.id = "";
    wiki.result.end.title = "";
    wiki.result.end.thumbnail = undefined;
    wiki.result.end.description = undefined;

    wiki.result.time = -1;
    wiki.result.idToTitle = {};
    wiki.result.paths = [];
});

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