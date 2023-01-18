<script setup lang="ts">
import SearchInput from './components/search/SearchInput.vue';
import SearchResult from './components/search/SearchResult.vue';
import SearchButton from './components/search/SearchButton.vue';
import LangSwitch from './components/setting/LangSwitch.vue';
// import ThemeSwitch from './components/setting/ThemeSwitch.vue';
import HeatMeter from './components/cosmetic/HeatMeter.vue';
import GlassButton from './components/cosmetic/GlassButton.vue';
import MdiGithub from '~icons/mdi/github';
import Thermometer from './components/cosmetic/Thermometer.vue';
import Achievement from './components/cosmetic/Achievement.vue';
import AuthSection from './components/auth/AuthSection.vue';
</script>
<template>
  <HeatMeter search-app>
    <LangSwitch/>
    <!-- <ThemeSwitch/> -->
    <AuthSection/>
		<h1 title="Six Degrees Of Wiki Adventure">🌡️ 6° of Wiki Adventure</h1>
    <section more-about>
      <!-- <GlassButton href="#">About</GlassButton> -->
      <GlassButton href="https://github.com/Sacramentix/six-degrees-of-wiki-adventure-front"><MdiGithub/> Github</GlassButton>
    </section>
		<SearchInput/>
    <SearchButton/>
    <Thermometer/>
		<SearchResult/>
    <Achievement/>
	</HeatMeter>
</template>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
}

body {
  background: #000;
  color: #eee;
  overflow-y: scroll;
}

main {
  h1 {
    margin: 1em 15px 0 15px;
    font-size: calc(3em + 5vw);
    line-height: 1em;
    text-align: center;
  }
  &[search-app] {
    padding: 1em;
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: center;
    // align-content: ;
  }
  > [lang-switch] {
    position: absolute;
    margin: 15px;
    top: 0;
    left: 0;
  }
  > [theme-switch] {
    position: absolute;
    margin: 15px;
    top: 0;
    right: 0;
  }
  [more-about] {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
}

</style>
