import { onBeforeUnmount } from "vue";

export const listeners:(()=>void)[] = [];

export function useWikiPreviewMapChange(listener:()=>void) {
    onWikiPreviewMapChange(listener);

    onBeforeUnmount(()=>{
        listeners.splice(
            listeners.findIndex(v=>v===listener),
            1
        )  
    })
}

export function onWikiPreviewMapChange(listener:()=>void) {
    listeners.push(listener);
}

export function wikiPreviewMapChange() {
    listeners.forEach(l=>l());
}