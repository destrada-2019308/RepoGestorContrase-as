import { Schema, model } from "mongoose";

const passwordSchema = Schema({
    password: {
        type: String, 
        required: true,
        trim: true
    },
    sitioWeb: {
        type: String,
        required: true,
        trim: true
    }, 
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }    
},{
    versionKey: false
})

export default model('password', passwordSchema)