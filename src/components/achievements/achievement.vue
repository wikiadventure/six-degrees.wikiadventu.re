<script setup lang="ts">

</script>
<template>
    <details open achievement>
        <summary><slot name="summary"></slot></summary>
        <slot name="description"></slot>
    </details>
</template>
<style >
[achievement] {
    width: 32rem;
    /* flex: 0 0 32em; */
    text-align: center;

    > summary {
        cursor: pointer;
        list-style: none;
        /* filter: brightness(.1) grayscale(.7); */
        &::marker {
            display: none;
            font-size: 0;
        }
    }
    > :not(summary) {
        margin-top: 25px;
        min-height: 10ch;
    }
}
</style>