const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const dblink = process.env.MONGO_URI;

const userRoutes = require("./routes/user");
const passcodeRoutes = require("./routes/passcode");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/passcode", passcodeRoutes);

// ✅ Vercel Serverless: Export app (NO app.listen in production)
module.exports = app;
