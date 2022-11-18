<script lang="ts" setup>
import { wiki } from '../../store/search';

</script>
<template>
    <main heat-meter :degree="wiki.degree">
        <svg width="0" height="0">
            <filter id="CamLight" color-interpolation-filters="sRGB">
                <feFlood style="flood-color: var(--light-color);" flood-opacity=".5" result="flood"/>
                <feComposite in="flood" in2="SourceGraphic" operator="out" result="composite1"/>
                <feGaussianBlur in="composite1" result="blur" stdDeviation="75"/>
                <feOffset dx="0" dy="0" result="offset"/>
                <feComposite in="offset" in2="SourceGraphic" operator="atop" result="composite2"/>
            </filter>
            <filter id="FrostFlake" color-interpolation-filters="sRGB">
                <feTurbulence baseFrequency="0.1" numOctaves="5" type="fractalNoise"/>
                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 5 -3"/>
                <feComposite in2="SourceAlpha" operator="in"/>
                <feMorphology operator="dilate" radius="2.7" result="result3"/>
                <feTurbulence baseFrequency="0.121" numOctaves="2" result="result91"/>
                <feDisplacementMap in="result3" in2="result91" result="result4" scale="10" xChannelSelector="R"/>
                <feFlood flood-color="rgb(255,255,255)" flood-opacity="0.04"/>
                <feComposite in2="result4" operator="in" result="result2"/>
                <feComposite in="result2" in2="SourceGraphic"/>        
            </filter>
            <filter id="ColdLiquid" color-interpolation-filters="sRGB">
                <feFlood flood-color="rgb(0,10,10)" result="result9"/>
                <feGaussianBlur in="SourceGraphic" result="result8" stdDeviation="7"/>
                <feTurbulence id="idLiquidTurbulence" baseFrequency="0.025" numOctaves="2" result="result7" type="fractalNoise"/>
                <feColorMatrix result="result5" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 -0.75 "/>
                <feComposite in="result8" in2="result7" operator="out" result="result6"/>
                <feDisplacementMap in="result5" in2="result6" result="result4" scale="100"/>
                <feComposite in="result8" in2="result4" k1="1" k3="0.5" operator="arithmetic" result="result2"/>
                <feComposite in="SourceGraphic" in2="result2" operator="in" result="fbSourceGraphic"/>
                <feMerge result="result10">
                    <feMergeNode in="result9"/>
                    <feMergeNode in="fbSourceGraphic"/>
                </feMerge>
                <feComposite in2="SourceAlpha" operator="in" result="result11"/>
            </filter>
            <filter id="WarmLiquid" color-interpolation-filters="sRGB">
                <feFlood flood-color="rgb(15,8,0)" result="result9"/>
                <feGaussianBlur in="SourceGraphic" result="result8" stdDeviation="7"/>
                <feTurbulence id="idLiquidTurbulence" baseFrequency="0.025" numOctaves="2" result="result7" type="fractalNoise"/>
                <feColorMatrix result="result5" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 2 -0.75 "/>
                <feComposite in="result8" in2="result7" operator="out" result="result6"/>
                <feDisplacementMap in="result5" in2="result6" result="result4" scale="100"/>
                <feComposite in="result8" in2="result4" k1="1" k3="0.5" operator="arithmetic" result="result2"/>
                <feComposite in="SourceGraphic" in2="result2" operator="in" result="fbSourceGraphic"/>
                <feMerge result="result10">
                    <feMergeNode in="result9"/>
                    <feMergeNode in="fbSourceGraphic"/>
                </feMerge>
                <feComposite in2="SourceAlpha" operator="in" result="result11"/>
            </filter>
            <filter id="Glass" color-interpolation-filters="sRGB">
                <feGaussianBlur in="SourceGraphic" result="result8" stdDeviation="5" id="feGaussianBlur12198" />
                <feComposite result="result18" operator="xor" in2="result8" in="SourceGraphic" id="feComposite12200" />
                <feComposite in2="result18" result="result16" operator="arithmetic" k2="0.5" k1="1" in="result8" id="feComposite12202" />
                <feComposite in="result16" operator="atop" result="result6" in2="result8" id="feComposite12204" />
                <feOffset in="result6" result="result17" id="feOffset12206" />
                <feDisplacementMap result="result4" scale="100" yChannelSelector="A" xChannelSelector="A" in="result17" in2="result16" id="feDisplacementMap12208" />
                <feComposite k3="1" in="result17" operator="arithmetic" result="result2" in2="result4" id="feComposite12210" />
                <feComposite operator="out" in="result2" result="fbSourceGraphic" in2="result17" id="feComposite12212" />
                <feComposite result="result14" operator="over" in2="fbSourceGraphic" in="fbSourceGraphic" id="feComposite12214" />
                <feComposite in="result14" operator="in" in2="SourceGraphic" result="result15" id="feComposite12216" />
            </filter>
            <filter id="GelA" color-interpolation-filters="sRGB">
                <feOffset dx="7" dy="7" in="SourceAlpha" result="result3" id="feOffset12464-0" />
                <feGaussianBlur stdDeviation="8" in="result3" result="result1" id="feGaussianBlur12466-1" />
                <feComposite operator="in" in2="result1" in="SourceGraphic" result="result2" id="feComposite12468-2" />
                <feComposite operator="out" result="fbSourceGraphic" in="result2" in2="result2" id="feComposite12470-9" />
                <feColorMatrix result="fbSourceGraphicAlpha" in="fbSourceGraphic" values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0 0 0 0 4 0 " id="feColorMatrix12472-2" />
                <feGaussianBlur result="result0" in="fbSourceGraphicAlpha" stdDeviation="2" id="feGaussianBlur12474-8" />
                <feSpecularLighting specularExponent="20" specularConstant="1.20000005" surfaceScale="3" lighting-color="#ffffff" result="result1" in="result0" id="feSpecularLighting12478-2"> <feDistantLight azimuth="235" elevation="45" id="feDistantLight12476-2" />
                </feSpecularLighting>
                <feComposite operator="in" result="result2" in="result1" in2="fbSourceGraphicAlpha" id="feComposite12480-9" />
                <feComposite in="fbSourceGraphic" operator="arithmetic" k2="2" k3="2" in2="result2" result="result91" id="feComposite12482-2" k1="0" k4="0" />
                <feBlend mode="multiply" in2="result91" id="feBlend12484-2" />
            </filter>
            <filter id="Rock">
                <feTurbulence seed="10" baseFrequency="0.12 0.02" numOctaves="10" type="fractalNoise" id="feTurbulence13329" />
                <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.7 0 " result="result5" id="feColorMatrix13331" />
                <feComposite in2="result5" operator="out" in="SourceGraphic" id="feComposite13333" />
                <feMorphology result="result3" radius="1.3" operator="dilate" id="feMorphology13335" />
                <feTurbulence seed="25" type="turbulence" baseFrequency="0.08 0.05" numOctaves="8" result="result91" id="feTurbulence13337" />
                <feDisplacementMap result="result4" scale="5" yChannelSelector="G" xChannelSelector="R" in="result3" in2="result91" id="feDisplacementMap13339" />
                <feSpecularLighting specularExponent="35" specularConstant="1" surfaceScale="2" lighting-color="rgb(255,255,255)" result="result1" in="result4" id="feSpecularLighting13343">
                    <feDistantLight azimuth="235" elevation="75" id="feDistantLight13341" />
                </feSpecularLighting>
                <feComposite operator="in" result="result2" in="result1" in2="result4" id="feComposite13345" />
                <feComposite k3="1" k2="1" operator="arithmetic" result="result4" in="result4" in2="result2" id="feComposite13347" />
                <feBlend mode="multiply" in2="result4" id="feBlend13349" />
            </filter>
             <filter id="Smoky">
                <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" seed="2">
                <animate attributeName="baseFrequency" dur="30s" values="0.02;0.005;0.02" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="30" />
            </filter>
            <filter id="Flames" filterUnits="objectBoundingBox" x="0%" y="-100%" width="100%" height="300%">
                <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise"
                        stitchTiles="stitch"/>
                <feOffset dy="0" result="off1">
                    <animate attributeType="XML" attributeName="dy" 
                            from="0" to="-500" dur="10s" repeatCount="indefinite" /> 
                </feOffset>
                <feOffset in="noise" dy="60" result="off2">
                    <animate attributeType="XML" attributeName="dy" 
                            from="300" to="0" dur="6s" repeatCount="indefinite" /> 
                </feOffset>
                <feMerge result="scrolling-noise">
                    <feMergeNode in="off1"/>
                    <feMergeNode in="off2"/>
                </feMerge>
                <feComponentTransfer result="brighter-noise">
                    <feFuncA type="gamma" amplitude="1" exponent="0.5"/>
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="brighter-noise" operator="in" result="gradient-noise"/>
                <feComponentTransfer result="threshhold">
                    <feFuncR type="discrete" tableValues="0 1"/>
                    <feFuncG type="discrete" tableValues="0 1"/>
                    <feFuncB type="discrete" tableValues="0 1"/>
                    <feFuncA type="discrete" tableValues="0 1"/>
                </feComponentTransfer>
                <feFlood flood-color="#ff9" result="yellow"/>
                <feComposite in2="threshhold" in="yellow" operator="in" result="yellow-threshhold"/>
                <feFlood flood-color="#f33" result="red"/>
                <feComponentTransfer in="SourceGraphic" result="exponent-gradient">
                    <feFuncA type="gamma" exponent="3"/>
                </feComponentTransfer>
                <feComposite in="red" in2="exponent-gradient" operator="in" result="red-gradient"/>
                <feComposite in2="threshhold" in="red-gradient" operator="in" result="red-gradient-threshhold"/>
                <feMerge>
                    <feMergeNode in="yellow-threshhold"/>
                    <feMergeNode in="red-gradient-threshhold"/>
                </feMerge>
            </filter>
        </svg>
        <div heat-background></div>
        <slot></slot>
    </main>
