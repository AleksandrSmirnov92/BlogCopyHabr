import { equal } from "assert";
import express, { Request, Response } from "express";
// import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
interface RequestBody {
  tagsId: string;
}
interface ResponseData {
  message: string;
  tags: any;
}

exports.getInfoFollowers = async (
  req: Request<{ id: string }, {}, RequestBody>,
  res: Response<ResponseData>
) => {
  let { id } = req.params;
  let { tagsId } = req.body;
  let isCheckedFollowers = await supabase
    .from("tagsFollowers")
    .select("*")
    .match({ user_id: id, tags_id: tagsId })
    .single();
  if (isCheckedFollowers.data) {
    let deleteFollower = await supabase
      .from("tagsFollowers")
      .delete()
      .match({ user_id: id, tags_id: tagsId });
  } else {
    let createFollowers = await supabase
      .from("tagsFollowers")
      .insert({ user_id: id, tags_id: tagsId });
  }
  let getTags = await supabase
    .from("tags")
    .select(`"*",question_and_tags(tag_id_from_tags)`, { count: "exact" });
  let tagsFollowers = await supabase
    .from("tagsFollowers")
    .select("user_id,tags_id", { count: "exact" })
    .eq("user_id", id);
  let mFollowers: any = [];
  tagsFollowers.data.map((x: any) => mFollowers.push(x.tags_id));
  let countFollowers = async (idTag: any) => {
    let tagsAllFollowers = await supabase
      .from("tagsFollowers")
      .select("user_id,tags_id", { count: "exact" })
      .eq("tags_id", idTag);
    let count = tagsAllFollowers.data.length;
    return count.toString();
  };
  let resTags = await Promise.all(
    getTags.data.map(async (x: any) => ({
      ...x,
      isChecked: mFollowers.includes(x.id),
      countFollowers: await countFollowers(x.id),
      countQuestions: x.question_and_tags.length,
      btn: true,
    }))
  );

  res.status(200).json({
    message: "Вы получили информацию о всех тегах",
    tags: resTags,
  });
  // try {
  //   let { id } = req.params;
  //   let { nameTag } = req.body;
  //   let getTags;
  //   if (id !== "null") {
  //     let getFollower = await pool.query(
  //       `SELECT ${nameTag.toLowerCase()} FROM followers WHERE followers_id_from_users = $1 `,
  //       [id]
  //     );
  //     let updateFollower = await pool.query(
  //       `UPDATE followers SET ${nameTag.toLowerCase()} = $1 WHERE followers_id_from_users = $2`,
  //       [!getFollower.rows[0][nameTag.toLowerCase()], id]
  //     );
  //     getTags = await pool.query(
  //       `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag,followers.followers_id_from_users,followers.followers_id,followers.javascript,followers.html,followers.css,followers.react,followers.vue,followers.git FROM tags join followers on followers_id_from_users = $1`,
  //       [id]
  //     );
  //   } else {
  //     getTags = await pool.query(
  //       `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag FROM tags;`
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
  //   console.log(getTags.rows[0]);
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
