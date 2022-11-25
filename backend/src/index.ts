import express from "express";
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./db.js");
const path = require("path");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Frontend/public/")));
// Routes
// get allusers

app.post("/signUp", async (req, res) => {
  console.log(req.cookies);
  try {
    const { email, nickName, password } = req.body;
    console.log(email, nickName, password);
    const newUser = await pool.query(
      "INSERT INTO users (email,nickname,password) VALUES($1, $2, $3) RETURNING * ",
      [email, nickName, password]
    );
    return res.status(200).cookie("nickname", `${nickName}`).json({
      status: "SUCCESS",
      newUser: newUser.rows,
    });
  } catch (err: any) {
    return res.status(406).json({
      error: err.detail,
    });
  }
});

app.post("/signIn", async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: "SignIn обьект получен" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/users", async (req, res) => {
  try {
    res.status(200).json({ message: "Сервер работает на порту 5000" });
  } catch (err) {
    console.log(err);
  }
});
app.post("/users", async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
});
// get information user
// get information about question
app.listen("5000", () => {
  console.log("Server has started on port: 5000");
});
