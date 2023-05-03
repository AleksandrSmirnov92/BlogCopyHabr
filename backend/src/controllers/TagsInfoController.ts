import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
interface ResponseTags {
  message: string;
  tags: any;
}
exports.getInfoTags = async (req: Request, res: Response<ResponseTags>) => {
  let { id } = req.params;
  let getTags = await supabase.from("tags").select("*", { count: "exact" });
  let questions = await supabase.from("question_and_tags").select("*");
  let mFollowers: any = [];
  let resTags = [];
  if (id !== "null") {
    let tagsFollowers = await supabase
      .from("tagsFollowers")
      .select("user_id,tags_id", { count: "exact" })
      .eq("user_id", id);
    tagsFollowers.data.map((x: any) => mFollowers.push(x.tags_id));
    let countFollowers = async (idTag: any) => {
      let tagsAllFollowers = await supabase
        .from("tagsFollowers")
        .select("user_id,tags_id", { count: "exact" })
        .eq("tags_id", idTag);
      let count = tagsAllFollowers.data.length;
      return count.toString();
    };
    resTags = await Promise.all(
      getTags.data.map(
        async (x: any): Promise<number> => ({
          ...x,
          isChecked: mFollowers.includes(x.id),
          countFollowers: await countFollowers(x.id),
          countQuestions: questions.data.filter((t: any) => t.tags_id === x.id)
            .length,
          btn: true,
        })
      )
    );
  } else {
    resTags = getTags.data.map((x: any) => ({
      ...x,
      countQuestions: questions.data.filter((t: any) => t.tags_id === x.id)
        .length,
      btn: false,
    }));
  }
  res.status(200).json({
    message: "Вы получили информацию о всех тегах",
    tags: resTags,
  });
  // try {
  //   let getTags;
  //   if (id !== "null") {
  //     getTags = await pool.query(
  //       `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag,followers.followers_id_from_users,followers.followers_id,followers.javascript,followers.html,followers.css,followers.react,followers.vue,followers.git FROM tags join followers on followers_id_from_users = $1`,
  //       [id]
  //     );
  //   } else {
  //     getTags = await pool.query(
  //       `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag FROM tags`
  //     );
  //   }

  //   let countFollowersJavaScript = await pool.query(
  //     "SELECT COUNT(*) FROM followers where javascript = $1",
  //     ["true"]
  //   );
  //   let countFollowersHTML = await pool.query(
  //     "SELECT COUNT(*) FROM followers where html = $1",
  //     ["true"]
  //   );
  //   let countFollowersCSS = await pool.query(
  //     "SELECT COUNT(*) FROM followers where css = $1",
  //     ["true"]
  //   );
  //   let countFollowersReact = await pool.query(
  //     "SELECT COUNT(*) FROM followers where react = $1",
  //     ["true"]
  //   );
  //   let countFollowersVue = await pool.query(
  //     "SELECT COUNT(*) FROM followers where vue = $1",
  //     ["true"]
  //   );
  //   let countFollowersGit = await pool.query(
  //     "SELECT COUNT(*) FROM followers where git = $1",
  //     ["true"]
  //   );
  //   // console.log(getTags.rows);
  //   res.status(200).json({
  //     message: "Вы получили информацию о всех тегах",
  //     tags: getTags.rows,
  //     countFollowers: {
  //       JavaScript: countFollowersJavaScript.rows[0].count,
  //       HTML: countFollowersHTML.rows[0].count,
  //       CSS: countFollowersCSS.rows[0].count,
  //       React: countFollowersReact.rows[0].count,
  //       Vue: countFollowersVue.rows[0].count,
  //       Git: countFollowersGit.rows[0].count,
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
};
