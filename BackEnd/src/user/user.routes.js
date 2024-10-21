 
import { Router } from "express";
import { getUsers, addUser, login, updateUser, deleteUser } from "./user.controller.js";

const api = Router();

api.get('/getUsers', getUsers);
api.post('/addUser', addUser);
api.post(`/login`, login);
api.put(`/updateUser/:id`, updateUser);
api.delete(`/deleteUser/:id`, deleteUser);

export default api
