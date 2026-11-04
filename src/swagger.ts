import swaggerJsdoc = require("swagger-jsdoc");
import * as swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { paths } from "./docs";
import { schemas } from "./docs/schemas";

const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Quiz API", version: "1.0.0" },
    servers: [{ url: "/v1" }],
    paths,
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas,
    },
  },
  apis: [],
});

export function mountSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
