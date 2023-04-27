import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
interface ResponseData {
  message: string;
  body: {
    description: string;
    img_tag: string;
    name_tag: string;
    tagsFollowers: any;
  };
}

exports.tagInfo = async (req: Request, res: Response<ResponseData>) => {
  let { id } = req.params;

  let getTagInfo = await supabase
    .from("tags")
    .select(`"*",tagsFollowers("*")`)
    .eq("id", id)
    .single();
  const { name_tag, img_tag, description, tagsFollowers } = getTagInfo.data;
  res.status(200).json({
    message: "Вы получили информацию о тэге",
    body: {
      name_tag,
      img_tag,
      description,
      tagsFollowers: tagsFollowers.length,
    },
  });

  // let nameTag;
  // console.log(id);
  // let countFollowers = async (nameTag: any) => {
  //   let countFollowersData: any;
  //   let { data, error } = await supabase
  //     .from("followers")
  //     .select("*", { count: "exact" })
  //     .match({ [nameTag]: true });
  //   if (data) {
  //     return (countFollowersData = `${data.length}`);
  //   } else {
  //     return (countFollowersData = "0");
  //   }
  // };
  // let getAnswers = async () => {
  //   let { data, error } = await supabase.from("answers").select(`*`);
  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     return data;
  //   }
  // };
  // let questionTag = async (id: any) => {
  //   let { data, error } = await supabase
  //     .from("questions")
  //     .select(`"*",tags("*")`)
  //     .eq("question_tags", id);

  //   if (error) {
  //     console.log(error);
  //   }
  //   if (data) {
  //     let newob = data.map((item: any) => ({ ...item, ...item.tags }));
  //     return newob;
  //   }
  // };
  // let { data, error } = await supabase
  //   .from("tags")
  //   .select()
  //   .eq("tags_id", id)
  //   .single();
  // nameTag = await data.name_tag.toLowerCase();
  // if (error) {
  //   console.log(error);
  // }
  // if (data) {
  // res.status(200).json({
  //   message: "Вы получили информацию о тэге",
  //   body: data,
  //   countFollowers: await countFollowers(nameTag),
  //   questionsTag: await questionTag(id),
  //   answers: await getAnswers(),
  // });

  // try {
  //   let { id } = req.params;
  //   let descriptionTag = await pool.query(
  //     "SELECT * FROM tags WHERE tags_id = $1",
  //     [id]
  //   );
  //   let countFollowers = await pool.query(
  //     `SELECT COUNT(*) FROM followers where ${descriptionTag.rows[0].name_tag} = $1`,
  //     ["true"]
  //   );
  //   let questionsTag = await pool.query(
  //     `SELECT * FROM questions join tags on questions.question_tags = tags_id WHERE question_tags = $1 `,
  //     [id]
  //   );
  //   let getAnswers = await pool.query(`
  // select * from answers
  // `);
  //   res.status(200).json({
  //     message: "Вы получили информацию о тэге",
  //     body: descriptionTag.rows[0],
  //     countFollowers: countFollowers.rows[0].count,
  //     questionsTag: questionsTag.rows,
  //     answers: getAnswers.rows,
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
  // }
};
