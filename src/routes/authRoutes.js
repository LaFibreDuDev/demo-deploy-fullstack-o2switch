import express from "express";
import AuthController from "../controllers/AuthController.js";

// Express app
const app = express();

// Authentication routes
app.post("/signup", AuthController.signupUser);
app.post("/login", AuthController.loginUser);
app.delete("/logout", AuthController.logout);

export default app;