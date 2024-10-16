import { useState } from "react"
import { toast } from "react-hot-toast"
import { getPasswordsRequest, addPasswordRequest, deletePasswordRequest } from "../services/api.js"

export const usePassword = () => {

    const [isPassword, setIsPassword] = useState([])

    const getPasswords = async(id) =>{
      const res = await getPasswordsRequest(id)
       
      if(res.error){
        return toast.error(res.error.response.data.message || 'Error al obtener los passwords')
      }

      setIsPassword(res.data.data)
      return res.data.data

    } 

    const addPassword = async (params) => {

      const res = await addPasswordRequest(params)

      if(res.error){
        return toast.error(res.error.response.data.message || 'Error al registrar password')
      }

      toast.success(res.data.message || 'Password registrado')

      return getPasswords(params.codeUser)

    }

    const deletePassword = async (idPassword, idUser) => {
      const res = await deletePasswordRequest(idPassword)
 
      if(res.error){
        return toast.error(res.error.response.data.message || 'Error al eliminar password')
      }

      toast.success(res.data.message || 'Password eliminado')

      return getPasswords(idUser)
    }

  return { 
    isPassword,
    getPasswords,
    addPassword,
    deletePassword
  }
}
