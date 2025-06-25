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
    border: none;
    text-decoration: none;
    color: #fff;
    background: transparent;
    font-size: 2em;
    padding: .5em 1em;
    border-radius: 100vmax;
    backdrop-filter: blur(1.5px);
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 100vmax;
        filter: url(#Glass);
        background: var(--heat-color);
    }
    &:hover {
        outline: 1px solid  rgba(var(--heat-rgb), 1);
        filter: drop-shadow(0 0 1px rgba(var(--heat-rgb), 1));
    }
    &:active {
        filter: drop-shadow(0 0 10px black);
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