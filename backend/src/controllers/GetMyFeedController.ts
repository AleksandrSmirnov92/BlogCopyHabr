import express, { Request, Response } from "express";
// import { pool } from "../db.js";
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
  // try {
  //   let { id } = req.body;
  //   let getQuestions =
  //     await pool.query(`select  questions.questions_id,questions.question_title, questions.date_of_creation,tags.img_tag, tags.name_tag, tags.tags_id from questions
  //    join tags on questions.question_tags = tags_id;`);
  //   let getFollower = await pool.query(
  //     `select followers.git,followers.javascript,followers.vue,followers.react,followers.html,followers.css from followers where followers_id_from_users = $1;`,
  //     [id]
  //   );
  //   let getAnswers = await pool.query(`
  //    select * from answers
  //    `);
  //   res.status(200).json({
  //     message: "Вы получили информацию о интересных мне вопросах вопросах",
  //     followers: getFollower.rows[0],
  //     questions: getQuestions.rows,
  //     answers: getAnswers.rows,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
