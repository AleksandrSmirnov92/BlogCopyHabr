import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
exports.getAllInfoAboutUser = async (req: Request, res: Response) => {
  let getInfoAboutUser = await supabase
    .from("users")
    .select(
      `"email","nickname","user_id",about_user("*"),answers("*"),questions("*")`
    );

  let infoUsers = () => {
    let infoUsers = getInfoAboutUser.data.map((obj: any) => {
      let { nickname, user_id } = obj;
      let { img, fullname } = obj.about_user;
      let answers = obj.answers.length;
      let questions = obj.questions.length;
      return { nickname, user_id, img, fullname, answers, questions };
    });
    return infoUsers;
  };
  res.status(200).json({
    message: "Вы получили информацию о пользователе",
    body: infoUsers(),
    answers: getInfoAboutUser.data,
  });
  // try {
  //   let getInfomationAboutUser =
  //     await pool.query(`select (select count(*) from answers where responce_userid = user_id) as answers,(select count(*) from questions where questions.user_id = users.user_id) as questions, users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname from  about_user
  //     join users on user_id_from_users = user_id ;`);
  //   let get = await pool.query(
  //     `select count(*) from questions where questions.user_id = user_id;`
  //   );
  //   res.status(200).json({
  //     message: "Вы получили информацию о пользователе",
  //     body: getInfomationAboutUser.rows,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
exports.getInfoAboutUser = async (req: Request, res: Response) => {
  let { id } = req.params;
  let getInfoUser = await supabase
    .from("about_user")
    .select(
      `"briefly_about_yourself","contacts","country","region","town","linktocontacts","fullname","lastname","img","information_about_user"`
    )
    .eq("user_id_from_users", id)
    .single();
  res.status(200).json({
    message: "Вы получили информацию о пользователе",
    users: getInfoUser.data,
  });
  // try {
  //   let { id } = req.params;
  //   let getInfomationAboutUser = await pool.query(
  //     `select  users.email, users.user_id, about_user.img,users.nickname,about_user.lastname,about_user.fullname, about_user.contacts, about_user.linktocontacts, about_user.briefly_about_yourself,about_user.informattion_about_user ,about_user.country ,about_user.region ,about_user.town from about_user
  //       join users on user_id_from_users = user_id where user_id_from_users = $1`,
  //     [id]
  //   );
  //   let getInformationAboutQuestions = await pool.query(
  //     "SELECT * FROM questions as q1 join tags on question_tags = tags_id WHERE q1.user_id = $1",
  //     [id]
  //   );
  //   let getAllInformationAboutAnswers = await pool.query(
  //     "select * from answers;"
  //   );
  //   let getInformationAboutAnsers = await pool.query(
  //     "SELECT * from answers as an join questions on question_id_from_questions = questions_id join users on responce_userid = users.user_id WHERE an.responce_userid = $1",
  //     [id]
  //   );
  //   res.status(200).json({
  //     message: "Вы получили информацию о пользователе",
  //     body: getInfomationAboutUser.rows[0],
  //     questions: getInformationAboutQuestions.rows,
  //     answers: getAllInformationAboutAnswers.rows,
  //     myAnswers: getInformationAboutAnsers.rows,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
