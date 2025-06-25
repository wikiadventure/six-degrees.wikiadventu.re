<script setup lang="ts">
import AchievementPill from "../../achievement-pill.vue";
import MaterialSymbolsStar from '~icons/material-symbols/star';
</script>
<template>
    <AchievementPill class="a-Over9000" title="It's OVER 9000!">
        <MaterialSymbolsStar/>
    </AchievementPill>
</template>
<style > 
.a-Over9000 {
    box-sizing: content-box;
    outline: 3px solid #FFF467; 
    background:
        radial-gradient(
            circle at 2.2rem 2.2rem, #fffd, #fffc .5rem, #fff0 1rem
        ),
        radial-gradient(
            circle at 2.5rem 2.5rem, #FAB637f5, #9a5500ef
        ),
        ;
    svg {
        color: #AA2A1D;
        padding: 3rem;
        min-width: 2rem;
        min-height: 2rem;
    }
    box-shadow: 0 0 50px 0 #ffff00bb, 0 0 7px 0 #fff47e, 0 0 5px 0 #fff47e;
}
</style>