import { useStorage } from '@vueuse/core';
import { Lang, currentLang } from '../../i18n';
import { onUnmounted } from 'vue';
import { removeItem } from '../../utils';
import { account } from '../../composables/auth';
import { apiClient } from '../../composables/db';
// import type { SixDegreeAchievementId } from 'db-wikiadventu-re/types/surreal/query/getAccountOrCreate/six_degree';
import type { SixDegreeAchievementId } from 'db-wikiadventu-re/types/surreal/query/getAccountOrCreate/six_degree';


export const all_achievements:SixDegreeAchievementId[] = ["AbsoluteZero", "Godwin", "Hot", "Over9000", "OverHeat"];

const defaultAchivements = 
    all_achievements
        .reduce<Record<SixDegreeAchievementId, number>>((o,v,i)=>(
            typeof v != 'number' ?
            Object.assign(o, {[v]: 0}): o)
        , {} as any)

export const Achievements = useStorage("achievements", defaultAchivements);

export function achieve(a:SixDegreeAchievementId) {
    if (account.six_degree.achievements.find(a=>a.id) != null) {
        account.six_degree.achievements.push({
            id: a,
            date: new Date().toUTCString()
        });
        // apiClient.achieve[':achievement'].$post({param:{achievement:}})
    }
    subs.forEach(c=>c(a));
    // .value[Achievement[a] as AchievementKey]++;
    // subs.forEach(cb=>cb(Achievement[a] as AchievementKey));
}

export function checkGodwin(endId:number) {
    const godwinIdMap:Record<Lang, number[]> = {
        // page id of Adolf Hitler and Shoah for all lang
        en: [2731583,   10396793],
        fr: [1696582, 4013722],
        de: [194,     705245],
        it: [2970565, 2714103],
        eo: [17679,   31262]
    }
    if (godwinIdMap[currentLang.value].includes(endId)) achieve("Godwin");
}

const subs:((a:SixDegreeAchievementId)=>void)[] = []

export function useAchievement() {
    const unsubs:(()=>void)[] = []
    function subscribe(cb:(a:SixDegreeAchievementId)=>void) {
        subs.push(cb);
        const unsub = () => {
            removeItem(subs, cb);
            removeItem(unsubs, unsub);
        }
        unsubs.push(unsub);
        return {
            unsub
        }
    }
    function unsubscribeAll() {
        unsubs.forEach(unsub=>unsub());
    }
    onUnmounted(() => {
        unsubscribeAll()
    })

    return {
        subscribe
    }
}