<script setup lang="ts">
import Achievement from "../achievement.vue";
import PillOver9000 from "./pill/pill-Over9000.vue";
</script>
<template>
    <Achievement>
        <template #summary>
            <PillOver9000/>
        </template>
        <template #description>
            <div class="achievement-description">
                Find a query with over 9000 shortest path.
            </div>
        </template>
    </Achievement>
</template>