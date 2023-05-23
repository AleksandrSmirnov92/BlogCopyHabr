import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
interface MulterRequest extends Request {
  files: any;
}
interface DeleteAvatar {
  filePath: string;
}
let url = `https://kwbwgorqvpvraiucnkqq.supabase.co/storage/v1/object/public/uploads/image`;
// const pathUpload = `${path.join(__dirname, "../../public/uploads")}`;
// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, __dirname + "../../../public/uploads/");
//   },
//   filename: function (req: any, file: any, cb: any) {
//     let { id } = req.params;
//     const originalName = encodeURIComponent(path.parse(file.originalname).name);
//     const extension = path.extname(file.originalname).toLowerCase();
//     cb(null, id + "_" + originalName + extension);
//   },
// });
// exports.upload = multer({ storage: storage });
exports.uploadAvatar = async (req: any, res: any) => {
  let { id } = req.params;
  // console.log(req.body);
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({ img: `${url}_${id}/${id}` })
    .eq("user_id", id);
  return res.status(200).json({
    message: " file successfully uploaded !!",
    filePath: `${url}_${id}/${id}`,
  });
  // const uploadImages = await supabase.storage
  //   .from("uploads")
  //   .

  // let { filePath } = req.body;
  // const file = (req as MulterRequest).files.file;

  // const getImages = await supabase.storage.from("uploads").list(id + "/");
  // console.log(file);
  // console.log(uploadImages);
  // console.log(uploadImages);
  // console.log("N", req.files);
  // console.log(path.join(__dirname, "../../public/uploads"));
  // const file = (req as MulterRequest).files.file;
  // if (!file) {
  //   return res.status(404).json({
  //     message: "Загрузите фотографию",
  //   });
  // }
  // if (fs.existsSync(`${pathUpload}/${id}_${req.file.originalname}`)) {
  //   const apdateAboutUser = await supabase
  //     .from("about_user")
  //     .update({ img: `/uploads/${id}_${req.file.originalname}` })
  //     .eq("user_id", id);
  //   return res.status(200).json({
  //     message: req.file.originalname + " file successfully uploaded !!",
  //     filePath: `/uploads/${id}_${req.file.originalname}`,
  //   });
  // } else {
  //   console.log("the file is not in the directory uploads");
  //   return res.status(404).json({
  //     message: "the file is not in the directory uploads",
  //   });
  // }
};

exports.deleteAvatar = async (req: Request, res: Response<DeleteAvatar>) => {
  let { id } = req.params;
  // let { filePath } = req.body;
  const { error } = await supabase.storage
    .from("uploads")
    .remove([`image_${id}/` + id]);
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
    console.log(error);
    res.status(200).json({
      filePath: getImage.data[0].img,
    });
  }

  // console.log(filePath);
  // const pathUpload = `${path.join(__dirname, `../../public/${filePath}`)}`;
  // if (fs.existsSync(`${pathUpload}`)) {
  //   const apdateAboutUser = await supabase
  //     .from("about_user")
  //     .update({ img: `` })
  //     .eq("user_id", id);
  // }
  // fs.unlink(pathUpload, (err: Error) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.status(200).json({
  //       filePath: ``,
  //     });
  //   }
  // });
};
