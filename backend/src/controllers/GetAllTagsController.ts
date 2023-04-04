import express, { Request, Response } from "express";
import { pool } from "../db.js";
exports.getAllTags = async (req: Request, res: Response) => {
  try {
    let getTags = await pool.query("SELECT * FROM tags");
    res.status(200).json({
      status: "SUCCESS",
      tags: getTags.rows,
    });
  } catch (err) {
    console.log(err);
  }
};
