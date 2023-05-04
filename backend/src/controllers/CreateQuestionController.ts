import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
interface QuestionDetailsRequest {
  questionTitle: string;
  questionTags: string;
  questionDetails: string;
  userId: string;
  question_id: string;
}
interface QuestionDetailsResponce {
  status: string;
  message?: string;
}
exports.createQuestion = async (
  req: Request<{}, {}, QuestionDetailsRequest>,
  res: Response<QuestionDetailsResponce>
) => {
  const { questionTitle, questionTags, questionDetails, userId, question_id } =
    req.body;
  if (
    (questionTitle ||
      questionTags ||
      questionDetails ||
      userId ||
      question_id) === undefined ||
    "" ||
    null
  ) {
    return res.status(404).json({
      status: "ERROR",
      message: "Не правильно заполненны поля",
    });
  }
  let insertQuestion = await supabase
    .from("questions")
    .insert({
      question_title: questionTitle,
      question_tags: question_id,
      question_details: questionDetails,
      user_id: userId,
      user_id_from_about_user: userId,
      route: "questionInfo",
    })
    .select();
  let insertQuestionsAndTags = await supabase
    .from("question_and_tags")
    .insert({
      tags_id: question_id,
      user_id: userId,
    })
    .select();
  return res.status(200).json({
    status: "SUCCESS",
  });
};
