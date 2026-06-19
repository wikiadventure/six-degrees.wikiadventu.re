<script lang="ts" setup>
const props = defineProps({
    type: {
        default: "a",
        type: String
    }
})
</script>
<template>
    <component :is="props.type" glass-btn v-bind="$attrs"><slot></slot></component>
</template>
<style >
[glass-btn] {
    appearance: none;
    border: .1px solid #333;
    text-decoration: none;
    color: #fff;
    /* background: transparent; */
    background: rgba(var(--heat-rgb), .3);
    font-size: 2em;
    padding: .5em 1em;
    border-radius: 100vmax;
    /* backdrop-filter: blur(1.5px); */
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;

    &::before {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: 100vmax;
        border: 5px solid #fffa;
        border-bottom-color: #000a;
        filter: blur(2px);
        border-width: 5px 0 2px 0;
    }
    &:hover {
        outline: 1px solid  rgba(var(--heat-rgb), 1);
        filter: drop-shadow(0 0 1px rgba(var(--heat-rgb), 1));
    }
    &:active {
        filter: drop-shadow(0 0 10px black);
        scale: .95;
    }
    > .q-icon {
        vertical-align: baseline;
    }
    &:is(:focus, :focus-visible) {
        outline: 2px solid var(--heat-color);
        outline-offset: 4px;
    }
}
</style>