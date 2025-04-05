<template>
  <div class="temperature-monitor">
    <h1>Aktuelle Temperatur</h1>
    <ul v-if="temperatures.length">
      <li v-for="(temp, index) in temperatures" :key="index">
        Temperatur: {{ temp.status }}°C ({{ temp.timestamp }})
      </li>
    </ul>
    <p v-else>Keine Temperaturdaten verfügbar</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

// Reaktive Variable als Liste, um mehrere Temperaturdaten zu speichern
const temperatures = ref<Array<{ status: string; timestamp: string }>>([]);

// Subscription-Referenzen
let createSub: { unsubscribe: () => void } | null = null;
let updateSub: { unsubscribe: () => void } | null = null;

onMounted(() => {
  // Abonnieren von onCreateTemperature
  createSub = client.models.Temperature.onCreate().subscribe({
    next: (newTemperature: any) => {
      console.log('Neuer Temperaturdatensatz empfangen:', newTemperature);
      // Neuen Eintrag an den Anfang der Liste setzen
      temperatures.value = [newTemperature, ...temperatures.value];
    },
    error: (err: any) => {
      console.error('Fehler beim Empfangen von onCreateTemperature:', err);
    },
  });

  // Abonnieren von onUpdateTemperature
  updateSub = client.models.Temperature.onUpdate().subscribe({
    next: (updatedTemperature: any) => {
      console.log('Temperatur Update empfangen:', updatedTemperature);
      // Vorhandenen Eintrag aktualisieren
      temperatures.value = temperatures.value.map(temp =>
          temp.timestamp === updatedTemperature.timestamp ? updatedTemperature : temp
      );
    },
    error: (err: any) => {
      console.error('Fehler beim Empfangen von onUpdateTemperature:', err);
    },
  });
});

onUnmounted(() => {
  createSub?.unsubscribe();
  updateSub?.unsubscribe();
});
</script>
