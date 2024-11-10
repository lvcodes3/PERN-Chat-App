import { Router } from "express";

import authenticate from "../middlewares/authenticate.js";

import {
  sendMessage,
  getConversations,
  getMessages,
} from "../controllers/messages.controller.js";

const router = Router();

// @desc send message //
// @route POST http://localhost:5050/api/messages/send/:id //
router.post("/send/:id", authenticate, sendMessage);

// @desc get all conversations & users belonging to the currently logged-in user //
// @route GET http://localhost:5050/api/messages/conversations //
router.get("/conversations", authenticate, getConversations);

// @desc get messages belonging to a conversation based on the other user id //
// @route GET http://localhost:5050/api/messages/:id //
router.get("/:id", authenticate, getMessages);

export default router;
