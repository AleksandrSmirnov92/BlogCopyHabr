import express, { Request, Response } from "express";
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
    .select(`"*",question_and_tags(tags_id)`, { count: "exact" });
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
};
