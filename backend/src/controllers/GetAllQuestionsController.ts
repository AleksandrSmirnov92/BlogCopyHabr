import express, { Request, Response } from "express";
import { pool } from "../db.js";
exports.getAllQuestions = async (req: Request, res: Response) => {
  try {
    let getQuestions =
      await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
     join tags on questions.question_tags = tags_id;`);
    let getAnswers = await pool.query(`
     select * from answers
     `);

    res.status(200).json({
      message: "Вы получили информацию о всех вопросах",
      questions: getQuestions.rows,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
