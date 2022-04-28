export const ROUTES_CONSTANTS = {
  users: {
    create: "/api/users",
    getAll: "/api/users",
    getById: "/api/users/:id",
    update: "/api/users/:id",
    delete: "/api/users/:id",    
  },
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
    validate: "/api/auth/validate"
  }
}