<script setup lang="ts">
import Achievement from "../achievement.vue";
import PillAbsoluteZero from "./pill/pill-AbsoluteZero.vue";
</script>
<template>
    <Achievement>
        <template #summary>
            <PillAbsoluteZero/>
        </template>
        <template #description>
            <div class="achievement-description">
                Find a query of 0° (well it's when the start and end page are the same).
            </div>
        </template>
    </Achievement>
</template>

