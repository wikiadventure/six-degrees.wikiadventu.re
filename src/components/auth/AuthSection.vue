<script setup lang="ts">
import { useAuth } from '../../composables/auth';

const { getAccount, openLoginPopup, account, authStatus } = useAuth();
getAccount();
</script>
<template>
   <section>
      <!-- <div>{{ authStatus }}</div>
      <button v-if="authStatus == 'noSession'" @click="openLoginPopup">sign in</button>
      <div>{{ account?.name }}</div> -->
      <!-- <div v-else>not connected</div> -->
   </section>
</template>
<style >

</style>