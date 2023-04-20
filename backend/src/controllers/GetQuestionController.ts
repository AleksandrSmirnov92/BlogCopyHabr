import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
exports.getQuestions = async (req: Request, res: Response) => {
  let { id } = req.params;
  let userId = req.body.userId;
  let questionTagsId = req.body.questionTagsId;
  let userActive = false;
  let getAboutUser;
  if (userId !== "Пользователь не зарегестрирован") {
    userActive = true;
    getAboutUser = await supabase
      .from("about_user")
      .select(`"img","user_id_from_users"`)
      .eq("user_id_from_users", userId)
      .single();
  } else {
    userActive = false;
    getAboutUser = "";
  }

  // ------------------------------
  let getQuestionInfo = await supabase
    .from("questions")
    .select(`"*",users("*"),about_user("*"),tags("*")`)
    .eq("questions_id", id)
    .single();
  // -----------------------------
  let getAnswersToQuestion = await supabase
    .from("answers")
    .select(`"*",about_user("*"),users("*")`)
    .match({ tags_id: questionTagsId, question_id_from_questions: id });

  let answers = getAnswersToQuestion.data.map((obj: any) => {
    let { img, fullname, lastname } = obj.about_user;
    let { responce_userId, answers } = obj;
    let { email } = obj.users;
    return {
      img,
      responce_userId,
      fullname,
      lastname,
      email,
      answer: answers,
    };
  });
  let {
    question_title,
    question_details,
    date_of_creation,
    users,
    about_user,
    tags,
  } = getQuestionInfo.data;
  res.status(200).json({
    message: "Вы получили информацию о вопросе",
    questionInfo: {
      question_title,
      question_details,
      date_of_creation,
      img_tag: tags.img_tag,
      name_tag: tags.name_tag,
      tags_id: tags.id,
      user_email: users.email,
      nickname: users.nickname,
      user_fullname: about_user.fullname,
      user_lastname: about_user.lastname,
      user_img: about_user.img,
      user_id: about_user.user_id_from_users,
      answers: answers,
      userImg: getAboutUser !== "" ? getAboutUser.data.img : "",
      userId: getAboutUser !== "" ? getAboutUser.data.user_id_from_users : "",
      userActive: userActive,
    },
  });

  // try {
  //   let { id } = req.params;

  //   let userId;
  //   let getInfoUser;
  //   if (req.body.userId !== "Пользователь не зарегестрирован") {
  //     userId = req.body.userId;
  //     getInfoUser = await pool.query(
  //       `SELECT * from users JOIN about_user on about_user.user_id_from_users = $1 WHERE users.user_id = $1`,
  //       [userId]
  //     );
  //   } else {
  //     getInfoUser = "";
  //   }
  //   let getAnswers = await pool.query(
  //     `SELECT answers.answers,users.email,users.nickname,about_user.fullname,about_user.lastname,about_user.img,about_user.user_id_from_users from answers as answers JOIN users on users.user_id = answers.responce_userid JOIN about_user on about_user.user_id_from_users = answers.responce_userid WHERE answers.question_id_from_questions = $1 ORDER BY answer_id`,
  //     [id]
  //   );
  //   let getQuestionInfo = await pool.query(
  //     `SELECT * FROM questions as q JOIN tags on tags_id = q.question_tags JOIN users on users.user_id = q.user_id JOIN about_user on about_user.user_id_from_users = q.user_id WHERE q.questions_id = $1 `,
  //     [id]
  //   );
  //   res.status(200).json({
  //     message: "Вы получили информацию о вопросе",
  //     questionInfo: getQuestionInfo.rows[0],
  //     answers: getAnswers.rows,
  //     userInfo: getInfoUser !== "" ? getInfoUser.rows[0] : "",
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
