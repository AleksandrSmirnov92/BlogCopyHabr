import express, { Request, Response } from "express";
import { pool } from "../db.js";
interface SignInResponce {
  status: string;
  message?: string;
  user?: {
    user_id: string;
    nickname: string;
  };
}
exports.signIn = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<SignInResponce>
) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const getUser = await pool.query(
      `SELECT users.user_id,users.nickname FROM users WHERE email = $1 AND password = $2`,
      [email, password]
    );
    if (!getUser.rows.length) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Пользователь не существует" });
    }
    return res.status(200).json({ status: "SUCCESS", user: getUser.rows[0] });
  } catch (err: any) {
    console.log(err.message);
  }
};
