'use strict'
 
import User from './user.model.js';
import nodemailer from 'nodemailer';
import { encrypt, checkPassword, checkPasswordBool } from "../utils/validator.js";

export const getUsers = async (req, res) => {
 
    try {
        const data = await User.find();
        return res.send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener los usuarios' });
    }
}

export const addUser = async (req, res) => { 
    try {
        const  data  = req.body;
        console.log(data.username)   
        //Buscar usuarios por username, email y phone
    
        const user = await User.findOne({username: data.username})
        if(user){
            return res.status(404).send({ message: 'El usuario ya existe' });
        }

        data.password = await encrypt(data.password)

        const dataUser = [data.nameUser, data.lastname]
        let users = new User(data)   
        await users.save()
        
        let passwordDesencriptada = await checkPassword(data.password)
        console.log(passwordDesencriptada)

        let to = data.email 
        let subject = 'Cuenta Creada en Gestor de usuarios'
        let text = `Hola ${data.nameUser} ${data.lastname}, su usuario y contraseña es ${data.username},${passwordDesencriptada}`
        validateEmail(to, subject, text)
        

        return res.send({message: `User save successfully`, users, dataUser})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar el usuario' });   
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
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username: username})
 
        if(!user) return res.status(404).send({message: `The user with account: ${username} doesn't exists   `})

            if(user && await checkPasswordBool(password, user.password)){
                let loggedUser = {
                    uid : user._id,
                    username : user.username,
                    name: user.nameUser
                } 
                return res.send({message: `Hello ${loggedUser.name}`, loggedUser})
            }
            return res.status(404).send({ message: 'Invalid credentials '})

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al registrar el usuario' });
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
    try {
        const { id } = req.params;
        
        let deletedUser = await User.findOneAndDelete({_id: id})
            
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not delete'})
        
        return res.send({message: `Account with username ${deletedUser.username} delete successfully`}) 
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar el usuario' });
    } 
}