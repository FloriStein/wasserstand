<template>
  <div>
    <h2>Temperatur-Dashboard</h2>
    <iframe
        :src="grafanaUrl"
        width="1000"
        height="600"
    ></iframe>
  </div>
</template>

<script setup>

const grafanaUrl = "http://3.124.186.35:3000/dashboard/snapshot/tza0M1LdSxmziYH6ThRcYU461Yb6qYI5";
</script>
