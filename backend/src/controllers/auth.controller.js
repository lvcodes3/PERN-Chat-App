import bcryptjs from "bcryptjs";

import pool from "../db/index.js";

import generateJWT from "../utils/generateJWT.js";

// @desc user sign up //
// @route POST http://localhost:5050/api/auth/signup //
export const signup = async (req, res) => {
  try {
    const { username, fullname, password, passwordConfirmation, gender } =
      req.body;

    // data validation //
    if (
      !username ||
      !fullname ||
      !password ||
      !passwordConfirmation ||
      !gender
    ) {
      return res
        .status(400)
        .json({ error: "Please provide all required data fields." });
    }

    const validUsername = username.trim().toLowerCase();
    if (!validUsername) {
      return res.status(400).json({ error: "Invalid username." });
    }

    // check if username already exists //
    let result = await pool.query(
      `SELECT id 
       FROM users 
       WHERE username = $1;`,
      [validUsername]
    );
    if (result.rows.length === 1) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const validFullname = fullname
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    if (!validFullname) {
      return res.status(400).json({ error: "Invalid full name." });
    }

    const validPassword = password.trim();
    const validPasswordConfirmation = passwordConfirmation.trim();
    if (!validPassword || !validPasswordConfirmation) {
      return res.status(400).json({ error: "Invalid password." });
    }

    if (validPassword !== validPasswordConfirmation) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    if (gender !== "male" && gender !== "female" && gender !== "other") {
      return res.status(400).json({ error: "Invalid gender." });
    }

    // hash password //
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(validPassword, salt);

    // set profile picture based on gender //
    let profilePic;
    switch (gender) {
      case "male":
        profilePic = `https://avatar.iran.liara.run/public/boy?username=${validUsername}`;
        break;
      case "female":
        profilePic = `https://avatar.iran.liara.run/public/girl?username=${validUsername}`;
        break;
      default:
        profilePic = `https://www.acbanet.org/wp-content/uploads/2021/03/profile-photo.png`;
        break;
    }

    // insert user into database //
    result = await pool.query(
      `INSERT INTO users (username, fullname, password, gender, profile_picture) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, username, fullname, gender, profile_picture, created_at, last_signed_in, updated_at;`,
      [validUsername, validFullname, hashedPassword, gender, profilePic]
    );
    if (result.rows.length !== 1) {
      return res.status(400).json({ error: "Failed to sign up user." });
    }

    // generate jwt and set it as a cookie //
    generateJWT(result.rows[0].id, res);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Sign Up Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc user login //
// @route POST http://localhost:5050/api/auth/login //
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // data validation //
    const validUsername = username.trim().toLowerCase();

    if (!validUsername || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required data fields." });
    }

    // check if username exists //
    let result = await pool.query(
      `SELECT id, password 
       FROM users 
       WHERE username = $1;`,
      [validUsername]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // check if password is valid //
    const isValidPassword = await bcryptjs.compare(
      password,
      result.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // update last_signed_in of user //
    const userId = result.rows[0].id;
    result = await pool.query(
      `UPDATE users 
       SET last_signed_in = CURRENT_TIMESTAMP 
       WHERE id = $1 
       RETURNING id, username, fullname, gender, profile_picture, created_at, last_signed_in, updated_at;`,
      [userId]
    );
    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Failed to login." });
    }

    // generate jwt and set it as a cookie //
    generateJWT(result.rows[0].id, res);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc user logout //
// @route POST http://localhost:5050/api/auth/logout //
export const logout = async (req, res) => {
  try {
    // clear cookie with matching login security settings //
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc authenticate the user using middleware then proceed to get users //
// @route GET http://localhost:5050/api/auth/users //
// export const getUsers = async (req, res) => {
//   try {
//     let result = await pool.query(
//       `SELECT
//         u.id AS user_id,
//         u.username,
//         u.fullname,
//         u.profile_picture,
//         COALESCE(cp_existing.conversation_id, NULL) AS conversation_id
//        FROM users u
//        LEFT JOIN (
//         SELECT cp1.conversation_id, cp2.user_id
//         FROM conversation_participants cp1
//         JOIN conversation_participants cp2
//         ON cp1.conversation_id = cp2.conversation_id
//         WHERE cp1.user_id = $1 AND cp2.user_id != $1
//        ) AS cp_existing ON cp_existing.user_id = u.id
//        WHERE u.id != $1;`,
//       [req.user.id]
//     );

//     return res.status(200).json(result.rows || []);
//     // let result = await pool.query(
//     //   `SELECT '' AS conversation_id, id AS user_id, username, fullname, profile_picture,
//     //    FROM users
//     //    WHERE id != $1;`,
//     //   [req.user.id]
//     // );

//     // return res.status(200).json(result.rows || []);
//   } catch (err) {
//     console.error("Get Users Error:", err);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// };

// @desc authenticate the user using middleware then proceed to auth route //
// @route GET http://localhost:5050/api/auth //
export const auth = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    console.error("Auth Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc authenticate the user using middleware then proceed to update their user data //
// @route PUT http://localhost:5050/api/auth/update //
export const update = async (req, res) => {
  try {
    const { username, fullname, gender } = req.body;

    // data validation //
    if (!username || !fullname || !gender) {
      return res
        .status(400)
        .json({ error: "Please provide all required data fields." });
    }

    const validUsername = username.trim().toLowerCase();
    if (!validUsername) {
      return res.status(400).json({ error: "Invalid username." });
    }

    const validFullname = fullname
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    if (!validFullname) {
      return res.status(400).json({ error: "Invalid full name." });
    }

    if (gender !== "male" && gender !== "female" && gender !== "other") {
      return res.status(400).json({ error: "Invalid gender." });
    }

    // no changes in previous and new values //
    if (
      req.user.username === validUsername &&
      req.user.fullname === validFullname &&
      req.user.gender === gender
    ) {
      return res.status(200).json(req.user);
    }

    // initialize dynamic fields and query //
    const updateFields = [];
    let updateQuery = "UPDATE users SET ";
    let fieldCounter = 1;

    // change detected in username //
    if (req.user.username !== validUsername) {
      // check if username already exists (excluding the current user) //
      let result = await pool.query(
        `SELECT id 
         FROM users 
         WHERE username = $1 AND id != $2;`,
        [validUsername, req.user.id]
      );
      if (result.rows.length === 1) {
        return res.status(400).json({ error: "Username already exists." });
      }

      updateFields.push(validUsername);
      updateQuery += `username = $${fieldCounter}`;
      fieldCounter++;
    }

    // change detected in fullname //
    if (req.user.fullname !== validFullname) {
      updateFields.push(validFullname);
      updateQuery += `${
        updateFields.length > 1 ? "," : ""
      } fullname = $${fieldCounter}`;
      fieldCounter++;
    }

    // change detected in gender //
    if (req.user.gender !== gender) {
      updateFields.push(gender);
      updateQuery += `${
        updateFields.length > 1 ? "," : ""
      } gender = $${fieldCounter}`;
      fieldCounter++;

      // set profile picture based on gender //
      let profilePic;
      switch (gender) {
        case "male":
          profilePic = `https://avatar.iran.liara.run/public/boy?username=${validUsername}`;
          break;
        case "female":
          profilePic = `https://avatar.iran.liara.run/public/girl?username=${validUsername}`;
          break;
        default:
          profilePic = `https://www.acbanet.org/wp-content/uploads/2021/03/profile-photo.png`;
          break;
      }
      updateFields.push(profilePic);
      updateQuery += `, profile_picture = $${fieldCounter}`;
      fieldCounter++;
    }

    // finalize query //
    updateFields.push(req.user.id);
    updateQuery += `
      , updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${fieldCounter}
      RETURNING id, username, fullname, gender, profile_picture, created_at, last_signed_in, updated_at;
    `;

    // update //
    let result = await pool.query(updateQuery, updateFields);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Failed to update user." });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// @desc authenticate the user using middleware then proceed to update their password //
// @route PUT http://localhost:5050/api/auth/updatePassword //
export const updatePassword = async (req, res) => {
  try {
    const { password, newPassword, newPasswordConfirmation } = req.body;

    // data validation //
    if (!password || !newPassword || !newPasswordConfirmation) {
      return res
        .status(400)
        .json({ error: "Please provide all required data fields." });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ error: "New passwords do not match." });
    }

    // check if original password is valid //
    let result = await pool.query(
      `SELECT id, password 
       FROM users 
       WHERE id = $1;`,
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValidPassword = await bcryptjs.compare(
      password,
      result.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid original password." });
    }

    // check if new password is the same as current password //
    const isSamePassword = await bcryptjs.compare(
      newPassword,
      result.rows[0].password
    );
    if (isSamePassword) {
      return res.status(200).json(req.user);
    }

    // hash password //
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // update password //
    result = await pool.query(
      `UPDATE users 
       SET password = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2
       RETURNING id, username, fullname, gender, profile_picture, created_at, last_signed_in, updated_at;`,
      [hashedPassword, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Failed to update password." });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Update Password Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
