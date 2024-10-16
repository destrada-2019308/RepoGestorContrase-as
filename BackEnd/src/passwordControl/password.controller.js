'use strict'

import pool from "../../configs/db.js"

export const addPassword = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { codeUser, password, sitioWeb } = req.body;
    
        await conn.query('INSERT INTO Passwords (codeUser, password, sitioWeb) VALUES (?, ?, ?)', [codeUser, password, sitioWeb]);
        
        return res.send({ message: 'Password registrado exitosamente' });

    } catch (error) {
        
    }
}

export const getPassword = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { id } = req.params;
        console.log(id);
        
        const data = await conn.query('SELECT * FROM Passwords WHERE codeUser = ?', [id]);
 
        return res.send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener el password' });
    }
}

export const deletePassword = async (req, res) => {
    const conn = await pool.getConnection();
    try {
        const { id } = req.params;
        await conn.query('DELETE FROM Passwords WHERE codePassword = ?', [id]);
        return res.send({ message: 'Password eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar el password' });
    }
}