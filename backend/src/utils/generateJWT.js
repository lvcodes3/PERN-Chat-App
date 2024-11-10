import jwt from "jsonwebtoken";

const generateJWT = (userId, res) => {
  try {
    // generate jwt //
    const jsonwebtoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // generate cookie with embedded jwt //
    res.cookie("jwt", jsonwebtoken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true, // mitigates XSS (cross-site scripting) attacks
      sameSite: "strict", // mitigates CSRF (cross-site request forgery) attacks
      secure: process.env.NODE_ENV !== "development", // only send cookie over HTTPS in production
    });

    return jsonwebtoken;
  } catch (err) {
    console.error("Error generating JWT:", err);
    throw new Error("Failed to generate JWT.");
  }
};

export default generateJWT;
