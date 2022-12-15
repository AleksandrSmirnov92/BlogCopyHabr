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
  let [selectedFile, setSelectedFiles] = useState(null);
  let [pathImg, setPathImg] = useState(null);
  const myRef: any = useRef();
  // useEffect(() => {
  //   setSelectedFiles("Привет");
  // }, []);
  const sendAvatar = async (selectedFile: any) => {
    if (!selectedFile) {
      alert("Пожалуйста загрузите файл");
      return;
    }
    const formData = new FormData();
    formData.set("file", selectedFile);
    const res = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setPathImg(data.filePath);
  };

  const onSubmit = async () => {
    values.img = pathImg;
    const res = await fetch("/settingsProfil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        img: values.img,
        fullName: values.name.trim(),
        lastName: values.lastName.trim(),
        contacts: values.contacts,
        linkToContacts: values.linkToContacts.trim(),
        briefly_about_yourself: values.brieflyAboutYourself.trim(),
        informattion_about_user: values.aboutMySelf.trim(),
        country: values.country,
        region: values.region,
        town: values.town,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  const deleteImg = async (filePath: string) => {
    const res = await fetch("/deleteImg", {
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
  // useEffect(() => {
  //   if (selectedFile) {
  //     sendAvatar();
  //     console.log("render1");
  //     console.log(pathImg);
  //     // setSelectedFiles(null);
  //   }
  // }, [selectedFile]);
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
      contacts: "",
      linkToContacts: "",
      country: "",
      region: "",
      town: "",
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
              // setSelectedFiles(e.target.files[0]);
              console.log("Отправить");
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
            onChange={handleChange}
            onBlur={handleBlur}
            className={ProfileSettingsCSS.contacts}
            id="contacts"
            // defaultValue={"Vkontakte"}
          >
            <option>Koнтакты</option>
            <option>Vkontakte</option>
            <option>Githab</option>
            <option>E-mail</option>
          </select>
          <input
            // className={
            //   (ProfileSettingsCSS.personalInfomation,
            //   ProfileSettingsCSS.contacts)
            // }
            className={
              errors.linkToContacts && touched.linkToContacts
                ? (ProfileSettingsCSS.inputError, ProfileSettingsCSS.contacts)
                : (ProfileSettingsCSS.personalInfomation,
                  ProfileSettingsCSS.contacts)
            }
            onChange={handleChange}
            onBlur={handleBlur}
            id="linkToContacts"
            type="text"
            placeholder="Вставьте ссылку на контакты"
          />
        </div>
        {errors.linkToContacts && touched.linkToContacts ? (
          <span className={ProfileSettingsCSS.error}>
            {errors.linkToContacts}
          </span>
        ) : (
          ""
        )}
        <button className={ProfileSettingsCSS.add}>Добавить</button>
        <label
          className={(ProfileSettingsCSS.title, ProfileSettingsCSS.location)}
        >
          Местоположение
        </label>
        <div className={ProfileSettingsCSS.myLocationContainer}>
          <select
            id="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className={ProfileSettingsCSS.location}
          >
            <option>Страна</option>
            <option>Россия</option>
          </select>
          <select
            className={ProfileSettingsCSS.location}
            id="region"
            value={values.region}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Регион</option>
            <option>Московская область</option>
          </select>
          <select
            id="town"
            value={values.town}
            onChange={handleChange}
            onBlur={handleBlur}
            className={ProfileSettingsCSS.location}
          >
            <option>Город</option>
            <option>Дубна</option>
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
