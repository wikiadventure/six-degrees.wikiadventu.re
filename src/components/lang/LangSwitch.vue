
<template>
  <div lang-switch>
    <q-select outlined :options="langOptions(AvailableLangs)"
      v-model="locale" emit-value map-options behavior="dialog" >
      <template v-slot:prepend>
        <q-icon name="mdi-translate" />
      </template>
  </q-select>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { AvailableLangs, langOptions } from '../../i18n';

const { locale } = useI18n({ useScope: 'global' });
</script>