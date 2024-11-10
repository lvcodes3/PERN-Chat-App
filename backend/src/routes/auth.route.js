import { Router } from "express";

import authenticate from "../middlewares/authenticate.js";

import {
  login,
  logout,
  signup,
  // getUsers,
  auth,
  update,
  updatePassword,
} from "../controllers/auth.controller.js";

const router = Router();

// @desc user sign up //
// @route POST http://localhost:5050/api/auth/signup //
router.post("/signup", signup);

// @desc user login //
// @route POST http://localhost:5050/api/auth/login //
router.post("/login", login);

// @desc user logout //
// @route POST http://localhost:5050/api/auth/logout //
router.post("/logout", logout);

// // @desc authenticate the user using middleware then proceed to get users //
// // @route GET http://localhost:5050/api/auth/users //
// router.get("/users", authenticate, getUsers);

// @desc authenticate the user using middleware then proceed to auth route //
// @route GET http://localhost:5050/api/auth //
router.get("/", authenticate, auth);

// @desc authenticate the user using middleware then proceed to update their user data //
// @route PUT http://localhost:5050/api/auth/update //
router.put("/update", authenticate, update);

// @desc authenticate the user using middleware then proceed to update their password //
// @route PUT http://localhost:5050/api/auth/updatePassword //
router.put("/updatePassword", authenticate, updatePassword);

export default router;
