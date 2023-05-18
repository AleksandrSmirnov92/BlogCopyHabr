import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
exports.getAllInfo = async (req: Request, res: Response) => {
  let { search } = req.body;
  let getSearchTags = await supabase
    .from("tags")
    .select("name_tag,img_tag,id,route")
    .ilike("name_tag", `%${search}%`);
  let getSearchUsers = await supabase
    .from("users")
    .select("nickname,id,route")
    .ilike("nickname", `%${search}%`);
  let getSearchQuestion = await supabase
    .from("questions")
    .select("question_title,id,route")
    .ilike("question_title", `%${search}%`);
  let getSearchAnswers = await supabase
    .from("answers")
    .select("answers,id,route")
    .ilike("answers", `%${search}%`);
  let collection = [
    ...getSearchTags.data,
    ...getSearchUsers.data,
    ...getSearchQuestion.data,
    ...getSearchAnswers.data,
  ];
  Promise.all([
    getSearchTags,
    getSearchUsers,
    getSearchQuestion,
    getSearchQuestion,
    getSearchAnswers,
  ]).then(() => {
    res.status(200).json({
      message: "Вы получили информацию обо всех направлениях",
      collection: search === "" ? [] : collection.slice(0, 5),
    });
  });
};
