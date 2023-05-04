import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
exports.getMyFeed = async (req: Request, res: Response) => {
  let { id } = req.body;
  let getFollowers = await supabase
    .from("tagsFollowers")
    .select(`"tags_id"`)
    .eq("user_id", id);
  let getQuestions = await supabase
    .from("questions")
    .select(
      `"date_of_creation","question_title","id","question_tags",tags("*"),answers(*)`
    )
    .eq("");
  let questions: {}[] = [];
  getFollowers.data.forEach((element: any) => {
    getQuestions.data.forEach((obj: any) => {
      if (element.tags_id === obj.question_tags) {
        let { date_of_creation, question_title, id, question_tags, answers } =
          obj;
        let { name_tag, img_tag, tags_id } = obj.tags;
        let newObj = {
          name_tag,
          img_tag,
          tags_id,
          date_of_creation,
          question_title,
          id,
          question_tags,
          countAnswers: answers.length,
        };
        questions.push(newObj);
      }
    });
  });

  res.status(200).json({
    message: "Вы получили информацию об интересных вам вопросах",
    questions: questions,
  });
};
