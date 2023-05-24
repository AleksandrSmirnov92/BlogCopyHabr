import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
exports.getAnswers = async (req: Request, res: Response) => {
  let { answer, questionId, tagsId, userId } = req.body;
  const insertAnswer = await supabase
    .from("answers")
    .upsert({
      user_id: userId,
      answers: answer,
      question_id: questionId,
      tags_id: tagsId,
      responce_userId: userId,
      route: "questionInfo",
      id: questionId,
    })
    .select()
    .single();
  let getAnswersToQuestion = await supabase
    .from("answers")
    .select(`"*",about_user("*"),users("*")`)
    .match({
      answer_id: insertAnswer.data.answer_id,
      tags_id: tagsId,
      question_id: questionId,
    });
  if (getAnswersToQuestion.data === null) {
    console.log("соединение не отвечает");
    console.log(getAnswersToQuestion.error);
    res.status(522).json({
      message: "соединение не отвечает",
    });
  }
  let answerData = getAnswersToQuestion.data.map((obj: any) => {
    let { img, fullname, lastname } = obj.about_user;
    let { responce_userId, answers } = obj;
    let { email } = obj.users;
    return { img, responce_userId, fullname, lastname, email, answer: answers };
  });

  res.status(200).json({
    message: "Вы ответили",
    answer: answerData[0],
  });
};
exports.getAnswersId = async (req: Request, res: Response) => {
  let { id } = req.params;
  let getInfoAnswers = await supabase
    .from("answers")
    .select(
      `"answer_id","answers","question_id","responce_userId","user_id",users("*"),questions("*")`
    )
    .eq("user_id", id);
  if (getInfoAnswers.data === null) {
    console.log("соединение не отвечает");
    console.log(getInfoAnswers.error);
    res.status(522).json({
      message: "соединение не отвечает",
    });
  }
  let answers = getInfoAnswers.data.map((obj: any) => {
    let { answers } = obj;
    let { question_title, id, question_tags } = obj.questions;
    let { email, nickname, user_id } = obj.users;
    return {
      email,
      nickname,
      question_title,
      answers,
      id,
      question_tags,
      user_id,
    };
  });
  res.status(200).json({
    message: "Вы получили все этого ответы этого пользователя",
    answers: answers,
  });
};
