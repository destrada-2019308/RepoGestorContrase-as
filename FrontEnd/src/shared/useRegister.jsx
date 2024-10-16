import { toast } from 'react-hot-toast'
import { registerRequest, getUsersRequest, deleteUserRequest } from '../services/api.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState([])

  const navigate = useNavigate()

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

    navigate('/')

    return getUsers()


  }

  const deleteUser = async (id) => {
    const res = await deleteUserRequest(id)
    if (res.error) {
      toast.error(res.error.response.data.message || 'Error al eliminar usuario')
      return
    }
    toast.success(res.data.message || 'Usuario eliminado')
    return getUsers()
  }


  return { register, isLoading, getUsers, user, deleteUser }
}
