import express, { Request, Response } from "express";
import { supabase } from "../config/usersDataBase.js";
interface UpdateProfileRequest {
  id: string;
  fullName: string;
  lastName: string;
  contacts: string;
  linkToContacts: string;
  briefly_about_yourself: string;
  information_about_user: string;
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
    information_about_user,
    country,
    region,
    town,
  } = req.body;
  const apdateAboutUser = await supabase
    .from("about_user")
    .update({
      fullname: fullName,
      lastname: lastName,
      contacts: contacts,
      linktocontacts: linkToContacts,
      briefly_about_yourself: briefly_about_yourself,
      information_about_user: information_about_user,
      country: country,
      region: region,
      town: town,
    })
    .eq("user_id", id);
  res.status(200).json({
    message: "Вы обновили форму о пользователе",
  });
};
