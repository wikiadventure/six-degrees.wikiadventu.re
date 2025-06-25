<script setup lang="ts">
import Achievement from "../achievement.vue";
import PillGodwin from "./pill/pill-Godwin.vue";
</script>
<template>
    <Achievement>
        <template #summary>
            <PillGodwin/>
        </template>
        <template #description>
            <div class="achievement-description">
                <a href="https://en.wikipedia.org/wiki/Godwin%27s_law">Godwin's law</a>
            </div>
        </template>
    </Achievement>
</template>

