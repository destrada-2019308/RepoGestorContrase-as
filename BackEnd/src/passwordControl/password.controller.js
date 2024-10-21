'use strict'

import Password from './password.model.js';

export const addPassword = async (req, res) => { 
    try {
        const data= req.body;
    
        let password = new Password(data);
        await password.save();
        
        return res.send({ message: 'Password registrado exitosamente' });

    } catch (error) {
        
    }
}

export const getPassword = async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);
        
        const data = await Password.find({user: id});
        
        return res.send({ data });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al obtener el password' });
    }
}

export const deletePassword = async (req, res) => {
 
    try {
        const { id } = req.params;
        let deletePassword = await Password.findOneAndDelete({ _id: id });
        
        if (!deletePassword) return res.status(404).send({ message: 'Password not found and not delete' });

        return res.send({ message: 'Password eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error al eliminar el password' });
    }
}