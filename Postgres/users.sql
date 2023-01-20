
-- 1 Таблица

CREATE TABLE about_user (
 id_about_user BIGSERIAL PRIMARY KEY,
 user_id_from_users BIGINT REFERENCES users (user_id),
 img VARCHAR(100), 
 fullname VARCHAR(50),
 lastname VARCHAR(50),
 contacts VARCHAR(50),
 linkToContacts VARCHAR(200),
 briefly_about_yourself VARCHAR(500),
 informattion_about_user VARCHAR(1000),
 country VARCHAR(100),
 region VARCHAR(500),
 town VARCHAR(100)
 );
--  - уникальный столбец user_id
-- alter table about_user add constraint unique_user_id unique(user_id_from_users); 

-- 2 таблица 
-- CREATE TABLE Users (
-- user_id BIGSERIAL PRIMARY KEY, 
-- email VARCHAR(50)  NOT NULL,
-- nickname VARCHAR(50) NOT NULL,
-- password VARCHAR(50) NOT NULL,
-- );
-- INSERT INTO users (email,nickname,password)
-- VALUES('ryan00@mail.ru','Aleksandr','12345');
-- INSERT INTO users (email,nickname,password)
-- VALUES('Kolya00@mail.ru','Kolya','111110');
-- INSERT INTO  users (email,nickname,password)
-- VALUES('Sofia@mail.ru','Sofia','22222');
-- INSERT INTO users (email,nickname,password)
-- VALUES('prozorovap@mail.ru','Polina','252525');
-- INSERT INTO users (email,nickname,password)
-- VALUES('ryan01@mail.ru','Sergey','454545');
-- INSERT INTO users (email,nickname,password)
-- VALUES('valery00@mail.ru','Valery','pushpush');
-- INSERT INTO users (email,nickname,password)
-- VALUES('anton00@mail.ru','Anton','antonyPeyter24');

-- 3 таблица
-- CREATE TABLE questions (
-- questions_id BIGSERIAL PRIMARY KEY,
-- user_id BIGINT REFERENCES users (user_id),
-- question_title VARCHAR(100),
-- question_tags BIGINT REFERENCES tags(tags_id),
-- question_details VARCHAR(5000)
-- );

-- 4 таблица
-- CREATE TABLE question_and_tags (
--  id_questions_and_tags BIGSERIAL PRIMARY KEY,
--  user_id_from_users BIGINT REFERENCES users (user_id),
--  tag_id_from_tags BIGINT REFERENCES tags (tags_Id)
--  );


-- 5 таблица
-- CREATE TABLE tags (
-- tags_id BIGSERIAL PRIMARY KEY,
-- name_tag VARCHAR(50),
-- img_tag VARCHAR(60),
-- description VARCHAR(1000)
-- );
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('JavaScript','/images/JavascriptTag.png',' JavaScript - прототипно-ориентированный сценарный язык программирования. Обычно используется как встраиваемый язык для программного доступа к объектам приложений. Наиболее широкое применение находит в браузерах как язык сценариев для придания интерактивности веб-страницам.');
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('HTML','/images/HTMLtag.png','HTML (от англ. HyperText Markup Language - <язык гипертекстовой разметки>) - стандартный язык разметки документов во Всемирной паутине. Большинство веб-страниц содержат описание разметки на языке HTML (или XHTML). Язык HTML интерпретируется браузерами и отображается в виде документа в удобной для человека форме.');
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('CSS','/images/CSStag.png',' CSS (англ. Cascading Style Sheets - каскадные таблицы стилей) - формальный язык описания внешнего вида документа, написанного с использованием языка разметки.');
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('React',' /images/Reacttag.png',' React - это JavaScript библиотека для создания пользовательских интерфейсов от Facebook.');
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('Vue','/images/Vuetag.png','Vue - это прогрессивный фреймворк для создания пользовательских интерфейсов. В отличие от фреймворков-монолитов, Vue создан пригодным для постепенного внедрения. Его ядро в первую очередь решает задачи уровня представления (view), что упрощает интеграцию с другими библиотеками и существующими проектами.');
-- INSERT INTO tags (name_tag,img_tag,description)
-- VALUES('Git','/images/Gittag.png',' Git - распределённая система управления версиями файлов и совместной работы. Проект был создан Линусом Торвальдсом для управления разработкой ядра Linux. На сегодняшний день поддерживается Джунио Хамано (Junio C. Hamano).');

