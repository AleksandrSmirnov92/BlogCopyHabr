import express, { Request, Response } from "express";
import { pool } from "../db.js";
exports.getMyFeed = async (req: Request, res: Response) => {
  try {
    let { id } = req.body;
    let getQuestions =
      await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
     join tags on questions.question_tags = tags_id;`);
    let getFollower = await pool.query(
      `select followers.git,followers.javascript,followers.vue,followers.react,followers.html,followers.css from followers where followers_id_from_users = $1;`,
      [id]
    );
    let getAnswers = await pool.query(`
     select * from answers
     `);
    res.status(200).json({
      message: "Вы получили информацию о интересных мне вопросах вопросах",
      followers: getFollower.rows[0],
      questions: getQuestions.rows,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
