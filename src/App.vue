<script setup lang="ts">
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import temperatureGraph from './components/temperatureGraph.vue'
  import ShowLiveTemperature from "@/components/ShowLiveTemperature.vue";
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ signOut }">
        <ShowLiveTemperature />
        <!--<temperatureGraph />-->
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

