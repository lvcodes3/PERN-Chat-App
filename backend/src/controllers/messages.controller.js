import pool from "../db/index.js";

import { io, getReceiverSocketId } from "../socket/socket.js";

// @desc send message //
// @route POST http://localhost:5050/api/messages/send/:id //
export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId = req.user.id;

    // check if a conversation already exists between the sender and receiver //
    let result = await pool.query(
      `SELECT cp1.conversation_id 
       FROM conversation_participants cp1 
       JOIN conversation_participants cp2 
       ON cp1.conversation_id = cp2.conversation_id 
       WHERE cp1.user_id = $1 AND cp2.user_id = $2;`,
      [senderId, receiverId]
    );

    let conversationId;
    // conversation exists //
    if (result.rows.length > 0) {
      conversationId = result.rows[0].conversation_id;
    }
    // conversation dne //
    else {
      // create a new conversation //
      result = await pool.query(
        `INSERT INTO conversations 
         DEFAULT VALUES 
         RETURNING id;`
      );

      if (result.rowCount === 0) {
        return res
          .status(500)
          .json({ error: "Failed to create a new conversation." });
      }

      conversationId = result.rows[0].id;

      // add sender and receiver to conversation_participants //
      result = await pool.query(
        `INSERT INTO conversation_participants (conversation_id, user_id) 
         VALUES ($1, $2), ($1, $3);`,
        [conversationId, senderId, receiverId]
      );

      if (result.rowCount < 2) {
        return res
          .status(500)
          .json({ error: "Failed to add participants to the conversation." });
      }
    }

    // insert the message into the messages table //
    result = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, message)
       VALUES ($1, $2, $3) 
       RETURNING *;`,
      [conversationId, senderId, message]
    );

    if (result.rowCount === 0) {
      return res.status(500).json({ error: "Failed to send message." });
    }

    // socket.io functionality (if receiver is online) //
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", result.rows[0]);
    }

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Send Message Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc get all conversations & users belonging to the currently logged-in user //
// @route GET http://localhost:5050/api/messages/conversations //
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // query explanation //
    // self-joining conversation_participants to find other users in the same conversation //
    // cp represents rows where the logged-in user is a participant //
    // other_cp represents all participants in the same conversation as cp //
    // joining users to fetch details about each participant from other_cp //
    // where clause filters for rows where only retrieving conversations of the logged-in user //
    // excludes the logged-in user's own record, so only other particiapnts in each conversation included //
    let result = await pool.query(
      `SELECT cp.conversation_id, u.id AS user_id, u.username, u.fullname, u.profile_picture
       FROM conversation_participants cp
       JOIN conversation_participants other_cp ON cp.conversation_id = other_cp.conversation_id 
       JOIN users u ON u.id = other_cp.user_id
       WHERE cp.user_id = $1 AND other_cp.user_id != $1;`,
      [userId]
    );

    return res.status(200).json(result.rows || []);
  } catch (err) {
    console.error("Get Conversations Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc get messages belonging to a conversation based on the other user id //
// @route GET http://localhost:5050/api/messages/:id //
export const getMessages = async (req, res) => {
  try {
    const { id: otherId } = req.params;
    const senderId = req.user.id;

    // check if a conversation already exists between the sender and other//
    let result = await pool.query(
      `SELECT cp1.conversation_id 
       FROM conversation_participants cp1 
       JOIN conversation_participants cp2 
       ON cp1.conversation_id = cp2.conversation_id 
       WHERE cp1.user_id = $1 AND cp2.user_id = $2;`,
      [senderId, otherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Conversation does not exist." });
    }

    // conversation exists //
    let conversationId = result.rows[0].conversation_id;

    // get messages for the conversation //
    result = await pool.query(
      `SELECT * 
       FROM messages
       WHERE conversation_id = $1
       ORDER BY created_at ASC;`,
      [conversationId]
    );

    return res.status(200).json(result.rows || []);
  } catch (err) {
    console.error("Get Messages Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
