import { useStorage } from '@vueuse/core';

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

const Achievements = useStorage("achievements", defaultAchivements)

export function achieve(k:Achievement) {
    Achievements.value[Achievement[k] as AchievementKey]++;
}
