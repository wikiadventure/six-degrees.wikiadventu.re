<template>
    <figure thermo-meter aria-hidden="true">
        <figure liquid-bulb></figure>
        <figure liquid-mercury></figure>
        <figure graduation-rule>
            <figure></figure>
            <figure></figure>
            <figure></figure>
            <figure></figure>
            <figure></figure>
            <figure></figure>
        </figure>
    </figure>
</template>
<style>
[thermo-meter] {
    --thermo-gradient: linear-gradient(90deg, cyan ,  cyan 10%, rgb(31, 223, 31), yellow, orange, red) no-repeat left;
    --thermo-pulse-animation: thermo-pulse 5s ease-in-out infinite alternate;

    padding: 0;
    margin: 0;
    position: relative;
    box-sizing: content-box;
    height: 40px;
    width: min(1000px, 90vw);
    border: 1px solid #222;
    background: #3330;
    background-size: 10% 100%;
    border-radius: 100vmax;

    figure {
        padding: 0;
        margin: 0;
    }
    [liquid-mercury] {
        position: absolute;
        height: 100%;
        margin-right: auto;
        margin-left: 40px;
        border-radius: 100vmax;
        transition: width cubic-bezier(.54,.87,.47,1) 1s;

        &, &::before {
            background: var(--thermo-gradient);
            background-size: min(1000px, 90vw) 100%;
        }
        &::before, &::after {
            content: "";
            position: absolute;
        }
        &::before {
            inset: 0;
            background: var(--thermo-gradient);
            background-size: min(1000px, 90vw) 100%;
            filter: blur(15px);
            animation: var(--thermo-pulse-animation);
        }
        &::after {
            inset: 2px;
            border-radius: 20px;
            border: 5px solid #fff;
            border-bottom-color: #222;
            border-width: 5px 5px 1px 0;
            opacity: .75;
            filter: blur(2px);
        }
    }
    [graduation-rule] {
        position: absolute;
        height: 50%;
        width: 100%;
        display: flex;
        z-index: 10;
        > figure {
            flex: 1;
            border-left: 3px solid #222;
            &:first-of-type {
                border-left: none;
            }
        }
    }
    [liquid-bulb] {
        position: absolute;
        top: -20px;
        left: -10px;
        border: 1px solid #222;
        background: cyan;
        width: 80px;
        aspect-ratio: 1/1;
        border-radius: 100vmax;
        &::before, &::after {
            content: "";
            position: absolute;
        }
        &::before {
            inset: 0;
            background: cyan;
            filter: blur(15px);
            animation: var(--thermo-pulse-animation);
        }
        &::after {
            inset: 3px;
            border-radius: 100%;
            border: 5px solid #fff;
            border-bottom-color: #222;
            border-width: 5px 0 1px 5px;
            filter: blur(2px);
            opacity: .75;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 0;
        border-radius: 100vmax;
        left: 10px;
        background: cyan;
        height: 40px;
        aspect-ratio: 2/1;
    }
}
[heat-meter] {
    &[degree="0"] [thermo-meter] [liquid-mercury] {
        width: 0%;
    }
    &[degree="1"] [thermo-meter] [liquid-mercury] {
        width: calc(16.66% + 20px);
    }
    &[degree="2"] [thermo-meter] [liquid-mercury] {
        width: calc(33.33% + 20px);
    }
    &[degree="3"] [thermo-meter] [liquid-mercury] {
        width: calc(50% + 20px);
    }
    &[degree="4"] [thermo-meter] [liquid-mercury] {
        width: calc(66.66% + 20px);
    }
    &[degree="5"] [thermo-meter] [liquid-mercury] {
        width: calc(83.33% + 20px);
    }
    &[degree="6"] [thermo-meter] [liquid-mercury] {
        width: 100%;
    }
    &[degree="7"] [thermo-meter] [liquid-mercury] {
        width: 100%;
    }
    &[degree="8"] [thermo-meter] [liquid-mercury] {
        width: 100%;
    }
    &[degree="9"] [thermo-meter] [liquid-mercury] {
        width: 100%;
    }
    /* Bigger than 9 */
    &:is(:not(
        [degree="0"],[degree="1"],[degree="2"],
        [degree="3"],[degree="4"],[degree="5"],
        [degree="6"],[degree="7"],[degree="8"],
        [degree="9"]
    )) [thermo-meter] [liquid-mercury] {
        width: 100%;
    }
}

@keyframes thermo-pulse {
    0% {
        opacity: 1;
    }
    100% {
        opacity: .4;
    }
}
</style>