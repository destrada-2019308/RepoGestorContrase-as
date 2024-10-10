'use strict'

import { hash, compare } from 'bcrypt'

export const encrypt = async (password) => {
    try {
        return hash(password, 10)
    } catch (error) {
        console.error(error)
        return error
    }
}

//Cambie el checkPassword Para que retorne 
//La password limpia
export const checkPassword = async (password, hash) => {
    try {
        await compare(password, hash)
        return password
    } catch (error) {
        console.error(error)
        return error
    }
}

//Esta funcion retorna true
export const checkPasswordBool = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}