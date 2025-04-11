import { type ClientSchema, a, defineData, defineFunction } from '@aws-amplify/backend';

const schema = a.schema({
    // Modell für Temperaturwerte
    Temperature: a.model({
        temperature: a.string().required(),
        timestamp: a.datetime().required(),
        createdAt: a.datetime().required(),
        updatedAt: a.datetime().required(),
    })
        .identifier(['timestamp'])
        .authorization((allow) => [allow.publicApiKey()]),  // <-- Hier ergänzen

    // Custom Mutation zum Speichern in Timestream
    storeInTimestream: a
        .mutation()
        .arguments({
            temperature: a.string().required(),
            timestamp: a.datetime().required(),
        })
        .returns(a.boolean())
        .authorization((allow) => [allow.publicApiKey()]),

    // Custom Mutation zum Senden an Lambda
    sendDataToLambda: a
        .mutation()
        .arguments({
            temperature: a.string().required(),
            timestamp: a.datetime().required(),
        })
        .returns(a.boolean())
        .authorization((allow) => [allow.publicApiKey()])
});

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
