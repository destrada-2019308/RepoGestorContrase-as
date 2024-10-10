'use strict'

import { Router } from 'express'
import { addPassword, getPassword, deletePassword } from './password.controller.js'

const api = Router()

api.post('/addPassword', addPassword)
api.get('/getPassword/:id', getPassword)
api.delete('/deletePassword/:id', deletePassword)

export default api