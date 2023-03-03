import express, { Request, Response } from "express";
import { pool } from "../db.js";
interface ResponseTags {
  message: string;
  tags: [];
  countFollowers: {
    JavaScript: string;
    HTML: string;
    CSS: string;
    React: string;
    Vue: string;
    Git: string;
  };
}
exports.getInfoTags = async (req: Request, res: Response<ResponseTags>) => {
  let { id } = req.params;
  try {
    let getTags;
    if (id !== "null") {
      getTags = await pool.query(
        `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag,followers.followers_id_from_users,followers.followers_id,followers.javascript,followers.html,followers.css,followers.react,followers.vue,followers.git FROM tags join followers on followers_id_from_users = $1`,
        [id]
      );
    } else {
      getTags = await pool.query(
        `SELECT (select count(*) from questions where question_tags = tags.tags_id),tags.tags_id,tags.name_tag,tags.img_tag FROM tags`
      );
    }
    let countFollowersJavaScript = await pool.query(
      "SELECT COUNT(*) FROM followers where javascript = $1",
      ["true"]
    );
    let countFollowersHTML = await pool.query(
      "SELECT COUNT(*) FROM followers where html = $1",
      ["true"]
    );
    let countFollowersCSS = await pool.query(
      "SELECT COUNT(*) FROM followers where css = $1",
      ["true"]
    );
    let countFollowersReact = await pool.query(
      "SELECT COUNT(*) FROM followers where react = $1",
      ["true"]
    );
    let countFollowersVue = await pool.query(
      "SELECT COUNT(*) FROM followers where vue = $1",
      ["true"]
    );
    let countFollowersGit = await pool.query(
      "SELECT COUNT(*) FROM followers where git = $1",
      ["true"]
    );

    res.status(200).json({
      message: "Вы получили информацию о всех тегах",
      tags: getTags.rows,
      countFollowers: {
        JavaScript: countFollowersJavaScript.rows[0].count,
        HTML: countFollowersHTML.rows[0].count,
        CSS: countFollowersCSS.rows[0].count,
        React: countFollowersReact.rows[0].count,
        Vue: countFollowersVue.rows[0].count,
        Git: countFollowersGit.rows[0].count,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
