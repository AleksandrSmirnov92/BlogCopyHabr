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

const ProfileSettings = () => {
  let [pathImg, setPathImg] = useState(null);
  let [linkContactsValue, setLinkContactsValue] = useState("");
  let [country, setCountry] = useState("Страна");
  let [region, setRegion] = useState("Регион");
  let [town, setTown] = useState("Город");
  const myRef: any = useRef();
  const sendAvatar = async (selectedFile: any) => {
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

  const onSubmit = async () => {
    const res = await fetch("/settingsProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
        img: (values.img = pathImg),
        fullName: values.name.trim(),
        lastName: values.lastName.trim(),
        contacts: values.contacts,
        linkToContacts: (values.linkToContacts = linkContactsValue.trim()),
        briefly_about_yourself: values.brieflyAboutYourself.trim(),
        informattion_about_user: values.aboutMySelf.trim(),
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
    const data = await res.json();
    console.log(data);
  };
  const deleteImg = async (filePath: string) => {
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
  const resetContacts = (e: string) => {
    if (e === "Контакты") {
      setLinkContactsValue("");
    }
  };
  const locationCheck = (e: string) => {
    switch (e) {
      case "Страна":
        setRegion("Регион");
        setTown("Страна");
        break;
      case "Регион":
        setTown("Город");
        break;
    }
  };
  const getSettingsInformation = async () => {
    const res = await fetch(
      `/getInformationAboutUser/${localStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
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
  useEffect(() => {
    console.log("settingsProfile");
    getSettingsInformation();
  }, [pathImg]);
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<MyValues>({
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
    <div className={ProfileSettingsCSS.mainContainer}>
      <h3>Настройки профиля</h3>
      <div className={ProfileSettingsCSS.navigationPanel}>
        {/* <a href="#" className={ProfileSettingsCSS.links}> */}
        <span className={ProfileSettingsCSS.links}>Анкета</span>
        {/* </a> */}
      </div>
      <div className={ProfileSettingsCSS.changeAvatar}>
        <div className={ProfileSettingsCSS.avatar}>
          <img
            src={!pathImg ? ProfilIMG : pathImg}
            className={ProfileSettingsCSS.imgAvatar}
            alt=""
          />
        </div>
        <span className={ProfileSettingsCSS.changeAvatarText}>
          Ваша фотография.
          <br />
          Размер загружаемого файла
          <br />
          не должен превышать 2 Мб.
        </span>
        <div className={ProfileSettingsCSS.buttonContainer}>
          <input
            ref={myRef}
            onChange={(e) => {
              sendAvatar(e.target.files[0]);
            }}
            id="img"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
          ></input>
          <label className={ProfileSettingsCSS.buttonUpload} htmlFor="img">
            Загрузить
          </label>
          <button
            onClick={() => {
              deleteImg(pathImg);
              console.log(pathImg);
            }}
            className={ProfileSettingsCSS.buttonDelete}
          >
            Удалить
          </button>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      <form
        onSubmit={handleSubmit}
        className={ProfileSettingsCSS.personalInformationContainer}
      >
        <label className={ProfileSettingsCSS.title}>Имя</label>
        <input
          className={
            errors.name && touched.name
              ? ProfileSettingsCSS.inputError
              : ProfileSettingsCSS.personalInfomation
          }
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? (
          <span className={ProfileSettingsCSS.error}>{errors.name}</span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS.title}>Фамилия</label>
        <input
          className={
            errors.lastName && touched.lastName
              ? ProfileSettingsCSS.inputError
              : ProfileSettingsCSS.personalInfomation
          }
          type="text"
          id="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lastName && touched.lastName ? (
          <span className={ProfileSettingsCSS.error}>{errors.lastName}</span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS.title}>Кратко о себе</label>
        <input
          className={
            errors.brieflyAboutYourself && touched.brieflyAboutYourself
              ? ProfileSettingsCSS.inputError
              : ProfileSettingsCSS.personalInfomation
          }
          type="text"
          id="brieflyAboutYourself"
          value={values.brieflyAboutYourself}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.brieflyAboutYourself && touched.brieflyAboutYourself ? (
          <span className={ProfileSettingsCSS.error}>
            {errors.brieflyAboutYourself}
          </span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS.title}>О себе</label>
        <textarea
          className={
            errors.aboutMySelf && touched.aboutMySelf
              ? ProfileSettingsCSS.inputError
              : ProfileSettingsCSS.personalInfomation
          }
          value={values.aboutMySelf}
          id="aboutMySelf"
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        {errors.aboutMySelf && touched.aboutMySelf ? (
          <span className={ProfileSettingsCSS.error}>{errors.aboutMySelf}</span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS.title}>Мои контакты</label>
        <div className={ProfileSettingsCSS.myContactsContainer}>
          <select
            value={values.contacts}
            onChange={(e) => {
              handleChange(e);
              resetContacts(e.target.value);
            }}
            onBlur={handleBlur}
            className={ProfileSettingsCSS.contacts}
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
                ? ProfileSettingsCSS.inputErrorContacts
                : ProfileSettingsCSS.contacts
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
          <span className={ProfileSettingsCSS.error}>
            {errors.linkToContacts}
          </span>
        ) : (
          ""
        )}
        {values.contacts !== "Контакты" && values.linkToContacts === "" ? (
          <span className={ProfileSettingsCSS.error}>
            Обязательно поле для заполнения
          </span>
        ) : (
          ""
        )}
        {/* <button className={ProfileSettingsCSS.add}>Добавить</button> */}
        <label
          className={(ProfileSettingsCSS.title, ProfileSettingsCSS.location)}
        >
          Местоположение
        </label>
        <div className={ProfileSettingsCSS.myLocationContainer}>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              handleChange(e);
              setCountry(e.target.value);
              locationCheck(e.target.value);
            }}
            onBlur={handleBlur}
            className={ProfileSettingsCSS.location}
          >
            <option value={"Страна"}>Страна</option>
            <option value={"Россия"}>Россия</option>
          </select>
          <select
            className={ProfileSettingsCSS.location}
            id="region"
            value={region}
            onChange={(e) => {
              handleChange(e);
              setRegion(e.target.value);
              locationCheck(e.target.value);
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
            className={ProfileSettingsCSS.location}
            disabled={region === "Регион" ? true : false}
          >
            <option value={"Город"}>Город</option>
            <option value={"Дубна"}>Дубна</option>
          </select>
        </div>

        <button type="submit" className={ProfileSettingsCSS.saveСhanges}>
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
export default ProfileSettings;
