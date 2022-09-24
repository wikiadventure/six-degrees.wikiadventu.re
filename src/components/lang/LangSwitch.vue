
<template>
  <q-select class="lang-switch" outlined :options="langOptions()"
    v-model="locale" emit-value map-options behavior="dialog" >
    <template v-slot:prepend>
      <q-icon name="mdi-translate" />
    </template>
  </q-select>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import {  langOptions } from '../../i18n';

const { locale } = useI18n({ useScope: 'global' });
</script>