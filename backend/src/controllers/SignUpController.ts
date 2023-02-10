import express, { Request, Response } from "express";
import { pool } from "../db.js";
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
  try {
    const newUser = await pool.query(
      "INSERT INTO users (email,nickname,password) VALUES($1, $2, $3) RETURNING * ",
      [email, nickName, password]
    );
    const addInformationAboutUser = await pool.query(
      "INSERT INTO about_user (user_id_from_users,img,fullname,lastname,contacts,linktocontacts,briefly_about_yourself,informattion_about_user,country,region,town) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        newUser.rows[0].user_id,
        "",
        "",
        "",
        "Контакты",
        "",
        "",
        "",
        "Страна",
        "Регион",
        "Город",
      ]
    );
    return res.status(200).json({
      status: "SUCCESS",
      nickName: nickName,
      userId: newUser.rows[0].user_id,
    });
  } catch (err: any) {
    console.log(err.detail);
    return res.status(406).json({
      status: "ERROR",
      message: `Пользователь c таким E-mail(${email}) существует`,
    });
  }
};
