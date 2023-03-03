import express, { Request, Response } from "express";
import { pool } from "../db.js";
interface ResponseData {
  message: string;
  body: {
    description: string;
    img_tag: string;
    name_tag: string;
    tags_id: string;
  };
  countFollowers: string;
  questionsTag: [];
  answers: [];
}
exports.tagInfo = async (req: Request, res: Response<ResponseData>) => {
  try {
    let { id } = req.params;
    let descriptionTag = await pool.query(
      "SELECT * FROM tags WHERE tags_id = $1",
      [id]
    );
    let countFollowers = await pool.query(
      `SELECT COUNT(*) FROM followers where ${descriptionTag.rows[0].name_tag} = $1`,
      ["true"]
    );
    let questionsTag = await pool.query(
      `SELECT * FROM questions join tags on questions.question_tags = tags_id WHERE question_tags = $1 `,
      [id]
    );
    let getAnswers = await pool.query(`
    select * from answers
    `);
    res.status(200).json({
      message: "Вы получили информацию о тэге",
      body: descriptionTag.rows[0],
      countFollowers: countFollowers.rows[0].count,
      questionsTag: questionsTag.rows,
      answers: getAnswers.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
