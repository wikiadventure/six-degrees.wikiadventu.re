<script setup lang="ts">
import AchievementPill from "../../achievement-pill.vue";
import Flame from "../../../cosmetic/Flame.vue";
import BurningSkull from '~icons/game-icons/burning-skull';
</script>
<template>
    <div class="a-OverHeat">
        <Flame/>
        <div class="a-OverHeat-shadow">
            <AchievementPill title="OVERHEAT! You broke the theory.">
                <BurningSkull />
            </AchievementPill>
        </div>
    </div>
</template>
<style >

@keyframes OverHeat-fire-drop {
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

.a-OverHeat {
    position: relative;
    width: min-content;
    
    --flame-1: white;
    --flame-2: orange;
    --speed: .9;
    .a-OverHeat-shadow {
        animation: OverHeat-fire-drop  3s infinite ease-in-out;
        mix-blend-mode: lighten;
    }
    [achievement-pill] {
        background: radial-gradient(orange, white);

        border: 1px solid white;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 0 4px #000, 0 0 3px #000, 0 0 2px #000, 0 0 1px #000;
    }
}
</style>