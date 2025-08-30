<template>
    <div search-input-section>
        <p search-label>
            {{ t('label') }}
        </p>
        <WikiTitleInput path-start v-model:id="wiki.search.start.id"  v-model:input="wiki.search.start.input"
            :input-placeholder="t('start_page')" input-name="start-page-input"
        />
        <p path-to>{{ t('to') }}<IconSwap tabindex="0" @click="swapSearch" @keypress.enter="swapSearch" /> </p>
        <WikiTitleInput path-end   v-model:id="wiki.search.end.id"    v-model:input="wiki.search.end.input"
            :input-placeholder="t('end_page')" input-name="end-page-input"
        >
    </div>
</template>
<style >
[search-input-section] {
    display: grid;
    gap: 2ch;
    width: 100%;
    align-self: stretch;
    margin: 0 auto;
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
        @media (max-width: 950px) {
            z-index: 5;
        }
    }
    > [path-to] {
        margin-top: 20px;
        align-self: flex-start;
        grid-area: →;
        > svg {
            transition: all ease-in-out .2s;
            cursor: pointer;
            &:is(:hover, :focus, :focus-visible) {
                outline: none;
                transform: rotate(180deg);
                filter: drop-shadow(0 0 5px var(--heat-color)) drop-shadow(0 0 1px  var(--heat-color));
            }
            &:active {
                transform: rotate(0);
            }
        }
        @media (max-width: 950px) {
            margin-top: 0;
            
            > svg {
                transform: rotate(90deg);
                &:hover, &:focus, &:focus-visible {
                    transform: rotate(270deg);
                }
                &:active {
                    transform: rotate(90deg);
                }
            }
        }
    }
    > [path-end] {
        grid-area: e;
    }
    > [wiki-title-input] {
        align-self: flex-start;
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
import { wiki, swapSearch } from '../../store/search';
import WikiTitleInput from '../wiki/WikiTitleInput.vue';
import IconSwap from '~icons/mdi/swap-horizontal-bold';

const { t } = useI18n({ useScope: 'local' });
</script>
<i18n lang="yaml">
en:
    label: Find all shortest paths from
    start_page: Start page
    end_page: End page
    to: to
fr:
    label: Trouver tous les chemins les plus courts de
    start_page: Page de départ
    end_page: Page de d'arrivée
    to: à
eo:
    label: Trovu ĉiujn plej mallongajn vojojn de
    start_page: Hejmpaĝo
    end_page: Alvenpaĝo
    to: al

</i18n>