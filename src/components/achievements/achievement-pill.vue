<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>
<template>
    <div achievement-pill>
        <slot></slot>
        <div>{{ title }}</div>
    </div>
</template>
<style >

@keyframes achievement-pill-inner-pop-in {
    0% {
        transform: scale(0);
    }
    10% {
        transform: scale(1.1);
    }
    15% {
        transform: scale(1);
    }
}

@keyframes achievement-pill-inner-pop-in-out {
    0%, 100% {
        transform: scale(0);
    }
    10%, 90% {
        transform: scale(1.1);
    }
    15%, 85% {
        transform: scale(1);
    }
}

@keyframes achievement-pill-fade-in {
    0%, 20% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
}

@keyframes achievement-pill-fade-in-out {
    0%, 20%, 80%, 100% {
        opacity: 0;
    }
    25%, 75% {
        opacity: 1;
    }
}

@keyframes achievement-pill-pop-in {
    0% {
        transform: scale(0);
    }
    5% {
        transform: scale(1.1);
    }
    10%{
        transform: scale(1);
    }
    15% {
        width: var(--pill-height, 8rem);
    }
    20%, 100% {
        width: var(--pill-width, 32rem);
    }
}

@keyframes achievement-pill-pop-in-out {
    0%, 100% {
        transform: scale(0);
    }
    5%, 95% {
        transform: scale(1.1);
    }
    10%, 90%{
        transform: scale(1);
    }
    15%, 85% {
        width: var(--pill-height, 8rem);
    }
    20%, 80% {
        width: var(--pill-width, 32rem);
    }
}

[achievement-pill] {
    position: relative;
    border-radius: 100vmax;
    width: var(--pill-height, 8rem);
    height: var(--pill-height, 8rem);
    max-width: 100vw;
    animation: achievement-pill-pop-in 15s ease-in-out forwards;
    display: flex;
    align-items: center;
    color: #fff;
    text-align: start;
    transform: translate3d(0,0,0);

    > :is(svg, figure) {
        box-sizing: content-box;
        padding: 1rem;
        min-width: 6rem;
        min-height: 6rem;
        transform-origin: center;
        animation: achievement-pill-inner-pop-in 15s ease-in-out forwards;
        margin: 0;

    }

    > div {
        font-size: 1.5rem;
        animation: achievement-pill-fade-in 15s linear forwards;
        margin: 0 1em 0 0;
    }

    > div > span {
        background: currentColor;
        /* color: #ff9100; */
        border-radius: 100vmax;
        padding: .1rem;
    }

}

[achievements-popup] [achievement-pill] {
    animation: achievement-pill-pop-in-out 15s ease-in-out forwards;
    > :is(svg, figure) {
        animation: achievement-pill-inner-pop-in-out 15s ease-in-out forwards;
    }
    > div {
        font-size: 1.5rem;
        animation: achievement-pill-fade-in-out 15s linear forwards;
        margin: 0 1em 0 0;
    }
}
</style>