-- 6 таблица
-- CREATE TABLE followers (
-- followers_id BIGSERIAL PRIMARY KEY,
-- followers_id_from_users BIGINT REFERENCES users (user_id),
-- JavaScript BOOLEAN NOT NULL,
-- HTML BOOLEAN NOT NULL,
-- CSS BOOLEAN NOT NULL,
-- React BOOLEAN NOT NULL,
-- Vue BOOLEAN NOT NULL,
-- Git BOOLEAN NOT NULL
-- );
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('1','true','false','false','false','true','false');
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('2','true','false','false','false','false','false');
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('3','false','false','false','true','true','false');
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('4','false','false','false','true','false','false');
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('5','true','false','false','true','false','false');
-- INSERT INTO followers (followers_id_from_users,JavaScript,HTML,CSS,React,Vue,Git)
-- VALUES('6','false','false','false','true','false','false');


-- Таблица 7
CREATE TABLE answers (
answer_id BIGSERIAL PRIMARY KEY,
question_id_from_questions BIGINT REFERENCES questions (questions_id),
user_id_from_users BIGINT REFERENCES users (user_id),
answers VARCHAR(2000)
);



-- другая инфа
-- carID BIGINT REFERENCES cars (id), UNIQUE (carID)


--------------------------------------------------------------
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Aleksandr','Smirnov','Занимаюсь спортом,учусь программировать','Катаюсь на бмх,учу программирование,занимаюсь спортом и тд');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Коля','Наумов','Снимаюсь в кино','Снимаюсь в кино есть друзья Антоха и Вова');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','София','Абрамова','Работаю в отраде','Есть красный мерседес к программированию отношения не имею');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Полина','Смирнова','Есть любимый муж','Люблю творить,создавать мечтать');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Сергей','Любенко','Работаю водителем учу git','Работаю водителем мечтаю овладеть языком JavaScript');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Валерий','Смирнов','Бокс моя жизнь','Люблю боксировать,есть автомобиль,есть девушка,учу верстку ');
-- INSERT INTO about_user (img, fullname,lastname,briefly_about_yourself, about_yourself)
-- VALUES('avatar','Антон','Пейтер','Люблю автомобили mersedes','Люблю автомобили mersedes, ат так же люблю ездить на мотоцикле и тд');

--------------------------------------------------------------------------------------------------------
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Объясните смысл vue + vuex?','#vue','Вместо писания кода, хочу несколько выкрутить на бинокле перспективу.
-- Вот есть Vue, реактивность, декомпозиция — всё замечательно. Но у меня есть ощущение, что разделив приложение на компоненты с изолированными данными, люди поняли, что хоть оно всё и красиво, но зашли, куда-то не туда, нужны глобальные переменные, без них жить плохо, поэтому и придумали Vuex. Не покидает ощущение, что Vue + Vuex это какие-то костыли, один исправляет другой. Типа концептуально правильные навороты, не просто, а мутациями... А общий смысл и цель потерялась при этом.');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Не могу сделать аналог вывода простых чисел. В чем проблема?','#javascript','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как сделать такой поиск?','#react','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как установить яндекс капчу &quot;я не робот&quot?','#javascript','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как при помощи метода forEach указать условие?','#javascript','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как подключить общий sass файл в проект vue3?','#vue','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как написать функцию hover?','#javascript','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как внедрить шаблон админки во vue laravel?','#vue','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как повесить класс active на элемент?','#react','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как оставить открытым элемент срываемый с помощью чекбокса?','#javascript','osdkokfsodfksdfldsfksd;lf');
-- INSERT INTO questions (essens_question,tags_question,datails_question)
-- VALUES('Как сделать(стилизовать) несколько элементов с множественным выбором?','#javascript','osdkokfsodfksdfldsfksd;lf');













