<template>
    <q-toggle theme-switch
                v-model="theme"
                icon="mdi-lightbulb"
                size="lg"
                color="black">
    </q-toggle>
</template>
<style lang="scss">
[theme-switch] {
    margin: 0;
    .q-toggle__thumb {
        filter: drop-shadow(0 0 2px cyan);
        &::after {
            background: #fff;
        }
    }
    .q-icon {
        text-shadow: 0 0 3px cyan;
        opacity: 1;
        color: #000;
    }
}
</style>
<script setup lang="ts">
import { Dark } from 'quasar';
import { computed } from 'vue';

const theme = computed({
    get: ( ) => Dark.isActive,
    set: (v) => Dark.set(v)
})
</script>