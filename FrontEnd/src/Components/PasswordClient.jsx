import React from 'react'
import { PasswordGenerator } from './PasswordGenerator'
import { usePassword } from '../shared/usePassword'
import { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import BtnAdd from './BtnAdd'

export const PasswordClient = () => {

    const navigate = useNavigate()

    const [ form, setForm ] = useState({
        codeUser: '',
        password: '',
        sitioWeb: '',
    })

    let user = localStorage.getItem('user')
 
    let id = JSON.parse(user) 
    
    id = id.uid
    const { isPassword, getPasswords, addPassword, deletePassword } = usePassword()

    useEffect(() => {
        getPasswords(id)
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        form.codeUser = id
        addPassword(form)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const deletedPass = async(idPassword) =>{
        await deletePassword(idPassword)
        getPasswords(id)
    }

    const logout = () => {
        localStorage.clear()
        navigate('/')
    }

  return (
    <div className=' m-4 p-4  row justify-content-center align-items-center'>
        <div className='m-4 row'>
            <div className='form-control p-4 col'>
                <h1>Generador de Contraseñas</h1>
                <form action="" className="col-auto p-5 text-center" onSubmit={handleOnSubmit}>
                    <div className="row">
                        <div className=" ">
                            <label htmlFor="" className="form-label">Ingresa la password</label>
                            <br />
                            <input 
                                type="text"
                                placeholder='Password' 
                                name='password'
                                className='form-control'
                                required
                                value={form.password}
                                onChange={handleOnChange}/>
                        </div>
                        <div className="m-2"></div>
                        <div className=" ">
                            <label htmlFor="" className="form-label">Sitio sobre password</label>
                            <br />
                            <input 
                                type="text"
                                placeholder='Sitio web'
                                name='sitioWeb'
                                required
                                value={form.sitioWeb}
                                onChange={handleOnChange}
                                className='form-control' />
                        </div>
                    </div>
                     <button className='btn btn-success m-4'>Guardar</button>
                </form>
                <button className='btn btn-danger' onClick={() => logout()}>Cerrar sesión</button>
                 
            </div>
            <div className='col'>
                <PasswordGenerator/>
            </div>
        </div>
        <div className='form-control p-4'>
            <h4>Contraseñas guardadas</h4>
            <Table striped bordered hover responsive>
                <thead className='thead-dark'>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Password</th>
                        <th scope='col'>Sitio web</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isPassword.map(index =>(
                            <tr key={index.codePassword}>
                                <th>{index.codePassword}</th>
                                <th>{index.password}</th>
                                <th>{index.sitioWeb}</th>
                                <th><DeleteIcon onClick={() => deletedPass(index.codePassword)}/></th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    </div>
  )
}
