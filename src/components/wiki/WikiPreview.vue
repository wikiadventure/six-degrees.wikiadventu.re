<script lang="ts" setup>
import { computed, ComputedRef, reactive, toRefs } from '@vue/reactivity';
import { watch } from 'vue';
import { wiki, WikiPage, wikiUrl } from '../../store/search';
import { onWikiPreviewMapChange } from '../../store/search/onMapChange';

const { wikiId, disableGotoWiki } = defineProps({
  wikiId: {
    type: Number,
    required: true
  },
  disableGotoWiki: Boolean
});

let wikiPreview = reactive<WikiPage>({
  title: "",
  description: null,
  thumbnail: null
});

const {
  title,
  description,
  thumbnail
} = toRefs(wikiPreview);

function loadPreviewFromMap() {
  const p = wiki.previewMap.get(wikiId);
  if (p != null) {
    title.value = p.title;
    description.value = p.description;
    thumbnail.value = p.thumbnail;
  }
}

onWikiPreviewMapChange(loadPreviewFromMap);

</script>
<template>
  <div class="wiki-preview" tabindex="0"
    @keypress.enter="wikiPreview.openWiki"
    :aria-roledescription="disableGotoWiki ? undefined : 'Goto the wikipedia page on enter key press'"
    >
    <div class="img" v-if="image?.source != null">
      <img :src="image.source" :width="image.width!" :height="image.height!" />
    </div>
    <div class="img none" v-else >
      <q-icon size="40px" name="mdi-help" />
    </div>
    <h3>
      <q-btn  icon="mdi-open-in-new" v-if="wikiPreview.title != ''"
              type="a" target="_blank" :href="wikiUrl + wikiPreview.title.replaceAll(' ', '_')"
              size="sm" flat round tabindex="-1"
      />{{ (wikiPreview?.title || "???" ) }}
    </h3>
    <p>{{ wikiPreview?.description || "???" }}</p>
  </div>
</template>
<style lang="scss">
.wiki-preview {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 
    "i t t"
    "i d d";
  padding: 10px 0 10px 10px;
  &:last-child {
    border: none;
  }
  backdrop-filter: blur(2px);
  background: #0001;
  @at-root .body--dark & {
    background: #fff1;
  }
  &:hover, &:focus, &:focus-visible {
    z-index: 5;
  }
  h3 {
    grid-area: t;
    font-weight: bolder;
    -webkit-line-clamp: 2;
    max-height: 2em;
    > a {
      float: right;
      margin-right: -8px;
    }
  }
  p, h3 {
    margin: 0;
    padding: 0 10px;
    font-size: 1rem;
    line-height: 1em;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    transition: .5s max-height;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }
  p {
    grid-area: d;
    margin-bottom: 2px;
    -webkit-line-clamp: 3;
    max-height: 3em;
  }
  &:is(:hover, :focus, :focus-visible) :is(p, h3) {
    -webkit-line-clamp: 100;
    max-height: 30rem;
  }
}
</style>
