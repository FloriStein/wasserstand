import { IoTDataPlaneClient, GetThingShadowCommand } from "@aws-sdk/client-iot-data-plane";
import type { APIGatewayProxyHandler } from "aws-lambda";

const iotClient = new IoTDataPlaneClient({ region: process.env.AWS_REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  const thingName = "DeinThingName"; // Ersetze durch den Namen deines IoT-Things

  try {
    const command = new GetThingShadowCommand({ thingName });
    const { payload } = await iotClient.send(command);
    const shadowData = JSON.parse(new TextDecoder().decode(payload));
    const temperature = shadowData.state.reported.temperature;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Passe dies an deine Anforderungen an
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify({ temperature }),
    };
  } catch (error) {
    console.error("Fehler beim Abrufen des Thing Shadows:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Interner Serverfehler" }),
    };
  }
};
