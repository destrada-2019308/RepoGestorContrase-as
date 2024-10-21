import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginRequest } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {

    const navigate = useNavigate()

    const login = async (params) => {
        
            const res = await loginRequest(params)

            if(res.error) return toast.error(res.error.response.data.message || 'Error al iniciar sesión')

            toast.success(res.data.message || 'Sesion iniciada')

            console.log(res.data)
            console.log(res);
            
            const user = res.data.loggedUser
            localStorage.setItem('user', JSON.stringify(user))
          
            navigate('/password' )

         
    }

  return {
    login
  }
}
