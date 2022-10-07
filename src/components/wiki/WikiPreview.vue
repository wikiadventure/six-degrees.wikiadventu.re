<template>
  <div class="wiki-preview" tabindex="0"
    @keypress.enter="gotoWiki"
    :aria-roledescription="disableGotoWiki ? undefined : 'Goto the wikipedia page on enter key press'"
    >
    <div class="img" v-if="image != null">
      <img :src="image.source" :width="image.width" :height="image.height" />
    </div>
    <div class="img none" v-else >
      <q-icon size="40px" name="mdi-help" />
    </div>
    <h3>
      <q-btn  icon="mdi-open-in-new" v-if="wikiPreview.title != ''"
              type="a" target="_blank" :href="url"
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
  .img {
    display: grid;
    grid-area: i;
    width: 80px;
    height: 80px;
    place-items: center;
    background: none;
    border-radius: 3px;
    position: relative;
    &:not(.none) {
      filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff);
      &:hover {
        z-index: 5;
        isolation: isolate;
      }
    }
  }
  .img:not(.none):hover, &:focus .img, :focus-visible .img {
    img {
      max-width: 100vmin;
      max-height: 100vmin;
      border-radius: 0;
      filter: drop-shadow(0 0 3px #fff);
      transition: filter .5s, max-height .5s .5s, max-width .5s .5s;
    }
  }
  .img>img {
    position: absolute;
    max-width: 80px;
    max-height: 80px;
    object-fit: cover;
    border-radius: 3px;
    transition: filter 1s, max-height .5s 0s, max-width .5s 0s;
  }
  .img.none {
    border: 1px solid grey;
    background: #0001;
    @at-root .body--dark & {
      background: #fff1;
    }
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
<script lang="ts" setup>
import { PropType } from 'vue';
import { WikiPage, wikiUrl } from '../../store/search';

const { wikiPreview, disableGotoWiki } = defineProps({
  wikiPreview: {
    type: Object as PropType<Omit<WikiPage, "id">>,
    required: true
  },
  disableGotoWiki: Boolean
});
const { title, thumbnail: image } = wikiPreview;
const url = wikiUrl.value + wikiPreview.title.replaceAll(' ', '_');
const gotoWiki = () => disableGotoWiki || window.open(url, "_blank");

</script>