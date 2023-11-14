CREATE DATABASE restapi_jwt;

CREATE TABLE `user`(
  id INT UNSIGNED PRIMARY KEY  AUTO_INCREMENT,
  email VARCHAR(255),
  password VARCHAR(255)
);

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
