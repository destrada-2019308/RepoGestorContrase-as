CREATE DATABASE IF NOT EXISTS gestor_usuarios;

USE gestor_usuarios;

CREATE TABLE IF NOT EXISTS Users (
    codeUser INT NOT NULL AUTO_INCREMENT,
    nameUser VARCHAR(125) NOT NULL,
    lastname VARCHAR(125) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(125) UNIQUE NOT NULL,
    phone VARCHAR(8) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL, 
    state ENUM('ENABLE', 'DISABLED'),
    PRIMARY KEY PK_codeUser(codeUser)
);
 
CREATE TABLE IF NOT EXISTS Passwords (
    codePassword INT NOT NULL AUTO_INCREMENT,
    codeUser INT NOT NULL,
    password VARCHAR(256) NOT NULL,
    sitioWeb VARCHAR(125) NOT NULL,
    CONSTRAINT FK_Passwords_Users FOREIGN KEY (codeUser) 
        REFERENCES Users(codeUser),
    PRIMARY KEY PK_codePassword(codePassword)
)