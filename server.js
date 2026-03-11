const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const dblink = process.env.MONGO_URI;

// ✅ PRODUCTION: Cached MongoDB connection for Vercel serverless
let cached = { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(dblink, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

const userRoutes = require("./routes/user");
const passcodeRoutes = require("./routes/passcode");

const app = express();

// ✅ Connect DB on first request (serverless cold start)
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (e) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/passcode", passcodeRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

module.exports = app;
