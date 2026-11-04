export const schemas = {
  ErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: false },
      message: { type: "string", example: "Error message" },
    },
  },

  Role: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "admin" },
    },
  },

  RoleInput: {
    type: "object",
    properties: {
      name: { type: "string", example: "teacher" },
    },
    required: ["name"],
  },

  User: {
    type: "object",
    properties: {
      id: { type: "integer", example: 1 },
      name: { type: "string", example: "John Doe", nullable: true },
      email: { type: "string", example: "john@example.com" },
      role: { $ref: "#/components/schemas/Role" },
      phoneNumber: { type: "string", example: "+84 123 456 789", nullable: true },
      address: { type: "string", example: "123 Main St", nullable: true },
      isDeleted: { type: "boolean", example: false },
      isLocked: { type: "boolean", example: false },
    },
  },

  UserInfo: {
    type: "object",
    properties: {
      email: { type: "string", example: "john@example.com" },
      role: { type: "integer", example: 3 },
      name: { type: "string", example: "John Doe", nullable: true },
    },
  },

  LoginInput: {
    type: "object",
    properties: {
      email: { type: "string", example: "admin@gmail.com" },
      password: { type: "string", example: "123123" },
    },
    required: ["email", "password"],
  },

  LoginResponseData: {
    type: "object",
    properties: {
      info: { $ref: "#/components/schemas/UserInfo" },
      token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/LoginResponseData" },
    },
  },

  RegisterInput: {
    type: "object",
    properties: {
      name: { type: "string", example: "John Doe" },
      email: { type: "string", example: "john@example.com" },
      password: { type: "string", example: "password123" },
    },
    required: ["email", "password"],
  },

  RegisterResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: { type: "string", example: "john@example.com" },
    },
  },

  PasswordChangeInput: {
    type: "object",
    properties: {
      password: { type: "string", example: "oldPassword123" },
      newPassword: { type: "string", example: "newPassword123" },
    },
    required: ["password", "newPassword"],
  },

  PasswordResetRequestInput: {
    type: "object",
    properties: {
      email: { type: "string", example: "john@example.com" },
    },
    required: ["email"],
  },

  OTPCheckInput: {
    type: "object",
    properties: {
      email: { type: "string", example: "john@example.com" },
      OTP: { type: "string", example: "123456" },
    },
    required: ["email", "OTP"],
  },

  ResetPasswordInput: {
    type: "object",
    properties: {
      email: { type: "string", example: "john@example.com" },
      OTP: { type: "string", example: "123456" },
      newPassword: { type: "string", example: "newPassword123" },
    },
    required: ["email", "OTP", "newPassword"],
  },

  MessageResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", example: true },
      data: { type: "string", example: "Operation completed successfully" },
    },
  },
};
