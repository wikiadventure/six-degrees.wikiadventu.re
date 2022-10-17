<script setup lang="ts">
import SearchInput from './components/search/SearchInput.vue';
import SearchResult from './components/search/SearchResult.vue';
import SearchButton from './components/search/SearchButton.vue';
import LangSwitch from './components/setting/LangSwitch.vue';
import ThemeSwitch from './components/setting/ThemeSwitch.vue';

</script>

<template>
  <main search-app>
    <LangSwitch/>
    <ThemeSwitch/>
		<h1 title="Six Degrees Of Wiki Adventure">6° of Wiki Adventure</h1>
    <section more-about>
      <a href="#">About</a>
		  <a href="https://github.com/Sacramentix/six-degrees-of-wiki-adventure-front"><q-icon name="mdi-github" /> Github</a>
    </section>
		<SearchInput/>
    <SearchButton/>
		<SearchResult/>
	</main>
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

body {
  background: #fff;
  color: #000;
  overflow-y: scroll;
  &.body--dark {
    background: #000;
    color: #eee;
  }
}

main h1 {
  margin: 1em 15px 0 15px;
  font-size: calc(3em + 5vw);
  line-height: 1em;
  text-align: center;
}

main {
  &[search-app] {
    padding: 1em;
    display: flex;
    gap: 30px;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    // max-width: 120ch;
    // position: relative;
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
    > a {
      text-decoration: none;
      color: #000;
      font-size: 2em;
      background: #0001;
      padding: .5em 1em;
      border-radius: 100vmax;
      backdrop-filter: blur(1px);
      &:hover {
        backdrop-filter: drop-shadow(0 0 5px cyan);
      }
      @at-root .body--dark & {
        color: #fff;
        background: #fff1;
      }
      > .q-icon {
        vertical-align: baseline;
      }
      vertical-align: middle;
    }
  }
}

</style>
