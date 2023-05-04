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
};
