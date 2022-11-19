<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

// icons
import MakiReligiousJewish from '~icons/maki/religious-jewish';
import MdiTemperatureKelvin from '~icons/mdi/temperature-kelvin';
import CodiconFlame from '~icons/codicon/flame';
import GameIconsBurningSkull from '~icons/game-icons/burning-skull';
import MaterialSymbolsStar from '~icons/material-symbols/star'


import { achieve, Achievement, useAchievement, AchievementKey, Achievements } from '../../store/achievements';

const { t } = useI18n({ useScope: 'local' });

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
    const n = Achievements.value[a];
    if (displayAchievementOnN.includes(n)) {
        isDisplayed[a] = n;
        setTimeout(() => isDisplayed[a] = 0, 15000);
    }
})

const randomCssVar = (n:number) => Array.from({length: 5}, (_, i) => i).map(i=>{return`--r${i}:${Math.random()};`}).join("");
console.log('random : ', randomCssVar(5));

</script>
<template>
    <div achievements ref="achievements">
        <div achievement Godwin v-if="isDisplayed.Godwin">
            <figure></figure>
            <div>{{ t('Godwin') }} <span v-if="isDisplayed.Godwin>1">x{{isDisplayed.Godwin}}</span></div>
        </div>
        <div achievement AbsoluteZero v-if="isDisplayed.AbsoluteZero">
            <MdiTemperatureKelvin/>
            <div>{{ t('AbsoluteZero') }}  <span v-if="isDisplayed.AbsoluteZero>1">x{{isDisplayed.AbsoluteZero}}</span></div>
        </div>
        <div Hot v-if="isDisplayed.Hot">
            <div flame>
                <div v-for="_ in 50" :style="randomCssVar(5)"></div>
            </div>
            <div achievement>
                <CodiconFlame/>
                <div>{{ t('Hot') }}  <span v-if="isDisplayed.Hot>1">x{{isDisplayed.Hot}}</span></div>
            </div>
        </div>
        <div OverHeat v-if="isDisplayed.OverHeat">
            <div flame>
                <div v-for="_ in 50" :style="randomCssVar(5)"></div>
            </div>
            <div achievement>
                <GameIconsBurningSkull/>
                <div>{{ t('OverHeat') }}  <span v-if="isDisplayed.OverHeat>1">x{{isDisplayed.OverHeat}}</span></div>
            </div>
        </div>
        <div achievement Over9000 v-if="isDisplayed.Over9000">
            <MaterialSymbolsStar/>
            <div>It's over 9000<span v-if="isDisplayed.AbsoluteZero>1">x{{isDisplayed.AbsoluteZero}}</span>
                <p>{{ t('Over9000') }} </p>
            </div>
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
    color: #fff;

    &[Godwin] {
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

    &[AbsoluteZero] {
        background: #000;
        border: 1px solid #fff;
        svg {
            color: white;
        }
    }

    &[Over9000] {
        box-sizing: content-box;
        border: 5px solid #FFF467; 
        background:
            radial-gradient(
                circle at 2.2rem 2.2rem, #fffd, #fffc .5rem, #fff0 1rem
            ),
            radial-gradient(
                circle at 2.5rem 2.5rem, #FAB637f5, #9a5500ef
            ),
            ;
        svg {
            color: #AA2A1D;
            padding: 3rem;
            min-width: 2rem;
            min-height: 2rem;
        }
        box-shadow: 0 0 50px 0 #ffff00bb, 0 0 7px 0 #fff47e, 0 0 5px 0 #fff47e;
    }
    @at-root [Hot] {
        --flame-1: orange;
        --flame-2: red;
        --speed: 1.16;
        [achievement] {
            background: radial-gradient(red, orange);
            // border: 1px solid #000;
            // filter: url(#Flames);

            border: 1px solid orange;
        }
    }
    @at-root [OverHeat] {
        --flame-1: white;
        --flame-2: orange;
        --speed: .9;
        [achievement] {
            background: radial-gradient(orange, white);
            // border: 1px solid #000;
            // filter: url(#Flames);

            border: 1px solid white;
            color: #fff;
            text-shadow: 0 0 3px #000, 0 0 1px #000;
        }
    }

    
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
    
    @at-root :is([Hot], [OverHeat])  {
        position: relative;
        animation: fire-drop 3s infinite ease-in-out;

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
            --s: 1.5rem;
            > div {
                position: absolute;  
                background: var(--flame-1);
                border-radius: 50%;
                animation: fire calc(var(--speed) * 1s) infinite ease-in;
                filter: blur(26px);
                --size: calc(1rem + var(--r0) * var(--s));
                width: var(--size); height: var(--size);
                animation-delay: calc(var(--r1) * var(--speed) * -1s);
                left: clamp(var(--size),calc(var(--r2) * 100%), calc(100% - var(--size) * 2));
                &:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: calc(var(--r3) * -30%); left: calc(var(--r4) * 30%);
                    width: 30%; height: 60%;
                    background: var(--flame-2);
                    border-radius: 50%;
                }
            }

        }
    }

    > :is(svg, figure) {
        box-sizing: content-box;
        padding: 1rem;
        min-width: 6rem;
        min-height: 6rem;
        transform-origin: center;
        animation: innerpopup 15s ease-in-out forwards;
        margin: 0;

    }

    > div {
        font-size: 1.5rem;
        animation: fade-in-out 15s linear forwards;
        margin: 0 1em 0 0;
    }
    p {
        font-size: 0.75em;
        margin: 0;
    }

    span {
        background: currentColor;
        // color: #ff9100;
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
<i18n lang="yaml">
en:
    Godwin: Godwin law.
    AbsoluteZero: 0 Kelvin! Entropy is a lie.
    Hot: 6° of seperation reached! Can it be hotter?
    OverHeat: OVERHEAT! You broke the theory.
    Over9000: Get over 9000 paths in 1 search.
fr:
    Godwin: Point Godwin.
    AbsoluteZero: 0 Kelvin! L'entropie est un mensonge.
    Hot: 6° de seperation atteint! Peut on faire plus chaud?
    OverHeat: Surchauffe! Vous avez enfreint la théorie.
    Over9000: Obtenez plus de 9000 chemins en 1 recherche.
</i18n>