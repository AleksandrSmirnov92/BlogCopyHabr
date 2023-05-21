import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
const path = require("path");
const fs = require("fs");
exports.getAllInfoAboutUser = async (req: Request, res: Response) => {
  let getInfoAboutUser = await supabase
    .from("users")
    .select(
      `"email","nickname","id",about_user("*"),answers("*"),questions("*")`
    );
  let infoUsers = () => {
    let infoUsers = getInfoAboutUser.data.map((obj: any) => {
      let { nickname, id } = obj;
      let { img, fullname } = obj.about_user;
      let answers = obj.answers.length;
      let questions = obj.questions.length;
      return { nickname, id, img, fullname, answers, questions };
    });
    return infoUsers;
  };
  res.status(200).json({
    message: "Вы получили информацию о пользователе",
    body: infoUsers(),
    answers: getInfoAboutUser.data,
  });
};
exports.getInfoAboutUser = async (req: Request, res: Response) => {
  let { id } = req.params;
  const pathUpload = `${path.join(__dirname, "../../public")}`;
  if (id) {
    const getInfoImg = await supabase
      .from("about_user")
      .select("img")
      .eq("user_id", id)
      .single();
    if (!fs.existsSync(`${pathUpload}/${getInfoImg.data.img}`)) {
      const apdateAboutUser = await supabase
        .from("about_user")
        .update({ img: `` })
        .eq("user_id", id);
    }
    let getInfoUser = await supabase
      .from("about_user")
      .select(
        `"briefly_about_yourself","contacts","country","region","town","linktocontacts","fullname","lastname","img","information_about_user",users("email")`
      )
      .eq("user_id", id)
      .single();
    res.status(200).json({
      message: "Вы получили информацию о пользователе",
      users: getInfoUser.data,
    });
  }
};
