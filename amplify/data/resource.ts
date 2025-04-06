import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Definiert das Datenmodell für Temperaturwerte,
 * die von einem IoT-Gerät (z. B. ESP32) gesendet werden.
 */
const schema = a
    .schema({
        Temperature: a
            .model({
                /** Temperaturwert als Text, z. B. "23.5" */
                temperature: a.string().required(),
                /** Zeitpunkt der Messung */
                timestamp: a.datetime().required(),
                /** Automatisch gesetzter Erstellungszeitpunkt */

                createdAt: a.datetime().required(),
                /** Automatisch gesetzter Aktualisierungszeitpunkt */
                updatedAt: a.datetime().required(),
            })
            .identifier(['timestamp']) // Optional, falls timestamp als ID genutzt wird
    })
    .authorization((allow) => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
