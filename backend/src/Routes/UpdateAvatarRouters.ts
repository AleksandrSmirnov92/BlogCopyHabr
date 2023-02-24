import express from "express";

const {
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/UpdateAvatarController");
const router = express.Router();

router.route("/:id").post(uploadAvatar).delete(deleteAvatar);
module.exports = router;
