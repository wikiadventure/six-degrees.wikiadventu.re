<template>
    <button v-if="!isFetching" :disabled="wiki.search.start.id == '' || wiki.search.end.id == ''" search-button @click="fetch">
        {{ t('search') }} !
    </button>
    <div v-else search-button-loader></div>
</template>
<style lang="scss">
[search-button] {
    padding: 15px 25px;
    border-radius: 15px;
    background: #f44646;
    border: 2px solid #000;
    color: #fff;
    font-size: 2rem;
    text-align: center;
    transition: all ease-in-out .2s;
    &:hover {
        filter: brightness(1.1);
    }
    &:active {
        filter: brightness(0.95);
    }
}
[search-button-loader] {
    border: 5px solid #fff;
    filter: drop-shadow(0 0 5px cyan);
    text-align: center;
    line-height: 10ch;
    // vertical-align: middle;
    width: 10ch;
    height: 10ch;
    animation: loader 1s infinite linear;
}

@keyframes loader {
    0% {   transform: rotate(0deg); border-radius: 50%; }
    50% {  transform: rotate(90deg); border-radius: 5%; }
    100% { transform: rotate(180deg); border-radius: 50%; }
}
</style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useAllShortestPaths, wiki } from '../store/search/index';

const { t } = useI18n({ useScope: 'local' });
const {
    isFetching,
    fetch
} = useAllShortestPaths();
</script>
<i18n lang="yaml">
en:
    search: Search
fr:
    search: Rechercher
eo:
    search: Serĉi
</i18n>