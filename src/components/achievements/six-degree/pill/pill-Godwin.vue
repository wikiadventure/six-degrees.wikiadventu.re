<script setup lang="ts">
import AchievementPill from "../../achievement-pill.vue";
</script>
<template>
    <AchievementPill class="a-Godwin" title="Godwin's law.">
        <figure></figure>
    </AchievementPill>
</template>
<style >
.a-Godwin {
    background: 
        radial-gradient( circle at 4rem 4rem,
                #fff 2.2rem, transparent 2.2rem
        ),
        linear-gradient(
            transparent 3.2rem, #fff 3.2rem, #fff 4.8rem, transparent 4.8rem
        ),
        linear-gradient(
            90deg, transparent 3.2rem, #fff 3.2rem, #fff 4.8rem, transparent 4.8rem
        ),

        #de0000;
    color: #000;
    figure {
        background: 
            radial-gradient( circle at 4rem 4rem,
                #000 1.7rem, transparent 1.7rem
            ),
    }
}
</style>