<template>
  <div>
    <h2>Temperatur-Dashboard</h2>
    <iframe
        :src="grafanaUrl"
        width="100%"
        height="600"
    ></iframe>
  </div>
</template>

<script setup>
  const grafanaUrl = "https://g-36c53baaa0.grafana-workspace.eu-central-1.amazonaws.com/goto/dPwgAXTHg?orgId=1";
</script>
