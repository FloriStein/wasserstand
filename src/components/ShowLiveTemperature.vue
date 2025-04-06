<template>
  <div class="temperature-monitor">
    <h1>Aktuelle Temperatur</h1>
    <p v-if="currentTemperature">Temperatur: {{ currentTemperature.temperature }}°C ({{ currentTemperature.timestamp }})</p>
    <p v-else>Keine Temperaturdaten verfügbar</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

interface TemperatureEntry {
  temperature: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

// Speichern der aktuellen Temperatur
const currentTemperature = ref<TemperatureEntry | null>(null);

let createSub: { unsubscribe: () => void } | null = null;
let updateSub: { unsubscribe: () => void } | null = null;

onMounted(() => {
  // onCreate abonnieren, um neue Temperaturen zu erhalten
  createSub = client.models.Temperature.onCreate().subscribe({
    next: (newTemperature: TemperatureEntry) => {
      console.log('👀 Vollständiges onCreate-Objekt:', newTemperature);

      if (!newTemperature || !newTemperature.temperature) {
        console.warn('⚠️ Kein gültiger Temperaturwert empfangen:', newTemperature);
        return;
      }

      // Setze die aktuelle Temperatur, falls eine neue empfangen wird
      currentTemperature.value = newTemperature;
    },
    error: (err: any) => {
      console.error('❌ Fehler bei onCreateTemperature:', err);
    },
  });

  // onUpdate abonnieren, um aktualisierte Temperaturen zu erhalten
  updateSub = client.models.Temperature.onUpdate().subscribe({
    next: (updatedTemperature: TemperatureEntry) => {
      if (!updatedTemperature) {
        console.warn('Ungültiges Temperatur-Update empfangen:', updatedTemperature);
        return;
      }

      console.log('Temperatur Update empfangen:', updatedTemperature);

      // Falls der empfangene Temperaturwert eine Änderung enthält, aktualisiere den aktuellen Wert
      if (currentTemperature.value?.timestamp === updatedTemperature.timestamp) {
        currentTemperature.value = updatedTemperature;
      }
    },
    error: (err: any) => {
      console.error('Fehler beim Empfangen von onUpdateTemperature:', err);
    },
  });
});

onUnmounted(() => {
  // Abbestellen der Subscriptions, wenn die Komponente unmontiert wird
  createSub?.unsubscribe();
  updateSub?.unsubscribe();
});
</script>
