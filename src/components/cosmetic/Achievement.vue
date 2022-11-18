<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted, reactive } from 'vue';
import RoundStar from '~icons/ic/round-star';
import { achieve, Achievement, useAchievement, AchievementKey, Achievements } from '../../store/achievements';
const achievements = ref<HTMLDivElement>();
const { subscribe } = useAchievement();

// By default all achivement are not visible
const defaultDisplay = (Object.keys(Achievement) as Array<keyof typeof Achievement>)
                                .reduce<Record<AchievementKey, number>>((o,v,i)=>
                                    Object.assign(o, {
                                        [v]: 0
                                    })
                                , {} as any)

const isDisplayed = reactive<Record<AchievementKey, number>>(defaultDisplay);

const displayAchievementOnN = [1,5,25,42,69,100,1000,1_000_000,1_000_000_000]

subscribe((a:AchievementKey)=>{
    console.log("JaaJ");
    const n = Achievements.value[a];
    if (displayAchievementOnN.includes(n)) {
        isDisplayed[a] = n;
        setTimeout(() => isDisplayed[a] = 0, 15000);
    }
})


</script>
<template>
    <div achievements ref="achievements">
        <div achievement v-if="isDisplayed.Godwin">
            <RoundStar/>
            <p>Godwin Law <span v-if="isDisplayed.Godwin>1">x{{isDisplayed.Godwin}}</span></p>
        </div>
        <div achievement v-if="isDisplayed.AbsoluteZero">
            <RoundStar/>
            <p>0 Kelvin! It's freezing hot! <span v-if="isDisplayed.AbsoluteZero>1">x{{isDisplayed.AbsoluteZero}}</span></p>
        </div>
        <div achievement v-if="isDisplayed.Hot">
            <RoundStar/>
            <p>6° of seperation reached! Can it be hotter? <span v-if="isDisplayed.Hot>1">x{{isDisplayed.Hot}}</span></p>
        </div>
        <div achievement v-if="isDisplayed.OverHeat">
            <RoundStar/>
            <p>OVERHEAT! You broke the theorie. <span v-if="isDisplayed.OverHeat>1">x{{isDisplayed.OverHeat}}</span></p>
        </div>
        <div achievement>
            <RoundStar/>
            <p>OVERHEAT! You broke the theorie. <span v-if="isDisplayed.OverHeat>1">x{{isDisplayed.OverHeat}}</span></p>
        </div>
    </div>
</template>
<style lang="scss">
[achievements] {
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px 0;
    z-index: 10000;
}
[achievement] {
    position: relative;
    border-radius: 100vmax;
    background: #ff9100;
    width: 8rem;
    max-width: 100vw;
    height: 8rem;
    animation: popup 15s ease-in-out forwards;
    display: flex;
    align-items: center;

    svg {
        padding: 1rem;
        min-width: 8rem;
        min-height: 8rem;
        transform-origin: center;
        animation: innerpopup 15s ease-in-out forwards;
    }

    p {
        font-size: 1.5rem;
        color: #fff;
        animation: fade-in-out 15s linear forwards;
        margin: 0 1em 0 0;
    }

    span {
        background: #fff;
        color: #ff9100;
        border-radius: 100vmax;
        padding: .1rem;
    }

        
    @keyframes popup {
        0%, 100% {
            transform: scale(0);
        }
        5%, 95% {
            transform: scale(1.1);
        }
        10%, 90% {
            transform: scale(1);
        }
        15%, 85% {
            width: 8rem;
        }
        20%, 80%{
            width: 32rem;
        }
    }

    @keyframes innerpopup {
        0%, 100% {
            transform: scale(0);
        }
        10%, 90% {
            transform: scale(1.1);
        }
        15%, 85% {
            transform: scale(1);
        }
    }

    @keyframes fade-in-out {
        0%, 20%, 80%, 100% {
            opacity: 0;
        }
        25%, 75% {
            opacity: 1;
        }
    }

}
</style>