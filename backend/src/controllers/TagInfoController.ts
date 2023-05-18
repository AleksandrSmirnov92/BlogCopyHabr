import express, { Request, Response } from "express";
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
};