</template>
<style lang="scss">
[heat-meter] {
    min-height: 200vh;
    background: transparent;
    color: #fff;
    position: relative;
    [heat-background] {
        position: absolute;
        inset: 0;
        background: black;
        z-index: -2;
        &::before {
            content: "";
            position: absolute;
            inset: 0;
            background: transparent;
            z-index: -3;
        }
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            background: transparent;
            z-index: -1;
        }
    }
    &[degree="0"] {
        
    }
    &[degree="1"] {
        --heat-rgb: 45, 151, 250;
        --light-color: rgb(45, 168, 250);
        [heat-background] {
            filter: url(#FrostFlake) url(#CamLight);
        }
    }
    &[degree="2"] {
        --heat-rgb: 34, 228, 238;
        --light-color: rgb(34, 238, 238);
        [heat-background] {
            filter: url(#ColdLiquid) url(#CamLight);
        }
    }
    &[degree="3"] {
        --heat-rgb: 250, 246, 45;
        --light-color: rgb(255, 246, 77);
        [heat-background] {
            filter: url(#WarmLiquid) url(#CamLight);
        }
    }
    &[degree="4"] {
        --heat-rgb: 250, 195, 45;
        --light-color: rgb(255, 202, 77);
        [heat-background] {
            filter: url(#CamLight);
        }
    }
    &[degree="5"] {
        --heat-rgb: 250, 120, 45;
        --light-color: rgb(242, 85, 33);
        [heat-background] {
            filter: url(#CamLight);
        }
    }
    &[degree="6"] {
        --heat-rgb: 250, 45, 45;
        --light-color: rgb(250, 67, 67);
        [heat-background] {
            filter: url(#CamLight);
        }
    }
    --heat-color: rgb(var(--heat-rgb));
}
</style>