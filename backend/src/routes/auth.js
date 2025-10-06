import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginInput } from "../middleware/validateLoginInput.js";
import { User } from "../models/User.js";
import Config from "../config.js";
import { authMiddleware } from "../middleware/auth.js";
import { csrfMiddleware } from "../middleware/csrf.js";

const router = express.Router();

router.post("/login", csrfMiddleware, validateLoginInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, password });
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      Config.JWT_SECRET,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 60 * 1000,
      sameSite: "lax",
    });

    res.status(200).json({ email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  const csrfHeader = req.headers["x-csrf-token"];
  const csrfCookie = req.cookies.csrfToken;

  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }

  res.clearCookie("csrfToken");
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ email: req.user.email });
});

export default router;
