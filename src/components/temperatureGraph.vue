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
const grafanaUrl = "https://g-36c53baaa0.grafana-workspace.eu-central-1.amazonaws.com/d/behlnsryyqpz4b/temperaturedashboard?orgId=1&from=1743530044792&to=1743530344792";
</script>
