export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email.trim().length === 0 || password.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Email and password cannot be empty" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.trim().length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  next();
};
