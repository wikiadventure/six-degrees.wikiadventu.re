<script lang="ts" setup>
import preview from "../wiki/WikiPreview.vue";
import { wiki } from '../../store/search';
import { useI18n } from 'vue-i18n';
import { useMinutesSecondes } from '../../composables/time';
import { toRefs } from '@vueuse/core';
import { onUpdated } from 'vue';
import { computed, ref } from '@vue/reactivity';
import { wikiUrl } from '../../store/search/index';
import Thermometer from "../cosmetic/Thermometer.vue";

const { t } = useI18n({ useScope: 'local' });

const { result, visiblePathCount } = wiki;

const { formatedTime } = useMinutesSecondes(toRefs(wiki.result).time!);

const previewFromMap = (id:number) => wiki.previewMap.get(id);

const start = computed(()=>previewFromMap(result.start));
const end   = computed(()=>previewFromMap(result.end  ));

const toUrl = (t?:string) => wikiUrl.value + t?.replaceAll(" ", "_");

const root = ref<HTMLElement | null>(null);

onUpdated(() => {
    setTimeout(
        ()=>root.value?.scrollIntoView({ block: 'start',  behavior: 'smooth' }),
        1000
    )
})
</script>
<template>
    <section search-result ref="root" v-if="result.paths.length > 0 && start != null && end !=null">
        <i18n-t keypath="description" tag="p">
            <template v-slot:pathsLength>
                <strong>{{ result.paths.length }}</strong> 
            </template>
            <template v-slot:degrees>
                <strong>{{ wiki.degree }}</strong> 
            </template>
            <template v-slot:start>
                <a target="_blank" :href="toUrl(start!.title)">{{ start!.title }}</a>
            </template>
            <template v-slot:end>
                <a target="_blank" :href="toUrl(start!.title)">{{end!.title }}</a>
            </template>
            <template v-slot:time>
                <strong>{{ formatedTime || "" }}</strong>
            </template>
        </i18n-t>
        <h2>{{ wiki.degree }} {{ t('degrees', wiki.degree) }}</h2>
        <h2 v-if="result.paths.length > visiblePathCount">{{ visiblePathCount }} {{ t('pathsAmong') }} <strong>{{ result.paths.length }}</strong></h2>
        <h2 v-else ><strong>{{ result.paths.length }}</strong> {{ t('paths', result.paths.length) }}</h2>
        <div search-result-paths>
            <div v-for="path in result.paths.slice(0, visiblePathCount)">
                <!-- <preview :wiki-id="result.start" :key="result.start"/> -->
                <preview v-for="pageId in path" debug  :wiki-id="pageId" :key="pageId"/>
                <!-- <preview :wiki-id="result.end"   :key="result.end"/> -->
            </div>
        </div>
    </section>
</template>
<style >
[search-result] {
    display: flex;
    flex-direction: column;
    gap: 15px;
    > h2 {
        font-size: 2em;
        font-weight: normal;
        margin: 0;
    }
}
[search-result-paths] {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    > div {
        border-radius: 10px;
        border: 1px solid rgba(var(--heat-rgb), .7);
        max-width: 100%;
        width: min(100%, 50ch);
        display: flex;
        flex-direction: column-reverse;

        & >:first-child {
            border-radius: 10px 10px 0 0;
        }
        & >:last-child {
            border-radius: 0 0 10px 10px;
        }
        
    }

}
</style>
<i18n lang="yaml">
en:
    description: >
        {pathsLength} paths found of {degrees} degrees of separation 
        from {start} to {end} in {time}
    pathsAmong: paths among the
    paths: path | paths
    degrees: degree | degrees 
fr:
    description: >
        {pathsLength} chemins trouvés en {degrees} degrées de séparation 
        de {start} à {end} en {time}
    pathsAmong: chemins parmis les
    paths: chemin | chemins
    degrees: degré | degrés 
</i18n>
