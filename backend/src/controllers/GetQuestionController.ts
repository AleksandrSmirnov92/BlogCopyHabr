import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
exports.getQuestions = async (req: Request, res: Response) => {
  let { id } = req.params;
  let userId = req.body.userId;
  let userActive = false;
  let getAboutUser;
  if (userId !== "Пользователь не зарегестрирован") {
    userActive = true;
    getAboutUser = await supabase
      .from("about_user")
      .select(`"img","user_id"`)
      .eq("user_id", userId)
      .single();
  } else {
    userActive = false;
    getAboutUser = "";
  }
  // ------------------------------
  let getQuestionInfo = await supabase
    .from("questions")
    .select(`"*",users("*"),about_user("*"),tags("*")`)
    .eq("id", id)
    .single();
  // -----------------------------
  let getAnswersToQuestion = await supabase
    .from("answers")
    .select(`"*",about_user("*"),users("*")`)
    .match({
      tags_id: getQuestionInfo.data.question_tags,
      question_id: id,
    });
  // --------------------------------

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
      user_id: about_user.user_id,
      answers: answers,
      userImg: getAboutUser !== "" ? getAboutUser.data.img : "",
      userId: getAboutUser !== "" ? getAboutUser.data.user_id : "",
      userActive: userActive,
    },
  });
};
