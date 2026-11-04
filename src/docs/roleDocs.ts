export const roleDocs = {
  "/roles": {
    get: {
      tags: ["Roles"],
      summary: "List all roles",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of roles",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Role" },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Missing or expired token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, message: "No token provided" },
            },
          },
        },
        "500": {
          description: "Server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    post: {
      tags: ["Roles"],
      summary: "Create a new role",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RoleInput" },
          },
        },
      },
      responses: {
        "201": {
          description: "Role created",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "Add role success!" },
            },
          },
        },
        "401": {
          description: "Missing or expired token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
  "/roles/{id}": {
    put: {
      tags: ["Roles"],
      summary: "Update a role",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Role ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RoleInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Role updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "update role success!" },
            },
          },
        },
        "401": {
          description: "Missing or expired token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Roles"],
      summary: "Delete a role",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "Role ID",
        },
      ],
      responses: {
        "200": {
          description: "Role deleted",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "delete role success!" },
            },
          },
        },
        "401": {
          description: "Missing or expired token",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
