import express, { Request, Response } from "express";
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
    .select("id,nickname")
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
};
