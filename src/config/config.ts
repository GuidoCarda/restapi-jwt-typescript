export default {
  jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
  DB: {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    database: process.env.DB_NAME || "restapi_jwt",
    password: process.env.DB_PASSWORD || "",
  },
};
