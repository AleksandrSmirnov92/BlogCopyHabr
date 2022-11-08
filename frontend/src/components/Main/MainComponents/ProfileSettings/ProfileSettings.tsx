import React from "react";
import ProfileSettingsCSS from "./ProfileSettings.module.css";

const ProfileSettings = () => {
  return (
    <div className={ProfileSettingsCSS.mainContainer}>
      <h3>Настройки профиля</h3>
      <div className={ProfileSettingsCSS.navigationPanel}>
        <a href="#" className={ProfileSettingsCSS.links}>
          <span>Анкета</span>
        </a>
        <a href="#" className={ProfileSettingsCSS.links}>
          <span>Аккаунт</span>
        </a>
      </div>
      <div className={ProfileSettingsCSS.changeAvatar}>
        <a href="#" className={ProfileSettingsCSS.avatar}>
          <img
            src="../img/photoProfil.png"
            className={ProfileSettingsCSS.imgAvatar}
          />
        </a>
        <span className={ProfileSettingsCSS.changeAvatarText}>
          Ваша фотография.
          <br />
          Размер загружаемого файла
          <br />
          не должен превышать 2 Мб.
        </span>
        <div className={ProfileSettingsCSS.buttonContainer}>
          <button className={ProfileSettingsCSS.buttonUpload}>Загрузить</button>
          <button className={ProfileSettingsCSS.buttonDelete}>Удалить</button>
        </div>
      </div>
      <div className={ProfileSettingsCSS.personalInformationContainer}>
        <label className={ProfileSettingsCSS.title}>Имя</label>
        <input
          className={ProfileSettingsCSS.personalInfomation}
          type="text"
          id="name"
        />
        <label className={ProfileSettingsCSS.title}>Фамилия</label>
        <input
          className={ProfileSettingsCSS.personalInfomation}
          type="text"
          id="lastName"
        />
        <label className={ProfileSettingsCSS.title}>Кратко о себе</label>
        <input
          className={ProfileSettingsCSS.personalInfomation}
          type="text"
          id="brieflyAboutYourself"
        />
        <label className={ProfileSettingsCSS.title}>О себе</label>
        <textarea
          className={ProfileSettingsCSS.personalInfomation}
          id="aboutMySelf"
        ></textarea>
        <label className={ProfileSettingsCSS.title}>Мои контакты</label>
        <div className={ProfileSettingsCSS.myContactsContainer}>
          <select className={ProfileSettingsCSS.contacts}>
            <option>Vkontakte</option>
            <option>Githab</option>
            <option>E-mail</option>
          </select>
          <input
            className={
              (ProfileSettingsCSS.personalInfomation,
              ProfileSettingsCSS.contacts)
            }
            type="text"
          />
        </div>
        <button className={ProfileSettingsCSS.add}>Добавить</button>
        <label
          className={(ProfileSettingsCSS.title, ProfileSettingsCSS.location)}
        >
          Местоположение
        </label>
        <div className={ProfileSettingsCSS.myLocationContainer}>
          <select className={ProfileSettingsCSS.location}>
            <option>Россия</option>
          </select>
          <select className={ProfileSettingsCSS.location} name="" id="">
            <option>Регион</option>
          </select>
          <select className={ProfileSettingsCSS.location}>
            <option value="">Город</option>
          </select>
        </div>
        <button className={ProfileSettingsCSS.saveСhanges}>
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
export default ProfileSettings;
