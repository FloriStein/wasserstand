import { defineFunction } from '@aws-amplify/backend';

export const iotCommunicator = defineFunction({
    name: 'iotCommunicator',
    entry: './handler.ts',
});
