<script setup lang="ts">
import { useAuth } from '../../composables/auth';

const { login, user } = useAuth();
</script>
<template>
   <section>
        <button @click="login">sign in</button>
        <div v-if="user">{{ user.profile.email }}</div>
   </section>
</template>
<style lang="scss">

</style>