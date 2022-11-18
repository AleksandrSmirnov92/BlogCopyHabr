import React from "react";
import { Route, Routes } from "react-router-dom";
import MainCSS from "./Main.module.css";
import ProfileSettings from "./MainComponents/ProfileSettings/ProfileSettings";
import AllQuestions from "./MainComponents/AllQuestions/AllQuestions";
import Tags from "./MainComponents/Tags/Tags";
import Users from "./MainComponents/Users/Users";
import User from "./MainComponents/Users/User/User";
import UsersProfilIMG from "../../../../images/photoProfil.png";
let users: {}[] = [
  {
    id: "1",
    photo: UsersProfilIMG,
    name: "Aleksandr",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
  {
    id: "2",
    photo: UsersProfilIMG,
    name: "Kostya",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
  {
    id: "3",
    photo: UsersProfilIMG,
    name: "Marina",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
  {
    id: "4",
    photo: UsersProfilIMG,
    name: "Sveta",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
  {
    id: "5",
    photo: UsersProfilIMG,
    name: "Sergey",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
  {
    id: "6",
    photo: UsersProfilIMG,
    name: "Anton",
    responseAndQuestions: {
      response: "4K ответов",
      questions: "0 вопросов",
    },
    aboutUser: {
      contacts: {
        email: "",
        Githab: "",
        Vkontakte: "",
      },
      location: {
        country: "",
        region: "",
        city: "",
      },
    },
  },
];
const Main = () => {
  return (
    <main className={MainCSS.main}>
      <Routes>
        <Route path="/settingsProfil" element={<ProfileSettings />} />
        <Route path="/questions" element={<AllQuestions />} />
        {/* <Route path="/" element={<AllQuestions />} /> */}
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<Users users={users} />} />
        /
        <Route path="/users/:userId" element={<User users={users} />} />
      </Routes>
    </main>
  );
};
export default Main;
