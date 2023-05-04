import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
interface SignUpResponse {
  status: string;
  nickName?: string;
  message?: string;
  userId?: string;
}
exports.signUp = async (
  req: Request<{}, {}, { email: string; nickName: string; password: string }>,
  res: Response<SignUpResponse>
) => {
  const { email, nickName, password } = req.body;
  let insertUser = await supabase
    .from("users")
    .insert({
      email: email,
      nickname: nickName,
      password: password,
      route: "users",
    })
    .select();
  if (insertUser.error) {
    console.log(insertUser.error);
    return res.status(406).json({
      status: "ERROR",
      message: `Пользователь c таким E-mail(${email}) существует`,
    });
  }
  if (insertUser.data) {
    let insertAboutUser = await supabase
      .from("about_user")
      .insert({
        user_id: insertUser.data[0].id,
        img: "",
        fullname: "",
        lastname: "",
        contacts: "Контакты",
        linktocontacts: "",
        briefly_about_yourself: "",
        information_about_user: "",
        country: "Страна",
        region: "Регион",
        town: "Город",
      })
      .select();
    return res.status(200).json({
      status: "SUCCESS",
      nickName: nickName,
      userId: insertUser.data[0].id,
    });
  }
};
