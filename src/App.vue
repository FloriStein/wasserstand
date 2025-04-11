<script setup lang="ts">
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
  import ShowLiveTemperature from "@/components/ShowLiveTemperature.vue";
  import tempGrafanaApi from "@/components/tempGrafanaAPI.vue";
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ signOut }">
        <ShowLiveTemperature />
        <!--<temperatureGraph />-->
        <tempGrafanaApi />
        <!--<tempGrafana />-->
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>

