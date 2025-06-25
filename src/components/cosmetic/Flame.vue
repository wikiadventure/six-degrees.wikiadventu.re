<script setup lang="ts">
</script>
<template>
    <!-- We create 35 flame particle with 6 --r random css var -->
    <div class="flame" v-for="x in 35" :style="Array.from({length: 6},(_, i)=>`--r${i}:${Math.random()};`).join('')">

    </div>
</template>
<style >
@keyframes fire-fade-in {
    0% {opacity: 0;}
    100% {opacity: 1;}
}

@keyframes fire-bubble {
    /* 0% {transform: translate3d(0, 12rem,0); opacity: 0;} */
    0% {transform: translate3d(0, 12rem,0); opacity: 1;}
    60% {opacity: 1;}
    100% {transform: translate3d(0,0,0); opacity: 0;}
}
.flame {
    --s: 5rem;
    position: absolute;
    width: 100%;
    height: 12rem;
    bottom: 4rem;
    /* background: #f00; */
    /* filter: drop-shadow(0px 0px 2px orange) drop-shadow(0px 0px 10px orange) drop-shadow(0px 0px 20px #f00); */
    /* mix-blend-mode: color-burn; */
    animation: fire-fade-in 5s forwards linear;
    filter: blur(15px);
    z-index: -1;
    pointer-events: none;

    > div {
        pointer-events: none;
        will-change: transform, opacity;
        position: absolute;  
        mix-blend-mode: screen;
        /* background: var(--flame-1); */
        border-radius: 50%;
        animation: fire-bubble calc((var(--speed) + var(--speed) * var(--r5) )* 1s) infinite linear;
        background-image: radial-gradient(rgb(255,80,0) 20%,rgba(255,80,0,0) 70%);
        --size: calc(2rem + var(--r0) * var(--s));
        width: var(--size); height: var(--size);
        animation-delay: calc(var(--r1) * var(--speed) + 3s);
        left: clamp(0rem,calc(var(--r2) * 94%), calc(100% - var(--size)));
    }

}
</style>