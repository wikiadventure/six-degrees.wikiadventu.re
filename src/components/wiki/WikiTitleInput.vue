<template>
    <div wiki-title-input ref="focusElement">
        <input v-model="page.input" @focus="inputFocus = true"/>
        <!-- <preview :wikiPreview="vote" class="vote"/> -->
        <div wiki-title-suggest>
            <preview    v-for="s in suggestions" :wikiPreview="s" :key="s.id"
                        @keypress.enter="blur();select(s)" @click.stop="blur();select(s)" 
                        disable-goto-wiki aria-roledescription="Select this page for the search on enter key press" />
        </div>
        <preview :wiki-preview="page" disable-goto-wiki tabindex="-1"/>
    </div>
</template>
<style lang="scss">
[wiki-title-input] {
    --border: 1px solid #0ff5;
    --border-focus: 1px solid #0ffc;
    width: 100%;
    // height: 2em;
    position: relative;
    
    > input {
        border: var(--border);
        width: 100%;
        height: 3em;
        font-size: 1.5em;
        text-align: center;
        backdrop-filter: blur(3px);
        background: #0001;
        color: #000;
        text-overflow: ellipsis;
        @at-root .body--dark & {
            background: #fff1;
            color: #fff;
        }
        &:focus, &:focus-visible {
            outline: var(--border);
            outline-offset: 1px;
            border: var(--border-focus);
        }
    }
    &:focus-within [wiki-title-suggest] {
        display: flex;
    }
    [wiki-title-suggest] {
        z-index: 2;
        position: absolute;
        display: none;
        flex-direction: column;
        width: 100%;
        border: var(--border);
        border-top: none;
        border-radius: 10px;
        background: #fffa;
        @at-root .body--dark & {
            background: #000a;
        }
        .wiki-preview {
            border-bottom: var(--border);
            cursor: pointer;
            &:last-child {
                border-bottom: none;
            }
            &:hover {
                background: #fffa;
                @at-root .body--dark & {
                    background: #000a;
                }
            }
        }
    }
    > .wiki-preview {
        border: var(--border);
        border-top: none;
        border-radius: 0 0 15px 15px;
    }
}


</style>
<script lang="ts" setup>
import preview from "./WikiPreview.vue";
import { loadSuggestions } from "../../store/wiki/actions";
import { ref, watch, reactive } from 'vue';
import { WikiSuggestion } from '../../store/wiki/type';
import { toRefs, useVModel, watchDebounced } from '@vueuse/core'
import { i18n } from "../../i18n";
import { WikiPage } from '../../store/search';

const props = defineProps<{
  modelValue: WikiPage & { input: string }
}>()

const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, 'modelValue', emit);

const page = reactive(model.value)

const pageRef = toRefs(page);

const inputFocus = ref(false);

const suggestions = ref<WikiSuggestion[]>([])

watchDebounced(pageRef.input, async t => suggestions.value = await loadSuggestions(t), { debounce: 500, maxWait: 1500 });
const focusElement = ref<HTMLElement>();
function select(s:WikiSuggestion) {
    page.input = s.title;
    page.title = s.title;
    page.id = s.id;
    page.thumbnail.height = s.thumbnail?.height;
    page.thumbnail.width= s.thumbnail?.height;
    page.thumbnail.source = s.thumbnail?.source;
    page.description = s.description;

}
//the set time out is a hack to prevent vue from remove (v-if) the suggestions before it handle the click event on it
//nextTick don't work for some reason
function unfocus(){setTimeout(() => inputFocus.value = false,250)}
function blur(){
    focusElement.value
        ?.querySelectorAll(':focus,:focus-visible')
        .forEach((e:any)=>e?.blur?.());
    focusElement.value?.querySelector('input')?.blur?.();
}
watch(i18n.global.locale, v=>{
    suggestions.value = []
})
</script>
