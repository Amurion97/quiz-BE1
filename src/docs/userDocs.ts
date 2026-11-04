export const userDocs = {
  "/users/login": {
    post: {
      tags: ["Users"],
      summary: "Authenticate a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginResponse" },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, message: "Wrong email or password" },
            },
          },
        },
        "403": {
          description: "Account is locked",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, message: "Locked account" },
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
  "/users/register": {
    post: {
      tags: ["Users"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterInput" },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterResponse" },
            },
          },
        },
        "409": {
          description: "Email already in use",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, message: "Used email" },
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
  "/users": {
    get: {
      tags: ["Users"],
      summary: "List all active users",
      security: [{ bearerAuth: [] }],
      responses: {
        "201": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
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
  "/users/{id}": {
    get: {
      tags: ["Users"],
      summary: "Get a user by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "User ID",
        },
      ],
      responses: {
        "201": {
          description: "User found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: { $ref: "#/components/schemas/User" },
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
      tags: ["Users"],
      summary: "Soft delete a user",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "User ID",
        },
      ],
      responses: {
        "200": {
          description: "User deleted",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "delete user success!" },
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
  "/users/password-change": {
    put: {
      tags: ["Users"],
      summary: "Change password for the authenticated user",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/PasswordChangeInput" },
          },
        },
      },
      responses: {
        "201": {
          description: "Password changed",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "Password changed" },
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
          description: "Server error or current password incorrect",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, message: "error in editUser" },
            },
          },
        },
      },
    },
  },
  "/users/editRole/{id}": {
    put: {
      tags: ["Users"],
      summary: "Promote a user to teacher role",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "User ID",
        },
      ],
      responses: {
        "201": {
          description: "User role updated",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "update role success" },
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
  "/users/reset-request": {
    post: {
      tags: ["Users"],
      summary: "Request a password reset OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/PasswordResetRequestInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Reset email sent",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "Email sent" },
            },
          },
        },
        "404": {
          description: "Email not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, data: "Email not found" },
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
  "/users/otp-check": {
    post: {
      tags: ["Users"],
      summary: "Verify password reset OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/OTPCheckInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "OTP valid",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "OTP correct" },
            },
          },
        },
        "404": {
          description: "OTP incorrect or expired",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, data: "OTP incorrect or expired" },
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
  "/users/reset-password": {
    post: {
      tags: ["Users"],
      summary: "Reset password using OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ResetPasswordInput" },
          },
        },
      },
      responses: {
        "200": {
          description: "Password reset",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MessageResponse" },
              example: { success: true, data: "Password reset" },
            },
          },
        },
        "404": {
          description: "OTP incorrect or expired",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
              example: { success: false, data: "OTP incorrect or expired" },
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
