<template>
  <div class="temperature-monitor">
    <h1>Aktuelle Temperatur</h1>
    <ul v-if="temperatures.length">
      <li v-for="(temp, index) in temperatures" :key="index">
        Temperatur: {{ temp.temperature }}°C ({{ temp.timestamp }})
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

interface TemperatureEntry {
  temperature: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

const temperatures = ref<TemperatureEntry[]>([]);

let createSub: { unsubscribe: () => void } | null = null;
let updateSub: { unsubscribe: () => void } | null = null;

onMounted(() => {
  createSub = client.models.Temperature.onCreate().subscribe({
    next: (newTemperature: TemperatureEntry) => {
      console.log('👀 Vollständiges onCreate-Objekt:', newTemperature);

      if (!newTemperature || !newTemperature.temperature) {
        console.warn('⚠️ Kein gültiger Temperaturwert empfangen:', newTemperature);
        return;
      }

      temperatures.value = [newTemperature, ...temperatures.value];
    },
    error: (err: any) => {
      console.error('❌ Fehler bei onCreateTemperature:', err);
    },
  });


  updateSub = client.models.Temperature.onUpdate().subscribe({
    next: (updatedTemperature: TemperatureEntry) => {
      if (!updatedTemperature) {
        console.warn('Ungültiges Temperatur-Update empfangen:', updatedTemperature);
        return;
      }

      console.log('Temperatur Update empfangen:', updatedTemperature);
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
