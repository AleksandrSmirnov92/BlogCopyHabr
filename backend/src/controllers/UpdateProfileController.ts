import express, { Request, Response } from "express";
import { pool } from "../db.js";
interface UpdateProfileRequest {
  id: string;
  fullName: string;
  lastName: string;
  contacts: string;
  linkToContacts: string;
  briefly_about_yourself: string;
  informattion_about_user: string;
  country: string;
  region: string;
  town: string;
}
interface UpdateProfileResponce {
  message: string;
}
exports.updateProfile = async (
  req: Request<{}, {}, UpdateProfileRequest>,
  res: Response<UpdateProfileResponce>
) => {
  let {
    id,
    fullName,
    lastName,
    contacts,
    linkToContacts,
    briefly_about_yourself,
    informattion_about_user,
    country,
    region,
    town,
  } = req.body;
  try {
    let addInformationInAboutUser = await pool.query(
      `UPDATE about_user SET fullname = $1,lastname = $2,contacts = $3,linktocontacts = $4,briefly_about_yourself = $5,informattion_about_user = $6,country = $7,region = $8,town = $9 WHERE user_id_from_users = $10`,
      [
        fullName,
        lastName,
        contacts,
        linkToContacts,
        briefly_about_yourself,
        informattion_about_user,
        country,
        region,
        town,
        id,
      ]
    );
    res.status(200).json({
      message: "Вы загрузили форму о пользователе",
    });
  } catch (err) {
    console.log(err);
  }
};
