import express from "express";
const {
  uploadAvatar,
  deleteAvatar,
  upload,
} = require("../controllers/UpdateAvatarController");
const router = express.Router();
router
  .route("/:id")
  // .post(upload.single("file"), uploadAvatar)
  .get(uploadAvatar)
  .delete(deleteAvatar);
module.exports = router;
