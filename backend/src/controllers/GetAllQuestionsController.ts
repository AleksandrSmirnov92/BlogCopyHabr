import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
exports.getAllQuestions = async (req: Request, res: Response) => {
  let getQuestions = await supabase
    .from("questions")
    .select(
      `"date_of_creation","question_title","id","question_tags",tags("*"),answers(*)`
    );
  let questions = getQuestions.data.map((obj: any) => {
    let { date_of_creation, question_title, id, question_tags, answers } = obj;
    let { name_tag, img_tag, tags_id } = obj.tags;
    return {
      date_of_creation,
      question_title,
      name_tag,
      img_tag,
      tags_id,
      id,
      question_tags,
      countAnswers: answers.length,
    };
  });

  res.status(200).json({
    message: "Вы получили информацию о всех вопросах",
    questions: questions,
    answers: "",
  });
  // try {
  //   let getQuestions =
  //     await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
  //    join tags on questions.question_tags = tags_id;`);
  //   let getAnswers = await pool.query(`
  //    select * from answers
  //    `);
  //   res.status(200).json({
  //     message: "Вы получили информацию о всех вопросах",
  //     questions: getQuestions.rows,
  //     answers: getAnswers.rows,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
exports.getAllQuestionsId = async (req: Request, res: Response) => {
  let { id } = req.params;
  let getQuestionsId = await supabase
    .from("questions")
    .select(`"*",tags("*"),answers(*)`)
    .eq("user_id", id);
  let questionsInfo = getQuestionsId.data.map((obj: any) => {
    let { id, question_tags, question_title, date_of_creation, tags, answers } =
      obj;
    return {
      question_tags,
      question_title,
      date_of_creation,
      name_tag: tags.name_tag,
      img_tag: tags.img_tag,
      countAnswers: answers.length,
      id,
    };
  });

  res.status(200).json({
    message: "Вы получили информацию о всех вопросах по id",
    questions: questionsInfo,
  });
};
