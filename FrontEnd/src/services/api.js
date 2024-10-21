import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://almacenadora-backend-jjltosava-dieogs-projects.vercel.app/',
    timeout: 5000
})

apiClient.interceptors.request.use(config => {
    return config
    },
    err => Promise.reject(err)
)

export const loginRequest = async (data) => {
    try {
        return await apiClient.post('/user/login', data)
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}

export const registerRequest = async (data) => {
    try {
        return await apiClient.post('/user/addUser', data)
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}   

export const getUsersRequest = async () => {
    try {
        return await apiClient.get('/user/getUsers')
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}

export const deleteUserRequest = async (id) => {
    try {
        return await apiClient.delete(`/user/deleteUser/${id}`)
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}

//CRUD DE PASSWORD


export const getPasswordsRequest = async (id) => {
    try {
        return await apiClient.get(`/password/getPassword/${id}` )
    } catch (error) {
        console.error(error);
        return { error: true, error}
    }
}

export const addPasswordRequest = async (data) => {
    try {
        return await apiClient.post('/password/addPassword', data)
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}

export const deletePasswordRequest = async (id) => {
    try {
        return await apiClient.delete(`/password/deletePassword/${id}`)
    } catch (error) {
        console.error(error)
        return { error: true, error}
    }
}