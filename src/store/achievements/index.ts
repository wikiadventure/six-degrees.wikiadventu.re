import { useStorage } from '@vueuse/core';
import { Lang, currentLang } from '../../i18n';
import { onUnmounted } from 'vue';
import { removeItem } from '../../utils/index';

export enum Achievement {
    Godwin,
    AbsoluteZero,
    Hot,
    OverHeat,
    KevinBacon
}

export type AchievementKey = keyof typeof Achievement;

const defaultAchivements = (Object.keys(Achievement) as Array<keyof typeof Achievement>)
                                .reduce<Record<AchievementKey, number>>((o,v,i)=>
                                    Object.assign(o, {
                                        [v]: 0
                                    })
                                , {} as any)

export const Achievements = useStorage("achievements", defaultAchivements)

const subs:((a:AchievementKey)=>void)[] = []

export function achieve(a:Achievement) {
    console.log("JaaJ");
    Achievements.value[Achievement[a] as AchievementKey]++;
    subs.forEach(cb=>cb(Achievement[a] as AchievementKey));
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
    if (godwinIdMap[currentLang.value].includes(endId)) achieve(Achievement.Godwin);
}

export function useAchievement() {
    const unsubs:(()=>void)[] = []
    function subscribe(cb:(a:AchievementKey)=>void) {
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
        unsubs.forEach(cb=>cb());
    }
    onUnmounted(() => {
        unsubscribeAll()
    })

    return {
        subscribe
    }
}