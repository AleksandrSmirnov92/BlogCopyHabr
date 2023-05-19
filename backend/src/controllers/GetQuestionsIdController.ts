import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
<<<<<<< HEAD
exports.GetQuestionsId = async (req: Request, res: Response) => {
  let { id } = req.params;
=======
exports.questionsId = async (req: Request, res: Response) => {
  let { id } = req.params;
  // console.log("n");
>>>>>>> fe9ca836d143b5ada9a2ef432ba3eeba4dcc9fe0
  let getTagInfo = await supabase
    .from("questions")
    .select(`"*",tags("*"),answers(*)`)
    .eq("question_tags", id);
  let questionsInfo = getTagInfo.data.map((obj: any) => {
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
    message: "Вы получили информацию о всех вопросов этого тега",
    questions: questionsInfo,
  });
};
