import express, { Request, Response } from "express";
import { pool } from "../db.js";
exports.getQuestions = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    let userId;
    let getInfoUser;
    if (req.body.userId !== "Пользователь не зарегестрирован") {
      userId = req.body.userId;
      getInfoUser = await pool.query(
        `SELECT * from users JOIN about_user on about_user.user_id_from_users = $1 WHERE users.user_id = $1`,
        [userId]
      );
    } else {
      getInfoUser = "";
    }
    let getAnswers = await pool.query(
      `SELECT answers.answers,users.email,users.nickname,about_user.fullname,about_user.lastname,about_user.img,about_user.user_id_from_users from answers as answers JOIN users on users.user_id = answers.responce_userid JOIN about_user on about_user.user_id_from_users = answers.responce_userid WHERE answers.question_id_from_questions = $1 ORDER BY answer_id`,
      [id]
    );
    let getQuestionInfo = await pool.query(
      `SELECT * FROM questions as q JOIN tags on tags_id = q.question_tags JOIN users on users.user_id = q.user_id JOIN about_user on about_user.user_id_from_users = q.user_id WHERE q.questions_id = $1 `,
      [id]
    );
    res.status(200).json({
      message: "Вы получили информацию о вопросе",
      questionInfo: getQuestionInfo.rows[0],
      answers: getAnswers.rows,
      userInfo: getInfoUser !== "" ? getInfoUser.rows[0] : "",
    });
  } catch (err) {
    console.log(err);
  }
};
