import { Schema, model } from 'mongoose'

const userSchema = Schema({
    nameUser: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        uppercase: true,
        enum: ['ENABLE', 'DISABLED'],
        required: true,
        trim: true
    }
},{
    versionKey: false
})

export default model('user', userSchema)