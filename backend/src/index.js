import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { app, server } from "./socket/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/messages.route.js";

const PORT = process.env.PORT || 5050;

// middlewares //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// routes //
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// main listen //
server.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}...`);
});
