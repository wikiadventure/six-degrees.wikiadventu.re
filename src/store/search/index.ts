import { ref, reactive, watch, computed, nextTick } from 'vue';
import { i18n, currentLang } from '../../i18n';
import { loadPreview } from '../wiki/actions';
import { checkGodwin, achieve } from '../achievements/index';

export const isFetching = ref(false);

export const initial = ():SearchStore => ({
    search: {
        start: {
            id: -1,
            input: ""
        },
        end: {
            id: -1,
            input: ""
        }
    },
    result : {
        start: -1,
        end: -1,
        time: -1,
        paths: []
    },
    degree: 2,
    previewMap: new Map(),
    visiblePathCount: 20
})

export const wiki = reactive<SearchStore>(initial());

export async function fetchAllShortestPaths() {
    wiki.result.start = wiki.search.start.id;
    wiki.result.end = wiki.search.end.id;
    wiki.result.time = -1;
    wiki.result.paths = [];
    if (wiki.result.start == wiki.result.end) {
        wiki.result.time = 0;
        wiki.degree = 0;
        wiki.result.paths.push([]);
        achieve("AbsoluteZero");
        return;
    }
    isFetching.value = true;
    try {
        const data:SearchResult = await fetch(`https://${i18n.global.locale.value}wiki-rust-graph-serverless-681973942252.europe-west9.run.app/all-shortest-path/${wiki.search.start.id}/to/${wiki.search.end.id}`)
                                        .then(r=>r.json());

        const pages_ids = new Set(data.paths.flat());
        wiki.result.paths = data.paths.map(p=>p.map(i=>Number(i)));
        wiki.result.time = data.time_spent_ms;
        isFetching.value = false;

        setTimeout(() => checkGodwin(wiki.result.end), 2000);

        wiki.degree = data.shortest_path_length - 1;

        if (wiki.degree == 6) setTimeout(() => achieve("Hot"), 5000);
        if (wiki.degree > 6) setTimeout(() => achieve("OverHeat"), 5000);
        // if (wiki.result.paths.length == 42) setTimeout(() => achieve(Achievement.FourtyTwo), 5000);
        if (wiki.result.paths.length > 9000) setTimeout(() => achieve("Over9000"), 5000);

        for (const id of pages_ids.keys()) {
            if (wiki.previewMap.get(id)==null) wiki.previewMap.set(id, { loading: true });
        }
        loadVisiblePathPreviews();
    } catch(e) {
        isFetching.value = false;
    }
}

export async function loadVisiblePathPreviews() {
    const idSet = new Set<number>();
    for (const [i, path] of wiki.result.paths.entries()) {
        if (i > wiki.visiblePathCount) break;
        for (const id of path) {
            idSet.add(id);
        }
    }
    loadPreview(Array.from(idSet))
}

watch(currentLang, v => {
    
    const assign = (from:any, to:any) => {
        for (const [k,e] of Object.entries(from)) {
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
    // idToTitle:{ [id: string]: string },
    time_spent_ms: number,
    num_paths: number,
    shortest_path_length: number
    paths:number[][]
}

type SearchStore = {
    search: {
        start: {
            id: number,
            input: string
        },
        end: {
            id: number,
            input: string
        },
    },
    result: {
        start:number,
        end:number,
        time:number,
        paths:number[][]
    },
    degree: number,
    previewMap: Map<number, WikiPage>,
    visiblePathCount: number
}

export type WikiPage = {
    title: string,
    description: string | null,
    thumbnail: WikiThumbnail | null,
    loading?: undefined,
} | {
    title?: string,
    description?:undefined,
    thumbnail?: undefined,
    loading: true,
};

export type WikiThumbnail = {
    source: string,
    width: number,
    height: number
}
