<template>
  <div>
    <canvas v-if="!loading && !error" ref="chartRef" width="1000" height="400"></canvas>
    <div v-if="loading">Lade Daten...</div>
    <div v-if="error" style="color: red">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const chartRef = ref(null)
const loading = ref(true)
const error = ref(null)

const API_KEY = 'glsa_gNvUekzDyJYM2hHD8ziJVVvcQ4jRuTxi_8d0f43f5'
const TIMESTREAM_UID = 'deidwt3me2igwe'
const GRAFANA_HOST = 'http://3.124.186.35:3000'

// Zeitbereich: letzte 5 Minuten
const rangeFrom = new Date(Date.now() - 5 * 60 * 1000).toISOString()
const rangeTo = new Date().toISOString()

// SQL-Query aus deinem Dashboard
const QUERY = `
  SELECT time, measure_value::bigint as temperature
  FROM "temperaturDB"."temperatur_table"
  WHERE measure_name = 'temperature'
  ORDER BY time DESC
    LIMIT 20
`

const formatTimestamp = ts => new Date(ts).toLocaleTimeString()

onMounted(async () => {
  try {
    const res = await fetch(`${GRAFANA_HOST}/api/ds/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        queries: [
          {
            refId: 'A',
            datasource: { uid: TIMESTREAM_UID },
            rawSql: QUERY,
            format: 'table',
            intervalMs: 10000,
            maxDataPoints: 100
          }
        ],
        range: { from: rangeFrom, to: rangeTo }
      })
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const json = await res.json()
    const values = json.results.A.frames[0].data.values
    const times = values[0]
    const temps = values[1]

    new Chart(chartRef.value, {
      type: 'line',
      data: {
        labels: times.map(formatTimestamp),
        datasets: [
          {
            label: 'Temperatur (°C)',
            data: temps,
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.1)',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperatur (°C)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Zeit'
            }
          }
        },
        plugins: {
          legend: {
            display: false // Versteckt die Legende
          },
          tooltip: {
            enabled: true // Tooltip bleibt aktiviert
          }
        }
      }
    })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
canvas {
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
