import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";

interface SignInResponce {
  status: string;
  message?: string;
  user?: {
    user_id: string;
    nickname: string;
  };
}
exports.signIn = async (
  req: Request<{}, {}, { email: string | null; password: string | null }>,
  res: Response<SignInResponce>
) => {
  const { email, password } = req.body;
  let { data, error } = await supabase
    .from("users")
    .select("user_id,nickname")
    .match({ email: email, password: password })
    .single();
  if (error) {
    console.log(error);
    return res
      .status(404)
      .json({ status: "ERROR", message: "Пользователь не существует" });
  }
  if (data) {
    return res.status(200).json({ status: "SUCCESS", user: data });
  }
  // Вход через локальный postgres
  // try {
  //   const { email, password } = req.body;
  //   const getUser = await pool.query(
  //     `SELECT users.user_id,users.nickname FROM users WHERE email = $1 AND password = $2`,
  //     [email, password]
  //   );
  //   if (!getUser.rows.length) {
  //     return res
  //       .status(404)
  //       .json({ status: "ERROR", message: "Пользователь не существует" });
  //   }
  //   console.log(getUser.rows[0]);
  //   return res.status(200).json({ status: "SUCCESS", user: getUser.rows[0] });
  // } catch (err: any) {
  //   console.log(err.message);
  // }
};
