import { defineBackend } from "@aws-amplify/backend";

import {
  AuthorizationType,
  LambdaIntegration,
  RestApi,
  Cors,
} from "aws-cdk-lib/aws-apigateway";
import { myApiFunction } from "./functions/api-function/resource";

const backend = defineBackend({
  myApiFunction,
});

const apiStack = backend.createStack("api-stack");

const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "myRestApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // Passe dies an deine Anforderungen an
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

const lambdaIntegration = new LambdaIntegration(
    backend.myApiFunction.resources.lambda
);

const temperaturePath = myRestApi.root.addResource("temperature");
temperaturePath.addMethod("GET", lambdaIntegration, {
  authorizationType: AuthorizationType.NONE, // Passe dies an deine Sicherheitsanforderungen an
});
