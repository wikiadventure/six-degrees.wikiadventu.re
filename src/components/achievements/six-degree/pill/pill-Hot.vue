<script setup lang="ts">
import AchievementPill from "../../achievement-pill.vue";
import Flame from "../../../cosmetic/Flame.vue";
import OcticonFlame from '~icons/octicon/flame'
</script>
<template>
    <div class="a-Hot">
        <Flame/>
        <div class="a-Hot-shadow">
            <AchievementPill title="6° of seperation reached! Can it be hotter?">
                <OcticonFlame/>
            </AchievementPill>
        </div>
    </div>
</template>
<style >

@keyframes Hot-fire-drop {
    0%, 100% {
        filter: drop-shadow(0 0 2px orange) drop-shadow(0 0 10px orange) drop-shadow(0 0 20px #f00);
    }
    20% {
        filter: drop-shadow(-1px 2px 2px orange) drop-shadow(-2px 1px 10px orange) drop-shadow(-2px 1px 20px #f00);
    }
    40% {
        filter: drop-shadow(1px -2px 2px orange) drop-shadow(3px -4px 10px orange) drop-shadow(3px -4px 20px #f00);
    }
    60% {
        filter: drop-shadow(-2px -2px 2px orange) drop-shadow(-2px -3px 10px orange) drop-shadow(-2px -3px 20px #f00);
    }
    80% {
        filter: drop-shadow(3px 3px 2px orange) drop-shadow(1px 2px 0 10px orange) drop-shadow(1px 2px 20px #f00);
    }
}
.a-Hot {
    position: relative;
    width: min-content;
    
    --flame-1: orange;
    --flame-2: red;
    --speed: 1.16;
    > .a-Hot-shadow {
        animation: Hot-fire-drop 3s infinite ease-in-out;
        mix-blend-mode: lighten;
    }
    [achievement-pill] {
        background: radial-gradient(red, orange);
        border: 1px solid orange;
    }

}
</style>