<template>
    <section search-result v-if="result.paths.length > 0">
        <i18n-t keypath="description" tag="p">
            <template v-slot:pathsLength>
                <strong>{{ result.paths.length }}</strong> 
            </template>
            <template v-slot:degrees>
                <strong>{{ result.paths?.[0].length + 1 }}</strong> 
            </template>
            <template v-slot:start>
                <a href="">{{ result.start.title }}</a>
            </template>
            <template v-slot:end>
                <a href="">{{ result.end.title }}</a>
            </template>
            <template v-slot:time>
                <strong>{{ formatedTime || "" }}</strong>
            </template>
        </i18n-t>
        <h2 v-if="result.paths.length > visiblePathCount">{{ visiblePathCount }} {{ t('pathsAmong') }} <strong>{{ result.paths.length }}</strong></h2>
        <h3 v-else ><strong>{{ result.paths.length }}</strong> {{ t('paths', result.paths.length) }}</h3>
        <div search-result-paths>
            <div v-for="path in result.paths.slice(0, visiblePathCount)">
                <preview :wiki-preview="result.start"/>
                <preview v-for="pageId in path" :wiki-preview="result.idToTitle?.[pageId+'']!"/>
                <preview :wiki-preview="result.end"/>
            </div>
        </div>
        <p></p>
    </section>
</template>
<style lang="scss">
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
    // jusyi-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    > div {
        border-radius: 15px;
        border: 1px solid #0003;
        max-width: 100%;
        width: 50ch;
        display: flex;
        flex-direction: column;
        
    }

}
</style>
<script lang="ts" setup>
import preview from "./wiki/WikiPreview.vue";
import { wiki } from '../store/search';
import { useI18n } from 'vue-i18n';
import { useMinutesSecondes } from '../composables/time/index';
import { toRefs } from '@vueuse/core';

const { t } = useI18n({ useScope: 'local' });

const visiblePathCount = 20;
const result = wiki.result;
console.log(toRefs(wiki.result));
const { formatedTime } = useMinutesSecondes(toRefs(wiki.result).time!);
</script>
<i18n lang="yaml">
    en:
        description: >
            {pathsLength} paths found of {degrees} degrees of separation 
            from {start} to {end} in {time}
        pathsAmong: paths among the
        paths: path | paths
    fr:
        description: >
            {pathsLength} chemins trouvés en {degrees} degrées de séparation 
            de {start} à {end} en {time}
        pathsAmong: chemins parmis les
        paths: chemin | chemins 
  </i18n>