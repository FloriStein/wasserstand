<template>
  <div>
    <h2>Temperatur-Dashboard</h2>
    <iframe
        :src="grafanaUrl"
        width="1000"
        height="600"
    ></iframe>
    <!--<iframe src="http://3.124.186.35:3000/d-solo/deidxzfb8u03ka/gettemperaturedashboard?orgId=1&from=1744197768902&to=1744198068902&timezone=browser&panelId=1&__feature.dashboardSceneSolo" width="1000" height="600" frameborder="0"></iframe>-->
  </div>
</template>

<script setup>
//const grafanaUrl = "http://localhost:3000/dashboard/snapshot/AkeieYgzyXM1zNcyfo9vSlsiExRi31XP";
//const grafanaUrl = "http://localhost:3000/dashboard/snapshot/W91DxCEb3buo6ks1C7Vm4cfognmKAAt5";
//const grafanaUrl = "http://3.124.186.35:3000/dashboard/snapshot/YpEDASTcx1vfL6YgNP1lBAYxb3kbKRXq";
const grafanaUrl = "http://3.124.186.35:3000/dashboard/snapshot/tza0M1LdSxmziYH6ThRcYU461Yb6qYI5";
</script>
