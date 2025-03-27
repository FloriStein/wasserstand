<script setup>
import { ref, onMounted } from "vue";
import { API } from "aws-amplify";

const temperature = ref(null);
const errorMessage = ref("");

const fetchTemperature = async () => {
  try {
    const response = await API.get("myRestApi", "/temperature", {});
    temperature.value = response.temperature; // API gibt { temperature: 22 } zurück
  } catch (error) {
    errorMessage.value = "Fehler beim Abrufen der Temperaturdaten.";
    console.error("API Fehler:", error);
  }
};

onMounted(fetchTemperature);
</script>

<template>
  <div>
    <h1>Temperaturdaten</h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-else-if="temperature !== null">Aktuelle Temperatur: {{ temperature }}°C</p>
    <p v-else>Lade Daten...</p>
  </div>
</template>
