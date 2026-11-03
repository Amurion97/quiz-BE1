import swaggerJsdoc = require("swagger-jsdoc");
import * as swaggerUi from "swagger-ui-express";
import { Express } from "express";

const spec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Quiz API", version: "1.0.0" },
    servers: [{ url: "/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        Role: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "admin" },
          },
        },
        RoleListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "array", items: { $ref: "#/components/schemas/Role" } },
          },
        },
      },
    },
  },
  apis: ["./src/router/v1/*.ts"],
});

export function mountSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}