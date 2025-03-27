import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from 'aws-amplify';
import { parseAmplifyConfig } from "aws-amplify/utils";
import outputs from '../amplify_outputs.json';


// Amplify Konfiguration aus den generierten Outputs laden
const amplifyConfig = parseAmplifyConfig(outputs);

Amplify.configure({
    ...amplifyConfig,
    API: {
        ...amplifyConfig.API,
        REST: outputs.custom?.API ?? {}, // Sicherstellen, dass API-Daten existieren
    },
});

createApp(App).mount("#app");