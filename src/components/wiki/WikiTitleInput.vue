<script lang="ts" setup>
import preview from "./WikiPreview.vue";
import { loadSuggestions } from "../../store/wiki/actions";
import { ref, watch } from 'vue';
import { useVModels, watchDebounced } from '@vueuse/core'
import { i18n } from "../../i18n";
import { wiki } from '../../store/search';

const props = defineProps<{
    id: number,
    input: string,
    inputName: string,
    inputPlaceholder: string,
}>()

const emit = defineEmits(['update:id','update:input']);

const { id, input } = useVModels(props, emit);

const inputFocus = ref(false);

const suggestions = ref<number[]>([])

watchDebounced(input, async t => {
    const s = await loadSuggestions(t);
    s != null && (suggestions.value = s);
}, { debounce: 250 });
const focusElement = ref<HTMLElement>();
function select(x:number) {
    id.value = x;
    input.value = wiki.previewMap.get(x)!.title ?? "???";
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
watch(i18n.global.locale, v => {
    suggestions.value = []
})

</script>
<template>
    <div wiki-title-input ref="focusElement">
        <input v-model="input" @focus="inputFocus = true" :placeholder="props.inputPlaceholder" :name="props.inputName"/>
        <div wiki-title-suggest>
            <preview    v-for="s in suggestions" :wiki-id="s" :key="s"
                        @keypress.enter="select(s);blur()" @click.stop="select(s);blur()" 
                        disable-goto-wiki accesskey="enter" />
        </div>
        <preview :wiki-id="id" :key="id" disable-goto-wiki tabindex="-1"/>
    </div>
</template>
<style >
[wiki-title-input] {
    --border: 1px solid rgba(var(--heat-rgb), .5);
    --border-focus: 1px solid var(--heat-color);
    width: 100%;
    position: relative;
    backdrop-filter: blur(3px);
    z-index: 2;
    > input {
        border: var(--border);
        width: 100%;
        height: 3em;
        font-size: 1.5em;
        text-align: center;
        background: #0002;
        color: #eee;
        text-overflow: ellipsis;
        &:is(:focus, :focus-visible) {
            outline: var(--border);
            outline-offset: 1px;
            border: var(--border-focus);
        }
    }
    > [wiki-preview] {
        background: #0002;
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
        border-radius: 0 0 10px 10px;
        background: #000a;
        [wiki-preview] {
            border-bottom: var(--border);
            cursor: pointer;
            &:last-child {
                border-bottom: none;
                border-radius: 0 0 10px 10px;
            }
            &:hover {
                background: #000a;
            }
        }
    }
    > [wiki-preview] {
        border: var(--border);
        border-top: none;
        border-radius: 0 0 15px 15px;
    }
}


</style>
