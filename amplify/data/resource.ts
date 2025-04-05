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
                status: a.string().required(),
                /** Zeitpunkt der Messung */
                timestamp: a.datetime().required()
              })
              .identifier(['timestamp']) // Optional, du kannst auch eine andere ID verwenden
        })
        .authorization((allow) => [allow.publicApiKey()]);

    /**
     * Typ für das definierte Schema basierend auf ClientSchema
     */
    export type Schema = ClientSchema<typeof schema>;

    /**
     * Konfiguriert die Datenverarbeitung und Autorisierung für die Amplify API.
     */
    export const data = defineData({
      schema,
      authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
          expiresInDays: 30,
        },
      },
    });
