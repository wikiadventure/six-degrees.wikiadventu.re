import { computed, Ref } from 'vue';

export function useMinutesSecondes(time:Ref<number|undefined>) {
    const formatedTime = computed(()=>{
        const date = new Date(time.value??0);
        const m = date.getMinutes();
        const s = date.getSeconds();
        const t = date.getMilliseconds();
        return `${m?m+'m ':''}${s?s+'s ':''}${t}ms`;
    })
    return {
        formatedTime
    }
}