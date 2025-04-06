<script setup lang="ts">
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import temperatureGraph from './components/temperatureGraph.vue'
  import ShowLiveTemperature from "@/components/ShowLiveTemperature.vue";
  import Testbutton from "@/components/testbutton.vue";
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ signOut }">
        <ShowLiveTemperature />
        <testbutton />
        <!--<temperatureGraph />-->
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

