import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
interface DeleteAvatar {
  filePath: string;
}

exports.uploadAvatar = async (req: Request, res: Response) => {
  let url = `https://kwbwgorqvpvraiucnkqq.supabase.co/storage/v1/object/public/uploads/image`;
  let { id } = req.params;
  let { nameAvatar } = req.body;
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `${url}_${id}/${nameAvatar}` })
    .eq("user_id", id);
  return res.status(200).json({
    message: " file successfully uploaded !!",
    filePath: `${url}_${id}/${nameAvatar}`,
  });
};

exports.deleteAvatar = async (req: Request, res: Response<DeleteAvatar>) => {
  let { id } = req.params;
  let { filePath } = req.body;
  let spl = filePath.substr(74);
  const { error } = await supabase.storage.from("uploads").remove([spl]);
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `` })
    .eq("user_id", id);
  if (error) {
    console.log(error);
  } else {
    const getImage = await supabase
      .from("about_user")
      .select("img")
      .eq("user_id", id);
    res.status(200).json({
      filePath: getImage.data[0].img,
    });
  }
};
