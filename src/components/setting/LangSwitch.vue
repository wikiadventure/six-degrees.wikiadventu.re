
<template>
  <div lang-switch tabindex="0" @click="dialog?.showModal()" @keypress.enter="dialog?.showModal()">
    <IconTranslate/> {{ locale }}
    <dialog ref="dialog" @click.stop="dialog?.close()" @keydown.prevent.enter="select()" @keydown.prevent.up="incFocus(-1)" @keydown.prevent.down="incFocus()">
      <div role="listbox" aria-multiselectable="false">
        <label><IconTranslate/> {{ langs[locale as Lang] }}</label>
        <div v-for="[k,v] in langEntries" role="option" tabindex="-1" :aria-selected="k == locale" :is-focus="k == focusLang"
            @mouseenter="setFocus(k)"  @click="setFocus(k);select()"
        >{{ v }}</div>
      </div>
    </dialog>
  </div>
</template>
<style >
[lang-switch] {
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 10px;
  background: #0002;
  filter: drop-shadow(0 0 2px var(--heat-color)) drop-shadow(0 0 5px var(--heat-color));
  cursor: pointer;

  &:is(:focus, :focus-visible) {
    outline: 2px solid var(--heat-color);
    outline-offset: 4px;
  }

  dialog {
    border: none;
    background: transparent;
    &::backdrop {
      background: #0005;
      backdrop-filter: blur(2px);
    }
  }

  div[role="listbox"] {
    display: flex;
    flex-direction: column;
    width: min(95vw, 500px);
    background: #222;
    color: #fff;
    overflow: hidden;
    border-radius: 5px;
    > label {
      padding: 5px 15px;
      border-bottom: 1px solid #0ff4;
    }
  }
  div[role="option"] {
    padding: 5px 15px;
    background: #222;
    &:is(:focus, :focus-visible) {
      outline: none;
    }
    &[aria-selected="true"] {
      color: aquamarine;
    }
    &[is-focus="true"] {
      filter: brightness(1.2);
    }
  }

}
</style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { langs, Lang } from '../../i18n';
import IconTranslate from '~icons/material-symbols/translate-rounded';
import { ref } from '@vue/reactivity';
import type { Ref } from 'vue';

const { locale } = useI18n({ useScope: 'global' });

const langEntries = Object.entries(langs) as [Lang, string][];

const focusLang = ref(locale.value as Lang);

const setFocus = (k:Lang) => focusLang.value = k;

const dialog = ref() as Ref<HTMLDialogElement>;

const incFocus = (n=1) => {
  console.log(n);
  focusLang.value = langEntries.at(langEntries.findIndex(([k,v])=>k==focusLang.value)+n)![0];
}

const select = () => {
  locale.value = focusLang.value;
  dialog.value.close();
}


function test() {
  console.log("JAaaJJj");
}

</script>