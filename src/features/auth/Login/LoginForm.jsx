import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import { useLogin } from '../../../context/LoginContext'


const LoginForm = () => {


  const { logIn } = useLogin()
  const [datos, setDatos] = useState({})
  const [loadingLogin, setLoadingLogin] = useState(false)

  const navigation = useNavigate()

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoadingLogin(true)
      await logIn(datos)
        .then(() => {
          navigation('/')
        })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='form-login-container'>
      <form className='form-login' onSubmit={handleLogin}>
        <input onChange={handleInputChange} placeholder='Usuario' type='text' className='input-login' name='username' />
        <input onChange={handleInputChange} placeholder='Contraseña' type='password' className='input-login' name='password' />
        {
          loadingLogin
            ? <Loader />
            : <button
              className='login-button'
            >Iniciar sesión</button>
        }
        <p className='change-password'>Cambiar contraseña</p>
      </form>
    </div>
  )
}

export default LoginForm