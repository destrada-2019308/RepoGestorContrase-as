import { toast } from 'react-hot-toast'
import { registerRequest, getUsersRequest } from '../services/api.js'

import { useState } from 'react'


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState([])

  const getUsers = async () => {

    const res = await getUsersRequest()

    if (res.error) {
      return toast.error(res.error.response.data.message || 'Error al obtener los usuarios')
    }

    setUser(res.data.data)
    return res.data.data

  }

  const register = async (params) => {
    setIsLoading(true)

    const res = await registerRequest(params)
    if (res.error) {
      toast.error(res.error.response.data.message || 'Error al registrar usuario')
      setIsLoading(false)
      return
    }
    toast.success(res.data.message || 'Usuario registrado')
    return getUsers()

  }

  return { register, isLoading, getUsers, user }
}
