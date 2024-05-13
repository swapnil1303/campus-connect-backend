import express from "express";
import {
  signup,
  login,
  logout,
} from "../controller/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
// router.post("/checkForAuthenticStudent", checkForAuthenticStudent);

export default router;
