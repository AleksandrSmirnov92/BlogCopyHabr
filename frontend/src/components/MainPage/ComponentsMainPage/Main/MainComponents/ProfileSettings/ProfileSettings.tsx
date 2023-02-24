import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { schemaForProfileSettings } from "../../../../../Schemas/SchemaProfileSettings";
import ProfileSettingsCSS from "./ProfileSettings.module.css";
import ProfilIMG from "../../../../../../images/photoProfil.png";

interface MyValues {
  img: string;
  name: string;
  lastName: string;
  brieflyAboutYourself: string;
  aboutMySelf: string;
  contacts: string;
  linkToContacts: string;
  country: string;
  region: string;
  town: string;
}
const resetContacts = (
  e: string,
  setLinkContactsValue: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e === "Контакты") {
    setLinkContactsValue("");
  }
};
const locationCheck = (
  e: string,
  setRegion: React.Dispatch<React.SetStateAction<string>>,
  setTown: React.Dispatch<React.SetStateAction<string>>
) => {
  switch (e) {
    case "Страна":
      setRegion("Регион");
      setTown("Город");
      break;
    case "Регион":
      setTown("Город");
      break;
  }
};
const sendAvatar = async (
  selectedFile: File,
  setPathImg: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!selectedFile) {
    alert("Пожалуйста загрузите файл");
    return;
  }
  const formData = new FormData();
  formData.set("file", selectedFile);
  const res = await fetch(`/upload/${localStorage.getItem("userId")}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  setPathImg(data.filePath);
};
const deleteImg = async (
  filePath: string,
  setPathImg: React.Dispatch<React.SetStateAction<string>>,
  myRef: React.MutableRefObject<HTMLInputElement>
) => {
  const res = await fetch(`/deleteImg/${localStorage.getItem("userId")}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      path: filePath,
    }),
  });
  const data = await res.json();
  setPathImg(data.filePath);
  myRef.current.value = "";
};
const getSettingsInformation = async (
  values: MyValues,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setPathImg: React.Dispatch<React.SetStateAction<string>>,
  setLinkContactsValue: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setRegion: React.Dispatch<React.SetStateAction<string>>,
  setTown: React.Dispatch<React.SetStateAction<string>>
) => {
  const res = await fetch(
    `/getInformationAboutUser/${localStorage.getItem("userId")}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  setValue(data.body);
  setPathImg(data.body.img);
  values.name = data.body.fullname;
  values.lastName = data.body.lastname;
  values.brieflyAboutYourself = data.body.briefly_about_yourself;
  values.aboutMySelf = data.body.informattion_about_user;
  values.contacts = data.body.contacts;
  values.linkToContacts = data.body.linktocontacts;
  setLinkContactsValue(data.body.linktocontacts);
  setCountry(data.body.country);
  values.country = data.body.country;
  setRegion(data.body.region);
  values.region = data.body.region;
  setTown(data.body.town);
  values.town = data.body.town;
};

const ProfileSettings: React.FC = () => {
  let [value, setValue] = useState("");
  let [pathImg, setPathImg] = useState("");
  let [linkContactsValue, setLinkContactsValue] = useState("");
  let [country, setCountry] = useState("Страна");
  let [region, setRegion] = useState("Регион");
  let [town, setTown] = useState("Город");
  const myRef = useRef<HTMLInputElement>();
  const onSubmit = async () => {
    const res = await fetch("/updateProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
        fullName: values.name,
        lastName: values.lastName,
        contacts: values.contacts,
        linkToContacts: (values.linkToContacts = linkContactsValue),
        briefly_about_yourself: values.brieflyAboutYourself,
        informattion_about_user: values.aboutMySelf,
        country: (values.country = country),
        region: (values.region = region),
        town: (values.town = town),
      }),
    });
    setTimeout(() => {
      window.location.href = `http://localhost:3000/users/${localStorage.getItem(
        "userId"
      )}`;
    }, 1000);
  };
  useEffect(() => {
    getSettingsInformation(
      values,
      setValue,
      setPathImg,
      setLinkContactsValue,
      setCountry,
      setRegion,
      setTown
    );
  }, [pathImg]);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik<MyValues>({
      initialValues: {
        img: "",
        name: "",
        lastName: "",
        brieflyAboutYourself: "",
        aboutMySelf: "",
        contacts: "Контакты",
        linkToContacts: "",
        country: "Страна",
        region: "Регион",
        town: "Город",
      },
      onSubmit,
      validationSchema: schemaForProfileSettings,
    });

  return (
    <div className={ProfileSettingsCSS.profile_container}>
      <h3>Настройки профиля</h3>
      <nav className={ProfileSettingsCSS.nav}>
        <span>Анкета</span>
      </nav>
      <div className={ProfileSettingsCSS.profile_avatar__uploader}>
        <div className={ProfileSettingsCSS.profile_avatar__uploader__image}>
          <img src={!pathImg ? ProfilIMG : pathImg} alt="" />
        </div>
        <span className={ProfileSettingsCSS.profile_avatar__uploader__info}>
          Ваша фотография.
          <br />
          Размер загружаемого файла
          <br />
          не должен превышать 2 Мб.
        </span>
        <div className={ProfileSettingsCSS.buttons}>
          <input
            ref={myRef}
            onChange={(e) => {
              sendAvatar(e.target.files[0], setPathImg);
            }}
            id="img"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
          ></input>
          <label className={ProfileSettingsCSS.btn__upload} htmlFor="img">
            Загрузить
          </label>
          <button
            onClick={() => {
              deleteImg(pathImg, setPathImg, myRef);
            }}
            className={ProfileSettingsCSS.btn__delete}
          >
            Удалить
          </button>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      <form onSubmit={handleSubmit} className={ProfileSettingsCSS.input_group}>
        <label>Имя</label>
        <input
          className={
            errors.name && touched.name
              ? ProfileSettingsCSS.form_control__error
              : ProfileSettingsCSS.form_control
          }
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            {errors.name}
          </span>
        ) : (
          ""
        )}
        <label>Фамилия</label>
        <input
          className={
            errors.lastName && touched.lastName
              ? ProfileSettingsCSS.form_control__error
              : ProfileSettingsCSS.form_control
          }
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && touched.lastName ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            {errors.lastName}
          </span>
        ) : (
          ""
        )}
        <label>Кратко о себе</label>
        <input
          className={
            errors.brieflyAboutYourself && touched.brieflyAboutYourself
              ? ProfileSettingsCSS.form_control__error
              : ProfileSettingsCSS.form_control
          }
          type="text"
          id="brieflyAboutYourself"
          value={values.brieflyAboutYourself}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.brieflyAboutYourself && touched.brieflyAboutYourself ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            {errors.brieflyAboutYourself}
          </span>
        ) : (
          ""
        )}
        <label>О себе</label>
        <textarea
          className={
            errors.aboutMySelf && touched.aboutMySelf
              ? ProfileSettingsCSS.form_control__error
              : ProfileSettingsCSS.form_control
          }
          value={values.aboutMySelf}
          id="aboutMySelf"
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        {errors.aboutMySelf && touched.aboutMySelf ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            {errors.aboutMySelf}
          </span>
        ) : (
          ""
        )}
        <label>Мои контакты</label>
        <div className={ProfileSettingsCSS.form_select_block}>
          <select
            value={values.contacts}
            onChange={(e) => {
              handleChange(e);
              resetContacts(e.target.value, setLinkContactsValue);
            }}
            onBlur={handleBlur}
            className={`${ProfileSettingsCSS.form_select} ${ProfileSettingsCSS.fs_wd_sml}`}
            id="contacts"
          >
            <option value={"Контакты"}>Koнтакты</option>
            <option value={"Vkontakte"}>Vkontakte</option>
            <option value={"Githab"}>Githab</option>
            <option value={"E-mail"}>E-mail</option>
          </select>
          <input
            className={
              errors.linkToContacts &&
              touched.linkToContacts &&
              values.contacts !== "Контакты"
                ? `${ProfileSettingsCSS.form_control__error} ${ProfileSettingsCSS.fc_wd_lrg}`
                : `${ProfileSettingsCSS.form_control} ${ProfileSettingsCSS.fc_wd_lrg}`
            }
            onChange={(e) => {
              handleChange(e);
              setLinkContactsValue(e.target.value);
            }}
            onBlur={handleBlur}
            id="linkToContacts"
            type="text"
            placeholder={
              values.contacts === "Контакты"
                ? "Выберите контакт"
                : "Вставьте ссылку на контакты"
            }
            value={linkContactsValue}
            disabled={values.contacts === "Контакты" ? true : false}
          />
        </div>
        {errors.linkToContacts &&
        touched.linkToContacts &&
        values.contacts !== "Контакты" ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            {errors.linkToContacts}
          </span>
        ) : (
          ""
        )}
        {values.contacts !== "Контакты" && values.linkToContacts === "" ? (
          <span className={ProfileSettingsCSS.form_control__error__message}>
            Обязательно поле для заполнения
          </span>
        ) : (
          ""
        )}

        <label>Местоположение</label>
        <div className={ProfileSettingsCSS.form_select_block}>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              handleChange(e);
              setCountry(e.target.value);
              locationCheck(e.target.value, setCountry, setTown);
            }}
            onBlur={handleBlur}
            className={`${ProfileSettingsCSS.form_select} ${ProfileSettingsCSS.fs_wd_md}`}
          >
            <option value={"Страна"}>Страна</option>
            <option value={"Россия"}>Россия</option>
          </select>
          <select
            className={`${ProfileSettingsCSS.form_select} ${ProfileSettingsCSS.fs_wd_md}`}
            id="region"
            value={region}
            onChange={(e) => {
              handleChange(e);
              setRegion(e.target.value);
              locationCheck(e.target.value, setCountry, setTown);
            }}
            onBlur={handleBlur}
            disabled={country === "Страна" ? true : false}
          >
            <option value={"Регион"}>Регион</option>
            <option value={"Московская область"}>Московская область</option>
          </select>
          <select
            id="town"
            value={town}
            onChange={(e) => {
              handleChange(e);
              setTown(e.target.value);
            }}
            onBlur={handleBlur}
            className={`${ProfileSettingsCSS.form_select} ${ProfileSettingsCSS.fs_wd_md}`}
            disabled={region === "Регион" ? true : false}
          >
            <option value={"Город"}>Город</option>
            <option value={"Дубна"}>Дубна</option>
          </select>
        </div>

        <button type="submit" className={ProfileSettingsCSS.btn}>
          <span>
            Сохранить
            <br /> изменения
          </span>
        </button>
      </form>
    </div>
  );
};
export default ProfileSettings;
