import { nextTick, watch } from 'vue';
import { currentLang } from '../../i18n';
import { fetchAllShortestPaths, wiki } from '../../store/search';
import { loadPreview } from '../../store/wiki/actions';
import { useAuth } from '../auth';

export function useRoute() {

    const { userManager } = useAuth();

    if (window.location.pathname == "/callback") {
        userManager.signinPopupCallback(window.location.href);
    }

    async function updateRoute(lang:string, start:number, end:number) {
        await nextTick();
        const query = start > 0 && end > 0 ? `${start}/${end}` : '';
        history.pushState({}, "", `/${lang}/${query}`);
    }

    const [_, _lang, startS, endS, ...rest] = window.location.pathname.split("/");
    const [start, end] = [parseInt(startS), parseInt(endS)];
    if (start > 0 && end > 0) {
        wiki.search.start.id = start;
        wiki.search.end.id = end;
        loadPreview([start, end]);
        fetchAllShortestPaths();
        if (rest.length > 0) updateRoute(currentLang.value, start, end);
    } else {
        updateRoute(currentLang.value, wiki.result.start, wiki.result.end);
    }

    watch(currentLang, async (o,v) => {
        updateRoute(v, wiki.result.start, wiki.result.end);
    })

    watch(wiki.result, async (o,v) => {
        updateRoute(currentLang.value, v.start, v.end);
    })

}