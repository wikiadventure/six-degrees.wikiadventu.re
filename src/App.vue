<script setup lang="ts">
import SearchInput from './components/SearchInput.vue';
import SearchResult from './components/SearchResult.vue';
import SearchButton from './components/SearchButton.vue';
import LangSwitch from './components/lang/LangSwitch.vue';

</script>

<template>
  <main search-app>
    <LangSwitch/>
		<h1>Six Degrees Of Wiki Adventure</h1>
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
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}


main h1 {
  margin: 2rem 0;
  font-size: calc(3em + 5vw);
  text-align: center;
}

main {
  &[search-app] {
    // margin: auto;
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
      > .q-icon {
        vertical-align: baseline;
      }
      vertical-align: middle;
    }
  }
}

</style>
