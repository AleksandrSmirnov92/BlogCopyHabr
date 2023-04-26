import express, { Request, Response } from "express";
import { pool } from "../db.js";
import { supabase } from "../config/usersDataBase.js";
const path = require("path");
const fs = require("fs");
interface MulterRequest extends Request {
  files: any;
}
interface UploadAvatarResponse {
  message?: string;
  filePath?: string;
  err?: Error;
}
exports.uploadAvatar = async (
  req: Request,
  res: Response<UploadAvatarResponse>
) => {
  let { id } = req.params;
  const file = (req as MulterRequest).files.file;
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `/uploads/${file.name}` })
    .eq("user_id_from_users", id);

  const pathUpload = path.resolve(
    __dirname,
    "../../../Frontend/public/uploads"
  );
  if (!(req as MulterRequest).files) {
    return res.status(404).json({
      message: "Загрузите фотографию",
    });
  }
  if (fs.existsSync(`${pathUpload}/${file.name}`)) {
    return res.status(200).json({
      filePath: `/uploads/${file.name}`,
    });
  }
  file.mv(
    `${pathUpload}/${file.name}`,

    (err: Error) => {
      if (err) {
        return res.status(500).json({ err: err });
      }
      return res.status(200).json({
        filePath: `/uploads/${file.name}`,
      });
    }
  );
  // let addInformationInAboutUser = await pool.query(
  //   `UPDATE about_user SET img = $1 WHERE user_id_from_users = $2`,
  //   [`/uploads/${file.name}`, id]
  // );
};
interface DeleteAvatar {
  filePath: string;
}
exports.deleteAvatar = async (req: Request, res: Response<DeleteAvatar>) => {
  let { id } = req.params;
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `` })
    .eq("user_id_from_users", id);
  let filePath = req.body.path;
  const pathUpload = path.resolve(
    __dirname,
    `../../../Frontend/public/${filePath}`
  );
  fs.unlink(pathUpload, (err: Error) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        filePath: ``,
      });
    }
  });
  // let addInformationInAboutUser = await pool.query(
  //   `UPDATE about_user SET img = $1 WHERE user_id_from_users = $2`,
  //   [``, id]
  // );
};
