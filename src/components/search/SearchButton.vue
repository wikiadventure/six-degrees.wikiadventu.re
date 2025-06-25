<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { wiki, isFetching, fetchAllShortestPaths } from '../../store/search';
import SearchLoader from './SearchLoader.vue';
import GlassButton from '../cosmetic/GlassButton.vue';

const { t } = useI18n({ useScope: 'local' });
</script>
<template>
    <GlassButton type="button" v-if="!isFetching" :disabled="wiki.search.start.id == -1 || wiki.search.end.id == -1" search-button @click="fetchAllShortestPaths">
        {{ t('search') }} !
    </GlassButton>
    <SearchLoader v-else/>
</template>
<style >
[search-button] {
    &[disabled] {
        cursor: not-allowed;
        filter: saturate(.5);
    }
}
</style>
<i18n lang="yaml">
en:
    search: Search
fr:
    search: Rechercher
eo:
    search: Serĉi
</i18n>