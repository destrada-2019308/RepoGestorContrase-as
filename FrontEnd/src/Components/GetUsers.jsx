import { useEffect, useState } from 'react' 
import { Table } from 'react-bootstrap'
import { useRegister } from '../shared/useRegister'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const GetUsers = () => { 
    const { register, isLoading, getUsers, user, deleteUser } = useRegister()

    useEffect(() => {
        getUsers()   
    }, [isLoading])  

    const handleDeleteUser = async (id) => {
        await deleteUser(id)
    }


    return (
        <div className=' p-4'>
            <div className='form-control p-4'>
                <h4>Usuarios registrados</h4>
                <Table striped bordered hover responsive >
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Nombre</th>
                            <th scope='col'>Apellido</th>
                            <th scope='col'>Username</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Phone</th>
                            <th scope='col'>State</th> 
                            <th scope='col'>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user && user.map((user, index) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.nameUser}</td>
                                <td>{user.lastname}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.state}</td> 
                                <td><DeleteIcon onClick={() => handleDeleteUser(user.codeUser)}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
