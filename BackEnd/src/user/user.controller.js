'use strict'

import pool from "../../configs/db.js"
import nodemailer from 'nodemailer';
import { encrypt, checkPassword, checkPasswordBool } from "../utils/validator.js";

export const getUsers = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const data = await conn.query('SELECT * FROM Users');
        return res.send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener los usuarios' });
    }finally{
        conn.release();
    }
}

export const addUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { nameUser, lastname, username, password, email, phone, state } = req.body;
        console.log(password)
        //Buscar usuarios por username, email y phone
        const users = await conn.query('SELECT * FROM Users WHERE username = ? OR email = ? OR phone = ?', [username, email, phone]);
        if (users.length > 0) {
            return res.status(400).send({ message: 'El usuario con el usernmae, email o phone ya existe, Verifique que los datos no sean iguales' });
        }

        let newPassword = await encrypt(password)

        await conn.query('INSERT INTO Users (nameUser, lastname, username, email, phone, password, state) VALUES (?, ?, ?, ?, ?, ?, ?)', [nameUser, lastname, username, email, phone, newPassword, state]);
        let to = email 
        let subject = 'Cuenta Creada en Gestor de usuarios'
        let text = `Hola ${nameUser} ${lastname}, su usuario y contraseña es ${username},${password}`
        validateEmail(to, subject, text)
        let passwordDesencriptada = await checkPassword(password, newPassword)
        console.log(passwordDesencriptada)

        return res.send({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar el usuario' });   
    }finally{
        conn.release();
    }
}

const validateEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'diegoempresakinal@gmail.com',
            pass: 'rshs moml kxxp lqlp'
        }
    })

    let mailOptions = {
        from: 'diegoempresakinal@gmail.com',
        to: to,
        subject: subject,
        text: text
    }
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}


export const emailValidate = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        console.log(to, subject, text);

        let info = await validateEmail(to, subject, text)
        return res.send({ message: `Email enviado a : ${to} `, info })
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error sending email");
    }
}


export const login = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { username, password } = req.body;

        const [user] = await conn.query('SELECT * FROM Users WHERE username = ?', [username]);

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        if(user && await checkPasswordBool(password, user.password)){
            const data = await conn.query('SELECT * FROM Users WHERE username = ?', [username]);

            return res.send({ data });
        }

        return res.status(401).send({ message: 'Contraseña incorrecta o el Usuario no existe' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar el usuario' });
    }finally{
        conn.release();
    }
}

export const updateUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { codeUser } = req.params;
        const { nameUser, lastname, username, email, phone, state } = req.body;
        await conn.query('UPDATE Users SET nameUser = ?, lastname = ?, username = ?, email = ?, phone = ?, state = ? WHERE codeUser = ?', [nameUser, lastname, username, email, phone, state, codeUser]);

        return res.send({ message: 'Usuario actualizado exitosamente' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al actualizar el usuario' });
    }finally{
        conn.release();
    }
}

export const deleteUser = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { id } = req.params;
        await conn.query('DELETE FROM Users WHERE codeUser = ?', [id]);
        console.log(id);
        return res.send({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar el usuario' });
    }finally{
        conn.release();
    }
}