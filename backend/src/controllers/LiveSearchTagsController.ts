import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
exports.getAllTags = async (req: Request, res: Response) => {
  let { nameTag } = req.body;
  if (nameTag !== "") {
    let getTagInfo = await supabase
      .from("tags")
      .select()
      .ilike("name_tag", `%${nameTag}%`);
    res.status(200).json({
      status: "SUCCESS",
      tags: getTagInfo.data,
    });
  } else {
    res.status(200).json({
      status: "SUCCESS",
      tags: [],
    });
  }
};
