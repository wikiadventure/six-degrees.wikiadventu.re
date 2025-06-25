<script setup lang="ts">
import Achievement from "../achievement.vue";
import PillHot from "./pill/pill-Hot.vue";
</script>
<template>
    <Achievement>
        <template #summary>
            <PillHot/>
        </template>
        <template #description>
            <div class="achievement-description">
                Find a query of 6° (when the shortest path is 6 links)
            </div>
        </template>
    </Achievement>
</template>
