import express, { Request, Response } from "express";
import { pool } from "../db.js";

exports.getAllInfoAboutUser = async (req: Request, res: Response) => {
  try {
    let getInfomationAboutUser =
      await pool.query(`select users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname from about_user
      join users on user_id_from_users = user_id;`);
    res.status(200).json({
      message: "Вы получили информацию о пользователе",
      body: getInfomationAboutUser.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getInfoAboutUser = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let getInfomationAboutUser = await pool.query(
      `select users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname from about_user
        join users on user_id_from_users = user_id where user_id_from_users = $1`,
      [id]
    );
    res.status(200).json({
      message: "Вы получили информацию о пользователе",
      body: getInfomationAboutUser.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
};
