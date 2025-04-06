import { defineFunction } from '@aws-amplify/backend';
import { data } from '../../data/resource'; // Zugriff auf dein Temperaturmodell

export const logTemperature = defineFunction({
    name: 'logTemperature',
    entry: './handler.ts', // oder './index.ts' je nach Datei
    // Zugriff auf das data-Backend erlauben

});
