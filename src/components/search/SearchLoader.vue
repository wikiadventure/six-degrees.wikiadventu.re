<template>
    <div search-loader></div>
</template>
<style lang="scss">
[search-loader] {
    padding: 25px;
    border: 5px solid #fff;
    filter: drop-shadow(0 0 5px var(--heat-color));
    text-align: center;
    line-height: 10ch;
    // vertical-align: middle;
    width: 10ch;
    aspect-ratio: 1 / 1;
    animation: searchLoader 1s infinite linear;
}
@keyframes searchLoader {
    0% {   transform: rotate(0deg); border-radius: 50%; }
    50% {  transform: rotate(90deg); border-radius: 5%; }
    100% { transform: rotate(180deg); border-radius: 50%; }
}
</style>