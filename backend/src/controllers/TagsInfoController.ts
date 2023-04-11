import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
interface ResponseTags {
  message: string;
  tags: any;
  countFollowers: {
    JavaScript: any;
    HTML: any;
    CSS: any;
    React: any;
    Vue: any;
    Git: any;
  };
}
exports.getInfoTags = async (req: Request, res: Response<ResponseTags>) => {
  let { id } = req.params;
  let getTagsData = async (id: string) => {
    let getFollowers: any;
    let countFollowers = async (tagsId: any) => {
      let { data, error } = await supabase
        .from("questions")
        .select("*", { count: "exact" })
        .match({ question_tags: tagsId });
      if (error) {
        console.log(error);
      }
      if (data) {
        return await `${data.length}`;
      } else {
        return await "0";
      }
    };

    let getFollowersData = async () => {
      let { data, error } = await supabase.from("followers").select("*");
      // getFollowers = data;
      if (error) {
        console.log(error);
      }
      if (data) {
        getFollowers = await data;
        return getFollowers;
      }
    };
    if (id !== "null") {
      await getFollowersData();
      let { data, error } = await supabase
        .from("tags")
        .select("tags_id,name_tag,img_tag");
      if (error) {
        console.log(error);
      }
      if (data) {
        let getTags = async (data: any) => {
          let newob = [];
          for (const item of data) {
            newob.push({
              ...item,
              ...getFollowers[0],
              count: await countFollowers(item.tags_id),
            });
          }
          return newob;
        };
        return await getTags(data);
      }
    }
    // else {
    //   let { data, error } = await supabase
    //     .from("tags")
    //     .select(`tags_id,name_tag,img_tag`);

    //   if (error) {
    //     console.log(error);
    //   }
    //   if (data) {
    //     return console.log(data);
    //   }
    // }
  };
  let countFollowersJavaScript = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("javascript", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  let countFollowersHTML = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("html", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  let countFollowersCSS = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("css", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  let countFollowersReact = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("react", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  let countFollowersVue = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("vue", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  let countFollowersGit = async (t: any) => {
    let { data, error } = await supabase
      .from("followers")
      .select("*", { count: "exact" })
      .eq("git", t);
    if (error) {
      console.log(error);
    }
    if (data) {
      return `${data.length}`;
    } else {
      return "0";
    }
  };
  res.status(200).json({
    message: "Вы получили информацию о всех тегах",
    tags: await getTagsData(id),
    countFollowers: {
      JavaScript: await countFollowersJavaScript("true"),
      HTML: await countFollowersHTML("true"),
      CSS: await countFollowersCSS("true"),
      React: await countFollowersReact("true"),
      Vue: await countFollowersVue("true"),
      Git: await countFollowersGit("true"),
    },
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
