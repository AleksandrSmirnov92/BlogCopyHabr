import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
exports.getAnswers = async (req: Request, res: Response) => {
  let { answer, questionId, tagsId, userId } = req.body;
  const insertAnswer = await supabase
    .from("answers")
    .upsert({
      user_id_from_users: userId,
      answers: answer,
      question_id_from_questions: questionId,
      tags_id: tagsId,
      responce_userId: userId,
    })
    .select()
    .single();
  let getAnswersToQuestion = await supabase
    .from("answers")
    .select(`"*",about_user("*"),users("*")`)
    .match({
      answer_id: insertAnswer.data.answer_id,
      tags_id: tagsId,
      question_id_from_questions: questionId,
    });
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
  // console.log(userId);
  // try {
  //   let addInformationInAnswers = await pool.query(
  //     `INSERT INTO answers (question_id_from_questions,user_id_from_users,answers,responce_userid) VALUES($1,$2,$3,$4)`,
  //     [questionId, questionUserId, answer, userId]
  //   );
  //   let getAnswers = await pool.query(
  //     `SELECT answers.answers,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id ORDER BY answer_id`
  //   );
  //   console.log(getAnswers.rows);
  //   res.status(200).json({
  //     message: "Вы ответили",
  //     answer: getAnswers.rows.at(-1),
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
exports.getAnswersId = async (req: Request, res: Response) => {
  let { id } = req.params;
  console.log(id);
  let getInfoAnswers = await supabase
    .from("answers")
    .select(
      `"answer_id","answers","question_id_from_questions","responce_userId","user_id_from_users",users("*"),questions("*")`
    )
    .eq("user_id_from_users", id);
  console.log(getInfoAnswers.data);
  let answers = getInfoAnswers.data.map((obj: any) => {
    let { answers } = obj;
    let { question_title, questions_id, question_tags } = obj.questions;
    let { email, nickname, user_id } = obj.users;
    return {
      email,
      nickname,
      question_title,
      answers,
      questions_id,
      question_tags,
      user_id,
    };
  });
  res.status(200).json({
    message: "Вы получили все этого ответы этого пользователя",
    answers: answers,
  });
};
