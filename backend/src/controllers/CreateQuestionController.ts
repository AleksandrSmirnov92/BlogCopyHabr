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
  console.log();
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
  // try {
  //   const { questionTitle, questionTags, questionDetails, userId } = req.body;
  //   let idTags = await pool.query("SELECT * FROM tags WHERE name_tag = $1", [
  //     questionTags,
  //   ]);
  //   if (!idTags.rows[0]) {
  //     return res.status(404).json({
  //       status: "ERROR",
  //       message: "Не правильно заполненны поля",
  //     });
  //   }
  //   let getDate = await pool.query(`SELECT NOW()`);
  //   let createNewQustions = await pool.query(
  //     "INSERT INTO questions (user_id, question_title,question_tags,question_details,date_of_creation) VALUES($1,$2,$3,$4,$5)",
  //     [
  //       userId,
  //       questionTitle,
  //       idTags.rows[0].tags_id,
  //       questionDetails,
  //       getDate.rows[0].now,
  //     ]
  //   );
  //   let getIdQustions = await pool.query(
  //     "SELECT * FROM questions WHERE user_id = $1 AND question_title = $2 AND question_tags = $3 AND question_details = $4",
  //     [userId, questionTitle, idTags.rows[0].tags_id, questionDetails]
  //   );
  //   let addInQuestionAndTags = await pool.query(
  //     "INSERT INTO question_and_tags (user_id_from_users, tag_id_from_tags ) VALUES($1,$2)",
  //     [userId, idTags.rows[0].tags_id]
  //   );
  //   let IdQustions = await pool.query(
  //     "SELECT * FROM questions WHERE user_id = $1",
  //     [userId]
  //   );
  //   return res.status(200).json({
  //     status: "SUCCESS",
  // questions: {
  //   questionTitle: questionTitle,
  //   questionTags: questionTags,
  //   questionDetails: questionDetails,
  //   userId: userId,
  // },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
