import jwt from "jsonwebtoken";
import { db } from "../connect.js";
export const getUser = (req, res) => {
  //TODO
  const q = "SELECT * FROM users WHERE users.id = ?";
  db.query(q, [req.params.userId], (err, data) => {
    if (err)
      return res.status(404).json({ message: "Error when query database" });
    const { password, ...others } = data[0];
    res.status(200).json(others);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(404).json({ message: "Token is not valid" });
  const q =
    "UPDATE users SET name = ? , coverPic = ? , profilePic = ? , city = ? , website = ? WHERE id = ?";
  jwt.verify(token, "secret", (err, userInfo) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error when verifying token", error: err });
    db.query(
      q,
      [
        req.body.name,
        req.body.coverPic,
        req.body.profilePic,
        req.body.city,
        req.body.website,
        userInfo.id,
      ],
      (err, data) => {
        if (err)
          return res
            .status(404)
            .json({ message: "Error systax mysql", error: err });
            const { password , ...others } = data[0];
        res.status(200).json(others);
      }
    );
  });
};
