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
const grafanaUrl = "https://g-601ffdfc7e.grafana-workspace.eu-central-1.amazonaws.com/dashboard/snapshot/9qm0rBo5mRLlyr7WhJHXwBwn7NqhcC86";
</script>
