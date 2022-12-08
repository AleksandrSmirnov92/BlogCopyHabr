import React, { useState } from "react";
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
}
const ProfileSettings = () => {
  let [selectedFile, setSelectedFiles] = useState(null);
  const onSubmit = () => {
    console.log(values.name.trim(), values.lastName.trim());
    console.log(values.brieflyAboutYourself.trim());
    console.log(values.contacts, values.linkToContacts.trim());
    console.log(values.img);
  };
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
        <a href="#" className={ProfileSettingsCSS.avatar}>
          <img src={ProfilIMG} className={ProfileSettingsCSS.imgAvatar} />
        </a>
        <span className={ProfileSettingsCSS.changeAvatarText}>
          Ваша фотография.
          <br />
          Размер загружаемого файла
          <br />
          не должен превышать 2 Мб.
        </span>
        <div className={ProfileSettingsCSS.buttonContainer}>
          <input
            onChange={(e) => {
              console.log(e.target.files);
              setSelectedFiles(e.target.files[0]);
            }}
            id="img"
            type="file"
            accept="image/*,.png,.jpg,.gif,.web"
          ></input>
          <label className={ProfileSettingsCSS.buttonUpload} htmlFor="img">
            Загрузить
          </label>
          <button className={ProfileSettingsCSS.buttonDelete}>Удалить</button>
        </div>
      </div>

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
          >
            <option id="contacts">Vkontakte</option>
            <option id="contacts">Githab</option>
            <option id="contacts">E-mail</option>
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
          <select className={ProfileSettingsCSS.location}>
            <option>Страна</option>
            <option>Россия</option>
          </select>
          <select className={ProfileSettingsCSS.location} name="" id="">
            <option>Регион</option>
            <option>Московская область</option>
          </select>
          <select className={ProfileSettingsCSS.location}>
            <option value="">Город</option>
            <option value="">Дубна</option>
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
