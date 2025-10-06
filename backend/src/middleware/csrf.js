import { v4 as uuidv4 } from "uuid";

export const csrfMiddleware = (req, res, next) => {
  const csrfToken = uuidv4();
  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 30 * 60 * 1000,
  });

  req.csrfToken = csrfToken;
  next();
};
