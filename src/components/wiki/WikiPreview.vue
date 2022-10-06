<template>
  <div class="wiki-preview">
    <div class="img" v-if="wikiPreview?.thumbnail != null">
      <img :src="wikiPreview?.thumbnail?.source" :width="wikiPreview?.thumbnail?.width" :height="wikiPreview?.thumbnail?.height" />
    </div>
    <div class="img none" v-else >
      <q-icon size="40px" name="mdi-help" />
    </div>
    <h3>{{ (wikiPreview?.title || "???" ) }}
      <q-btn icon="mdi-open-in-new" v-if="wikiPreview.title != ''" target="_blank" size="sm" flat round type="a" :href="wikiUrl + wikiPreview.title.replaceAll(' ', '_')" />
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
  padding: 10px;
  &:last-child {
    border: none;
  }
  backdrop-filter: blur(2px);
  background: #0001;
  @at-root .body--dark & {
    background: #fff1;
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
    background: #0004;
    @at-root .body--dark & {
      background: #fff4;
    }
    &:not(.none) {
      filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff);
      &:hover {
        z-index: 5;
        isolation: isolate;
        img {
          max-width: 100vmin;
          max-height: 100vmin;
          border-radius: 0;
          filter: drop-shadow(0 0 3px #fff);
          transition: filter .5s, max-height .5s .5s, max-width .5s .5s;
        }
      }
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
  }
  h3 {
    grid-area: t;
    margin: 0 15px;
    font-size: 1.5rem;
    line-height: 1.5rem;
    >* {
      float: right;
    }
  }
  p {
    grid-area: d;
    margin: 0 15px;
    padding-bottom: 2px;
    font-size: 1rem;
    line-height: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    max-height: 7ex;
    transition: .5s max-height;
    &:hover {
      -webkit-line-clamp: 100;
      max-height: 30ex;
    }
  }
}
</style>
<script lang="ts" setup>
import { PropType } from 'vue';
import { WikiPage, wikiUrl } from '../../store/search';

const { wikiPreview } = defineProps({
  wikiPreview: {
    type: Object as PropType<Omit<WikiPage, "id">>,
    required: true
  }
});
</script>