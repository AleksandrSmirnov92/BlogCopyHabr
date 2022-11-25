-- CREATE TABLE USERS (EMAIL TEXT PRIMARY KEY, NickName TEXT NOT NULL, Password TEXT NOT NULL) /*Создать Таблицу*/
-- INSERT INTO USERS (Email,NickName,Password) /*Добавить в таблицу столбцы*/
-- VALUES("kostyaa@mail.ru","Kostya","12345"); /* Добавить в таблицу значения*/
SELECT * FROM USERS /*Показать таблицу*/


-- добвляем в таблицу 
/*
--  UPDATE users SET user_id = 1 WHERE id_about_users = 1;
users=# UPDATE users SET about_user_id = 2 WHERE user_id = 2;
UPDATE 1
users=# UPDATE users SET about_user_id = 3 WHERE user_id = 3;
UPDATE 1
users=# UPDATE users SET about_user_id = 4 WHERE user_id = 4;
UPDATE 1
users=# UPDATE users SET about_user_id = 5 WHERE user_id = 5;
UPDATE 1
users=# UPDATE users SET about_user_id = 6 WHERE user_id = 6;
UPDATE 1
users=# UPDATE users SET about_user_id = 7 WHERE user_id = 7;
-- Соеденяем таблицы 
users=# SELECT * FROM users
users-# JOIN about_user ON users.about_user_id = about_user.id_about_user;




ALTER TABLE users ADD CONSTRAINT unique_email_address UNIQUE (email); - Делает столбец уникальным










*/