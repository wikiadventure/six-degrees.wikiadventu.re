<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted, reactive } from 'vue';

// icons
import RoundStar from '~icons/ic/round-star';
import MakiReligiousJewish from '~icons/maki/religious-jewish';
import MdiTemperatureKelvin from '~icons/mdi/temperature-kelvin'


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
        <div achievement Godwin v-if="isDisplayed.Godwin">
            <MakiReligiousJewish/>
            <p>Godwin Law <span v-if="isDisplayed.Godwin>1">x{{isDisplayed.Godwin}}</span></p>
        </div>
        <div achievement AbsoluteZero v-if="isDisplayed.AbsoluteZero">
            <MdiTemperatureKelvin/>
            <p>0 Kelvin! It's freezing hot! <span v-if="isDisplayed.AbsoluteZero>1">x{{isDisplayed.AbsoluteZero}}</span></p>
        </div>
        <!-- <div achievement AbsoluteZero>
            <MdiTemperatureKelvin/>
            <p>0 Kelvin! It's freezing hot! <span v-if="isDisplayed.AbsoluteZero>1">x{{isDisplayed.AbsoluteZero}}</span></p>
        </div> -->
        <div achievement Hot v-if="isDisplayed.Hot">
            <RoundStar/>
            <p>6° of seperation reached! Can it be hotter? <span v-if="isDisplayed.Hot>1">x{{isDisplayed.Hot}}</span></p>
        </div>
        <div Hot>
            <div flame>
                <div v-for="_ in 20"></div>
            </div>
            <div achievement>
                <RoundStar/>
                <p>6° of seperation reached! Can it be hotter? <span v-if="isDisplayed.Hot>1">x{{isDisplayed.Hot}}</span></p>
            </div>
        </div>
        <div achievement OverHeat v-if="isDisplayed.OverHeat">
            <RoundStar/>
            <p>OVERHEAT! You broke the theory. <span v-if="isDisplayed.OverHeat>1">x{{isDisplayed.OverHeat}}</span></p>
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
    background: #00d5ff;
    width: 8rem;
    max-width: 100vw;
    height: 8rem;
    animation: popup 15s ease-in-out forwards;
    display: flex;
    align-items: center;

    &[Godwin] {
        background: #de0000;
        svg {
            color: white;
        }
    }
    &[AbsoluteZero] {
        background: #000;
        border: 1px solid #fff;
        svg {
            color: white;
        }
    }
    @at-root [Hot]  {
        position: relative;
        animation: fire-drop 3s infinite ease-in-out;
        [achievement] {
            background: radial-gradient(red, orange);
            // border: 1px solid #000;
            // filter: url(#Flames);
            
            @keyframes fire-drop {
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

            border: 1px solid orange;
            svg {
                color: white;
            }
        }

        @keyframes fire {
            0% {bottom: -15%; opacity: 1;}
            100% {bottom: 90%; opacity: 0;}
        }
        [flame] {
            position: absolute;
            width: 100%;
            height: 12rem;
            bottom: 4rem;
            filter: contrast(2);
            mix-blend-mode: color-burn;
            z-index: -1;
            animation: flame-in-out 15s linear forwards;

            @keyframes flame-in-out {
                0%, 100% {
                    opacity: 0;
                }
                5%, 95% {
                    opacity: 1;
                }
            }

            $n: 20;
            $t: 1.16;
            $r: 10;
            > div {
                position: absolute;  
                background: #fa0;
                border-radius: 50%;
                animation: fire $t * 1s infinite ease-in;
                filter: blur(26px);
                @for $i from 0 to $n {
                    &:nth-child(#{$i + 1}) {
                    $rand: random() + 1;
                    width: $rand * $r * 1%; height: $rand * $r * 1%;
                    animation-delay: random() * $t * -1s;
                    left: random() * 70%;
                    &:after {
                        content: "";
                        display: block;
                        position: absolute;
                        top: random() * -30%; left: random() * 30%;
                        width: 30%; height: 60%;
                        background: red;
                        border-radius: 50%;
                    }
                    }
                } 
            }

        }
    }

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