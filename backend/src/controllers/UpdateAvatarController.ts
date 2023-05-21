import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
const multer = require("multer");
const path = require("path");
const fs = require("fs");
interface MulterRequest extends Request {
  files: any;
}
interface DeleteAvatar {
  filePath: string;
}
// interface UploadAvatarResponse {
//   message?: string;
//   filePath?: string;
//   err?: Error;
//   next: any;
// }
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, __dirname + "../../../public/uploads");
  },
  filename: function (req: any, file: any, cb: any) {
    let { id } = req.params;
    const originalName = encodeURIComponent(path.parse(file.originalname).name);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, id + "_" + originalName + extension);
  },
});
exports.upload = multer({ storage: storage });
exports.uploadAvatar = async (req: any, res: any, file: any) => {
  let { id } = req.params;
  // const file = (req as MulterRequest).files.file;
  const pathUpload = `${path.join(__dirname, "../../public/uploads")}`;
  if (!file) {
    return res.status(404).json({
      message: "Загрузите фотографию",
    });
  }
  if (fs.existsSync(`${pathUpload}/${id}_${req.file.originalname}`)) {
    const apdateAboutUser = await supabase
      .from("about_user")
      .update({ img: `/uploads/${id}_${req.file.originalname}` })
      .eq("user_id", id);
    return res.status(200).json({
      message: req.file.originalname + " file successfully uploaded !!",
      filePath: `/uploads/${id}_${req.file.originalname}`,
    });
  } else {
    console.log("the file is not in the directory uploads");
    return res.status(404).json({
      message: "the file is not in the directory uploads",
    });
  }

  // var storage = multer.diskStorage({
  //   destination: `${pathUpload}`,
  //   filename: function (req: any, file: any, cb: any) {
  //     cb(null, file.originalname);
  //   },
  // });
  // const upload = multer({ storage: storage });
  // upload.single("file");
  // file.mv(`${pathUpload}/${file.name}`, (err: Error) => {
  //   if (err) {
  //     return res.status(500).json({ err: err, message: "ошибка" });
  //   }
  //   if (fs.existsSync(`${pathUpload}/${file.name}`)) {
  //     console.log("файл записан");
  //     return res.status(200).json({
  //       message: `файл записан по адрессу = ${pathUpload}/${file.name}`,
  //       filePath: `../../../../../../uploads/${file.name}`,
  //     });
  //   } else {
  //     console.log("файл не записан");
  //     return res.status(200).json({
  //       message: `файла по адрессу = ${pathUpload}/${file.name} не существует`,
  //       filePath: `../../../../../../uploads/${file.name}`,
  //     });
  //   }
  // });
};

exports.deleteAvatar = async (req: Request, res: Response<DeleteAvatar>) => {
  let { id } = req.params;
  let { filePath } = req.body;
  const pathUpload = `${path.join(__dirname, `../../public/${filePath}`)}`;
  if (fs.existsSync(`${pathUpload}`)) {
    const apdateAboutUser = await supabase
      .from("about_user")
      .update({ img: `` })
      .eq("user_id", id);
  }
  fs.unlink(pathUpload, (err: Error) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        filePath: ``,
      });
    }
  });

  // const apdateAboutUser = await supabase
  //   .from("about_user")
  //   .update({ img: `` })
  //   .eq("user_id", id);

  // const pathUpload = path.resolve(
  //   __dirname,
  //   `../../../Backend/Frontend/${filePath}`
  // );
  // const pathUpload = path.resolve(
  //   __dirname,
  //   `../../../Backend/public/${filePath}`
  // );

  // const pathUpload = path.resolve(__dirname, `/public/${filePath}`);
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
