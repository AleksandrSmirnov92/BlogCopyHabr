-- CREATE TABLE about_user (
--  id_about_user BIGSERIAL PRIMARY KEY,
--  img VARCHAR(100), 
--  fullname VARCHAR(50),
--  lastname VARCHAR(50),
--  );

-- CREATE TABLE Users (
-- user_id BIGSERIAL PRIMARY KEY, 
-- email VARCHAR(50) NOT NULL,
-- nickname VARCHAR(50) NOT NULL,
-- password VARCHAR(50) NOT NULL,
-- );

-- CREATE TABLE questions (
-- questions_id BIGSERIAL PRIMARY KEY,
-- essens_question VARCHAR(100),
-- tags_question VARCHAR(50),
-- datails_question VARCHAR(5000),
-- user_id BIGINT REFERENCES users (user_id)
-- );
-- carID BIGINT REFERENCES cars (id), UNIQUE (carID)

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
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Объясните смысл vue + vuex?','#vue','Вместо писания кода, хочу несколько выкрутить на бинокле перспективу.
Вот есть Vue, реактивность, декомпозиция — всё замечательно. Но у меня есть ощущение, что разделив приложение на компоненты с изолированными данными, люди поняли, что хоть оно всё и красиво, но зашли, куда-то не туда, нужны глобальные переменные, без них жить плохо, поэтому и придумали Vuex. Не покидает ощущение, что Vue + Vuex это какие-то костыли, один исправляет другой. Типа концептуально правильные навороты, не просто, а мутациями... А общий смысл и цель потерялась при этом.');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Не могу сделать аналог вывода простых чисел. В чем проблема?','#javascript','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как сделать такой поиск?','#react','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как установить яндекс капчу &quot;я не робот&quot?','#javascript','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как при помощи метода forEach указать условие?','#javascript','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как подключить общий sass файл в проект vue3?','#vue','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как написать функцию hover?','#javascript','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как внедрить шаблон админки во vue laravel?','#vue','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как повесить класс active на элемент?','#react','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как оставить открытым элемент срываемый с помощью чекбокса?','#javascript','osdkokfsodfksdfldsfksd;lf');
INSERT INTO questions (essens_question,tags_question,datails_question)
VALUES('Как сделать(стилизовать) несколько элементов с множественным выбором?','#javascript','osdkokfsodfksdfldsfksd;lf');