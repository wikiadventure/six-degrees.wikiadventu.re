<script setup lang="ts">
import MdiTemperatureKelvin from '~icons/mdi/temperature-kelvin';
import AchievementPill from "../../achievement-pill.vue";
</script>
<template>
    <AchievementPill class="a-AbsoluteZero" title="0 Kelvin! Entropy is a lie.">
        <MdiTemperatureKelvin/>
    </AchievementPill>
</template>
<style >
.a-AbsoluteZero {
    background: #000;
    border: 1px solid #fff;
    svg {
        color: white;
    }
}
</style>