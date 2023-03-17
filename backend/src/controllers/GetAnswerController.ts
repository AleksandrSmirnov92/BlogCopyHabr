import express, { Request, Response } from "express";
import { pool } from "../db.js";
exports.getAnswers = async (req: Request, res: Response) => {
  let { answer, questionId, questionUserId, userId } = req.body;
  try {
    let addInformationInAnswers = await pool.query(
      `INSERT INTO answers (question_id_from_questions,user_id_from_users,answers,responce_userid) VALUES($1,$2,$3,$4)`,
      [questionId, questionUserId, answer, userId]
    );
    let getAnswers = await pool.query(
      `SELECT answers.answers,p2.fullname,p2.lastname,p2.img,users.email FROM answers JOIN about_user p2 ON answers.responce_userid = p2.user_id_from_users JOIN users ON p2.user_id_from_users = user_id ORDER BY answer_id`
    );
    console.log(getAnswers.rows);
    res.status(200).json({
      message: "Вы ответили",
      answer: getAnswers.rows.at(-1),
    });
  } catch (err) {
    console.log(err);
  }
};
