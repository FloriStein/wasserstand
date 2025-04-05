<template>
  <div class="temperature-monitor">
    <h1>Aktuelle Temperatur</h1>
    <p v-if="temperature">Temperatur: {{ temperature.status }}°C</p>
    <p v-else>Keine Temperaturdaten verfügbar</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { generateClient } from "aws-amplify/data";
import type { Schema } from '../../amplify/data/resource';

// Amplify-Datenbank-Client für das Schema generieren
const client = generateClient<Schema>();

// Reaktive Variable für Temperaturdaten
const temperature = ref<{ status: string; timestamp: string } | null>(null);

// Subscription-Referenzen
let temperatureSub: { unsubscribe: () => void } | null = null;

onMounted(() => {
  // Subscription für Temperaturänderungen
  temperatureSub = client.models.Temperature.onCreate().subscribe({
    next: (createdTemperature: any) => {
      console.log('Temperatur Update empfangen:', createdTemperature);
      temperature.value = createdTemperature;
    },
    error: (err: any) => {
      console.error('Fehler beim Empfangen von Temperatur-Updates:', err);
    },
  });
});

onUnmounted(() => {
  // Subscription abmelden
  temperatureSub?.unsubscribe();
});
</script>

