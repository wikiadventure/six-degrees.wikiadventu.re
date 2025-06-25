<script setup lang="ts">
import Achievement from "../achievement.vue";
import PillOverHeat from "./pill/pill-OverHeat.vue";
</script>
<template>
    <Achievement>
        <template #summary>
            <PillOverHeat/>
        </template>
        <template #description>
            <div class="achievement-description">
                Find a query of 7° of higher
            </div>
        </template>
    </Achievement>
</template>
