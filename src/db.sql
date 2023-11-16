CREATE DATABASE restapi_jwt;

CREATE TABLE `user`(
  id INT UNSIGNED PRIMARY KEY  AUTO_INCREMENT,
  email VARCHAR(255),
  password VARCHAR(255),
  role enum('client', 'staff') not null default 'user'
);

CREATE TABLE `order`(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255),
  user_id INT UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

alter table `user` add column role enum('client', 'staff') not null default 'client';


INSERT INTO `order` (description, user_id) 
VALUES ('Order 1', 1), ('Order 2', 2), ('Order 3', 1), ('Order 4', 2), ('Order 5', 3);


INSERT INTO `user` (email, password)
VALUES ('test@test.com', '123');




DELIMITER //
CREATE PROCEDURE restart_db()
BEGIN
  DELETE FROM `user` WHERE 1;
  ALTER TABLE `user` AUTO_INCREMENT = 1;
END;
//
DELIMITER ;
