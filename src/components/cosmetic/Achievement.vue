<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import RoundStar from '~icons/ic/round-star';
import { achieve, Achievement } from '../../store/achievements/index';
const achievements = ref<HTMLDivElement>();
achieve(Achievement.Godwin);
</script>
<template>
    <div achievements ref="achievements">
        <div achievement>
            <RoundStar/>
            <p>100<span>G</span> - Godwin Law</p>
        </div>
        <div achievement>
            <RoundStar/>
            <p>100<span>G</span> - Godwin Law</p>
        </div>
        <div achievement>
            <RoundStar/>
            <p>100<span>G</span> - Godwin Law</p>
        </div>
        <div achievement>
            <RoundStar/>
            <p>100<span>G</span> - Godwin Law</p>
        </div>
        <div achievement>
            <RoundStar/>
            <p>100<span>G</span> - Godwin Law</p>
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
    bottom: 25px;
    border-radius: 50px;
    background: #ff9100;
    width: 100px;
    height: 100px;
    display: none;
    animation: popup 10s ease-in-out forwards;

    svg {
        position: absolute;
        width: 80px;
        height: 80px;
        top: 10px;
        left: 10px;
        border-radius: 40px;
        object-fit: contain;
        animation: innerpopup 10s ease-in-out forwards;
    }

    p {
        position: absolute;
        height: 22px;
        color: #ffffff;
        font-weight: bold;
        font-size: 22px;
        top: -5px;
        bottom: 0;
        left: 120px;
        margin: auto;
        animation: fade-in-out 10s linear forwards;
    }

    span {
        position: relative;
        background: #ffffff;
        color: #ff9100;
        font-size: 14px;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin: 0 4px;
        border-radius: 10px;
        overflow: hidden;
        text-align: center;
    }

        
    @keyframes popup {
        0%{
            transform: scale(0);
            transform-origin: center;
        }
        5% {
            transform: scale(1.1);
        }
        10% {
            transform: scale(1);
        }
        15% {
            width: 100px;
        }
        20%{
            width: 400px;
        }
        80%{
            width: 400px;
        }
        85% {
            width: 100px;
        }
        90% {
            transform: scale(1);
        }
        95% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(0);
        }
    }

    @keyframes innerpopup {
        0%{
            transform: scale(0);
            transform-origin: center;
        }
        10% {
            transform: scale(1.1);
        }
        15% {
            transform: scale(1);
        }
        85% {
            transform: scale(1);
        }
        90% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(0);
        }
    }

    @keyframes fade-in-out {
        0%{
            opacity: 0;
        }
        20%{
            opacity: 0;
        }
        25% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        80% {
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }

}
</style>