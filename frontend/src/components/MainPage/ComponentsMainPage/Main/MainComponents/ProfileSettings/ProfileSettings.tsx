import React, { useEffect, useRef, useState, useContext } from "react";
import { useFormik } from "formik";
import { schemaForProfileSettings } from "../../../../../Schemas/SchemaProfileSettings";
import ProfileSettingsCSS from "./ProfileSettings.module.css";
import ProfilIMG from "../../../../../../images/photoProfil.png";
import userIdContext from "../../../../../Context/Context";
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
interface Context {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileSettings: React.FC = () => {
  const userId = useContext<Context>(userIdContext);
  let [name, setName] = useState("");
  let [lastName, setLastName] = useState("");
  let [brieflyAboutYourself, setBrieflyAboutYourself] = useState("");
  let [aboutMySelf, setAboutMySelf] = useState("");
  let [contacts, setContacts] = useState("");
  let [linkContactsValue, setLinkContactsValue] = useState("");
  let [country, setCountry] = useState("Страна");
  let [region, setRegion] = useState("Регион");
  let [town, setTown] = useState("Город");
  let [pathImg, setPathImg] = useState("");

  const myRef = useRef<HTMLInputElement>();
  // ---------------------------------------------
  const resetContacts = (e: string) => {
    if (e === "Контакты") {
      setLinkContactsValue("");
    }
  };
  // --------------------------------------------
  const locationCheck = (e: string) => {
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
  // ----------------------------------------------
  const sendAvatar = async (selectedFile: File) => {
    if (!selectedFile) {
      alert("Пожалуйста загрузите файл");
      return;
    }
    const formData = new FormData();
    formData.set("file", selectedFile);
    const res = await fetch(`/updateAvatar/${localStorage.getItem("userId")}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data.filePath);
    setPathImg(data.filePath);
  };
  // -----------------------------------------------
  const deleteImg = async (
    filePath: string,
    setPathImg: React.Dispatch<React.SetStateAction<string>>,
    myRef: React.MutableRefObject<HTMLInputElement>
  ) => {
    const res = await fetch(`/updateAvatar/${localStorage.getItem("userId")}`, {
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
  // --------------------------------------------------
  const onSubmit = async () => {
    fetch("/updateProfile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("userId"),
        fullName: name,
        lastName: lastName,
        contacts: contacts,
        linkToContacts: linkContactsValue,
        briefly_about_yourself: brieflyAboutYourself,
        information_about_user: aboutMySelf,
        country: country,
        region: region,
        town: town,
      }),
    });
    setTimeout(() => {
      window.location.href = `/users/${localStorage.getItem("userId")}`;
    }, 500);
  };
  // ------------------------------------------------------------------------

  useEffect(() => {
    const getSettingsInformation = async () => {
      const res = await fetch(
        `/getInformationAboutUser/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      values.name = data.users.fullname;
      setName(data.users.fullname);
      values.lastName = data.users.lastname;
      setLastName(data.users.lastname);
      values.brieflyAboutYourself = data.users.briefly_about_yourself;
      setBrieflyAboutYourself(data.users.briefly_about_yourself);
      values.aboutMySelf = data.users.informattion_about_user;
      setAboutMySelf(data.users.information_about_user);
      values.contacts = data.users.contacts;
      setContacts(data.users.contacts);
      values.linkToContacts = data.users.linktocontacts;
      setLinkContactsValue(data.users.linktocontacts);
      values.country = data.users.country;
      setCountry(data.users.country);
      values.region = data.users.region;
      setRegion(data.users.region);
      values.town = data.users.town;
      setTown(data.users.town);
      setPathImg(data.users.img);
    };
    getSettingsInformation();
  }, [pathImg, userId]);
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
    <div className={ProfileSettingsCSS["profile-container"]}>
      <h3>Настройки профиля</h3>
      <nav className={ProfileSettingsCSS["nav"]}>
        <span className={ProfileSettingsCSS["nav__item"]}>Анкета</span>
      </nav>
      <div className={ProfileSettingsCSS["profile-avatar-block"]}>
        <div className={ProfileSettingsCSS["profile-avatar-block__image"]}>
          <img src={!pathImg ? ProfilIMG : pathImg} alt="" />
        </div>
        <span className={ProfileSettingsCSS["profile-avatar-block__text"]}>
          Ваша фотография.
          <br />
          Размер загружаемого файла
          <br />
          не должен превышать 2 Мб.
        </span>
        <div className={ProfileSettingsCSS["profile-avatar-block__btns"]}>
          <input
            ref={myRef}
            onChange={(e) => {
              sendAvatar(e.target.files[0]);
            }}
            id="img"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
          ></input>
          <label
            className={ProfileSettingsCSS["profile-avatar-block__btn-upload"]}
            htmlFor="img"
          >
            Загрузить
          </label>
          <button
            onClick={() => {
              deleteImg(pathImg, setPathImg, myRef);
            }}
            className={ProfileSettingsCSS["profile-avatar-block__btn-delete"]}
          >
            Удалить
          </button>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------------------ */}
      <form
        onSubmit={handleSubmit}
        className={ProfileSettingsCSS["input-group"]}
      >
        <label className={ProfileSettingsCSS["form-label"]}>Имя</label>
        <input
          className={
            errors.name && touched.name
              ? ProfileSettingsCSS["form-control-error"]
              : ProfileSettingsCSS["form-control"]
          }
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            handleChange(e);
            setName(e.target.value);
          }}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            {errors.name}
          </span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS["form-label"]}>Фамилия</label>
        <input
          className={
            errors.lastName && touched.lastName
              ? ProfileSettingsCSS["form-control-error"]
              : ProfileSettingsCSS["form-control"]
          }
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => {
            handleChange(e);
            setLastName(e.target.value);
          }}
          onBlur={handleBlur}
        />
        {errors.lastName && touched.lastName ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            {errors.lastName}
          </span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS["form-label"]}>
          Кратко о себе
        </label>
        <input
          className={
            errors.brieflyAboutYourself && touched.brieflyAboutYourself
              ? ProfileSettingsCSS["form-control-error"]
              : ProfileSettingsCSS["form-control"]
          }
          type="text"
          id="brieflyAboutYourself"
          value={brieflyAboutYourself}
          onChange={(e) => {
            handleChange(e);
            setBrieflyAboutYourself(e.target.value);
          }}
          onBlur={handleBlur}
        />
        {errors.brieflyAboutYourself && touched.brieflyAboutYourself ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            {errors.brieflyAboutYourself}
          </span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS["form-label"]}>О себе</label>
        <textarea
          className={
            errors.aboutMySelf && touched.aboutMySelf
              ? ProfileSettingsCSS["form-control-error"]
              : ProfileSettingsCSS["form-control"]
          }
          value={aboutMySelf}
          id="aboutMySelf"
          onChange={(e) => {
            handleChange(e);
            setAboutMySelf(e.target.value);
          }}
          onBlur={handleBlur}
        ></textarea>
        {errors.aboutMySelf && touched.aboutMySelf ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            {errors.aboutMySelf}
          </span>
        ) : (
          ""
        )}
        <label className={ProfileSettingsCSS["form-label"]}>Мои контакты</label>
        <div className={ProfileSettingsCSS["form-control__select-block"]}>
          <select
            value={contacts}
            onChange={(e) => {
              handleChange(e);
              setContacts(e.target.value);
              setLinkContactsValue("");
              resetContacts(e.target.value);
            }}
            onBlur={handleBlur}
            className={`${ProfileSettingsCSS["form-control__select"]} ${ProfileSettingsCSS["form-control__select_wd-sml"]}`}
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
              contacts !== "Контакты"
                ? `${ProfileSettingsCSS["form-control-error"]} ${ProfileSettingsCSS["form-control__select_wd-lrg"]}`
                : `${ProfileSettingsCSS["form-control"]} ${ProfileSettingsCSS["form-control__select_wd-lrg"]}`
            }
            onChange={(e) => {
              handleChange(e);
              setLinkContactsValue(e.target.value);
            }}
            onBlur={handleBlur}
            id="linkToContacts"
            type="text"
            placeholder={
              contacts !== "Контакты"
                ? "Вставьте ссылку на контакты"
                : "Выберите контакт"
            }
            value={linkContactsValue}
            disabled={contacts === "Контакты" ? true : false}
          />
        </div>
        {errors.linkToContacts &&
        touched.linkToContacts &&
        contacts !== "Контакты" ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            {errors.linkToContacts}
          </span>
        ) : (
          ""
        )}
        {contacts !== "Контакты" && linkContactsValue === "" ? (
          <span className={ProfileSettingsCSS["form-control-error__text"]}>
            Обязательно поле для заполнения
          </span>
        ) : (
          ""
        )}

        <label className={ProfileSettingsCSS["form-label"]}>
          Местоположение
        </label>
        <div className={ProfileSettingsCSS["form-control__select-block"]}>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              handleChange(e);
              setCountry(e.target.value);
              locationCheck(e.target.value);
            }}
            onBlur={handleBlur}
            className={`${ProfileSettingsCSS["form-control__select"]} ${ProfileSettingsCSS["form-control__select_wd-md"]}`}
          >
            <option value={"Страна"}>Страна</option>
            <option value={"Россия"}>Россия</option>
          </select>
          <select
            className={`${ProfileSettingsCSS["form-control__select"]} ${ProfileSettingsCSS["form-control__select_wd-md"]}`}
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
            className={`${ProfileSettingsCSS["form-control__select"]} ${ProfileSettingsCSS["form-control__select_wd-md"]}`}
            disabled={region === "Регион" ? true : false}
          >
            <option value={"Город"}>Город</option>
            <option value={"Дубна"}>Дубна</option>
          </select>
        </div>

        <button type="submit" className={ProfileSettingsCSS["btn"]}>
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
