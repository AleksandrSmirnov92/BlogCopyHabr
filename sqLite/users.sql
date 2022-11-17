CREATE TABLE about_user (
 id_about_user BIGSERIAL PRIMARY KEY,
 img VARCHAR(100), 
 fullname VARCHAR(50),
 lastname VARCHAR(50),
 briefly_about_yourself VARCHAR(200),
 about_yourself VARCHAR(1000)
 );

CREATE TABLE Users (
user_id BIGSERIAL PRIMARY KEY, 
email VARCHAR(50) NOT NULL,
nickname VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
about_user_id BIGINT REFERENCES about_user (id_about_user), UNIQUE (about_user_id)
);
-- carID BIGINT REFERENCES cars (id), UNIQUE (carID)

INSERT INTO users (email,nickname,password)
VALUES('ryan00@mail.ru','Aleksandr','12345');
INSERT INTO users (email,nickname,password)
VALUES('Kolya00@mail.ru','Kolya','111110');
INSERT INTO  users (email,nickname,password)
VALUES('Sofia@mail.ru','Sofia','22222');
INSERT INTO users (email,nickname,password)
VALUES('prozorovap@mail.ru','Polina','252525');
INSERT INTO users (email,nickname,password)
VALUES('ryan01@mail.ru','Sergey','454545');
INSERT INTO users (email,nickname,password)
VALUES('valery00@mail.ru','Valery','pushpush');
INSERT INTO users (email,nickname,password)
VALUES('anton00@mail.ru','Anton','antonyPeyter24');
--------------------------------------------------------------
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Aleksandr','Smirnov','Занимаюсь спортом,учусь программировать','Катаюсь на бмх,учу программирование,занимаюсь спортом и тд');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Коля','Наумов','Снимаюсь в кино','Снимаюсь в кино есть друзья Антоха и Вова');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','София','Абрамова','Работаю в отраде','Есть красный мерседес к программированию отношения не имею');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Полина','Смирнова','Есть любимый муж','Люблю творить,создавать мечтать');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Сергей','Любенко','Работаю водителем учу git','Работаю водителем мечтаю овладеть языком JavaScript');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Валерий','Смирнов','Бокс моя жизнь','Люблю боксировать,есть автомобиль,есть девушка,учу верстку ');
INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
VALUES('avatar','Антон','Пейтер','Люблю автомобили mersedes','Люблю автомобили mersedes, ат так же люблю ездить на мотоцикле и тд');

