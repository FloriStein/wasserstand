import { ref, onMounted, onUnmounted } from 'vue';
import mqtt from 'mqtt';

// AWS IoT Core WebSocket Endpoint (ohne `https://`!)
const AWS_IOT_ENDPOINT = 'a2tnej84qk5j60-ats.iot.eu-central-1.amazonaws.com';
const CLIENT_ID = `mqtt_${Math.random().toString(16).slice(3)}`;

// MQTT-Client
let client: mqtt.MqttClient | null = null;
const temperature = ref<string | null>(null);

export function useAwsIot() {
     onMounted(() => {
         console.log('🟡 Initialisiere MQTT-Client...');

         if (!client) {
             client = mqtt.connect(`wss://${AWS_IOT_ENDPOINT}:443/mqtt`, {
                  clientId: CLIENT_ID,
                  clean: true,
                  connectTimeout: 4000,
                  username: 'unused',
                  password: 'unused',
                  reconnectPeriod: 5000,
                  protocolVersion: 4
              });

              client.on('connect', () => {
                  console.log('✅ Verbunden mit AWS IoT Core');
                  client?.subscribe('esp32/temperatur', (err) => {
                      if (!err) {
                          console.log('📡 Erfolgreich auf esp32/temperatur abonniert');
                      } else {
                          console.error('❌ Fehler beim Abonnieren:', err);
                      }
                  });
              });

              client.on('message', (topic, message) => {
                  console.log(`📩 Nachricht empfangen: ${topic} -> ${message.toString()}`);
                  if (topic === 'esp32/temperatur') {
                      temperature.value = message.toString();
                      console.log(`🌡️ Temperatur gespeichert: ${temperature.value}`);
                  }
              });

              client.on('error', (error) => {
                  console.error('❌ MQTT-Fehler:', error);
              });

              client.on('close', () => {
                  console.log('⚠️ MQTT-Verbindung geschlossen');
              });
          } else {
              console.log('⚠️ MQTT-Client existiert bereits.');
          }
      });


    onUnmounted(() => {
        if (client) {
            client.end();
            client = null;
        }
    });

    return { temperature };
}


export function disconnectFromMqtt() {
    if (client) {
        client.end(false, () => {
            console.log('🔌 Verbindung zu AWS IoT Core getrennt.');
            client = null;
        });
    } else {
        console.error('⚠ Keine aktive MQTT-Verbindung.');
    }
}
