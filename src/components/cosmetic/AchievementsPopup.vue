<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { achieve, Achievements, all_achievements, useAchievement } from '../../store/achievements';
import OverHeat from '../achievements/six-degree/OverHeat.vue';
import Over9000 from '../achievements/six-degree/Over9000.vue';
import Hot from '../achievements/six-degree/Hot.vue';
import AbsoluteZero from '../achievements/six-degree/AbsoluteZero.vue';
import Godwin from '../achievements/six-degree/Godwin.vue';
import { SixDegreeAchievementId } from 'db-wikiadventu-re/types/surreal/query/getAccountOrCreate/six_degree';

const { t } = useI18n({ useScope: 'local' });

const achievements = ref<HTMLDivElement>();
const { subscribe } = useAchievement();

// By default all achievement are not visible
const defaultDisplay = 
    all_achievements
        .reduce<Record<SixDegreeAchievementId, boolean>>((o,v,i)=>
            Object.assign(o, {
                [v]: false
            })
        , {} as any)

const isDisplayed = reactive<Record<SixDegreeAchievementId, Boolean>>(defaultDisplay);


subscribe((a:SixDegreeAchievementId)=>{
    // const n = Achievements.value[a];
    isDisplayed[a] = true;
    setTimeout(() => isDisplayed[a] = false, 15000);
});
</script>
<template>
    <div achievements-popup ref="achievements">
        <OverHeat v-if="isDisplayed.OverHeat"/>
        <Over9000 v-if="isDisplayed.Over9000"/>
        <Hot v-if="isDisplayed.Hot"/>
        <AbsoluteZero v-if="isDisplayed.AbsoluteZero"/>
        <Godwin v-if="isDisplayed.Godwin"/>
    </div>
</template>
<style >

[achievements-popup] {
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px 0;
    z-index: 10;
    .achievement-description {
        display: none;
    }
}

</style>