<template>
    <div thermo-meter>
        <div liquid-mercury></div>
        <div graduation-rule>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<style>
[thermo-meter] {
    position: relative;
    box-sizing: content-box;
    height: 40px;
    width: min(1000px, 90vw);
    border: 4px solid #222;
    background: #3330;
    /* background: linear-gradient(90deg, cyan , cyan 30%, yellow, orange, red); */
    background-size: 10% 100%;
    border-radius: 100vmax;
    filter: url(#GelA);
    [liquid-mercury] {
        position: absolute;
        background: linear-gradient(90deg, cyan , cyan 30%, yellow, orange, red) no-repeat left;
        background-size: min(1000px, 90vw) 100%;
        height: 100%;
        width: 0%;
        margin-right: auto;
        border-radius: 100vmax;
        transition: width cubic-bezier(.54,.87,.47,1) 1s;
    }
    [graduation-rule] {
        position: absolute;
        height: 50%;
        width: 100%;
        display: flex;
        z-index: 10;
        > div {
            flex: 1;
            border-left: 3px solid #222;
            &:first-of-type {
                border-left: none;
            }
        }
    }
    &::before {
        content: "";
        position: absolute;
        top: -26px;
        left: -10px;
        border: 4px solid #222;
        background: cyan;
        width: 80px;
        aspect-ratio: 1/1;
        border-radius: 100vmax;
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
}
</style>