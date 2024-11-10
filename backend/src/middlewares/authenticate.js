import jwt from "jsonwebtoken";

import pool from "../db/index.js";

const authenticate = async (req, res, next) => {
  try {
    // get the jwt from the request's cookies //
    const jsonwebtoken = req.cookies.jwt;

    // jwt does not exist //
    if (!jsonwebtoken) {
      return res.status(401).json({ error: "Unauthorized - No JWT provided." });
    }

    // verify the jwt //
    const decodedJWT = jwt.verify(jsonwebtoken, process.env.JWT_SECRET);

    // jwt is invalid //
    if (!decodedJWT) {
      return res.status(401).json({ error: "Unauthorized - JWT invalid." });
    }

    // get user //
    let result = await pool.query(
      `SELECT id, username, fullname, gender, profile_picture, created_at, last_signed_in, updated_at
       FROM users 
       WHERE id = $1;`,
      [decodedJWT.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // set user in req //
    req.user = result.rows[0];

    // move onto next route //
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export default authenticate;
