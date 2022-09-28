<template>
    <div search-input-section>
        <p search-label>
            {{ t('label') }}
        </p>
        <WikiTitleInput path-start v-model="wiki.search.start"/>
        <p path-to> {{ t('to') }}</p>
        <WikiTitleInput path-end   v-model="wiki.search.end"/>
    </div>
</template>
<style lang="scss">
[search-input-section] {
    display: grid;
    gap: 2ch;
    width: 100%;
    align-self: stretch;
    margin: auto;
    max-width: 120ch;
    grid-template-areas:    "p p p"
                            "s → e";
    grid-template-columns: minmax(0, 1fr) min-content minmax(0, 1fr);
    grid-auto-rows: min-content;
    place-items: center;
    @media (max-width: 950px) {
        grid-template-areas:    "p p p"
                                "s s s"
                                "→ → →"
                                "e e e";
        max-width: 70ch;
    }
    > p {
        margin: 0;
        text-align: center;
        font-size: 1.5em;
    }
    > [search-label] {
        grid-area: p;
    }
    > [path-start] {
        grid-area: s;
    }
    > [path-to] {
        grid-area: →;
    }
    > [path-end] {
        grid-area: e;
    }
    > input {
        padding: 0.5em 15px;
        font-size: 1.25em;
        width: 100%;
        text-align: center;
    }
}
</style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { wiki } from '../store/search';
import WikiTitleInput from './wiki/WikiTitleInput.vue';

const { t } = useI18n({ useScope: 'local' });
</script>
<i18n lang="yaml">
en:
    label: Find all shortest paths from
    to: to
fr:
    label: Trouver tous les chemins les plus courts de
    to: à
eo:
    label: Trovu ĉiujn plej mallongajn vojojn de
    to: al

</i18n>