import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import { useLogin } from '../../../context/LoginContext'

const LoginForm = () => {

  const { logIn } = useLogin()
  const [datos, setDatos] = useState({})
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [errors, setErrors] = useState('')

  const navigation = useNavigate()

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!datos.username) {
      setErrors('Ingrese un usuario')
    } else if (!datos.password) {
      setErrors('Ingrese una contraseña')
    } else if (datos.username && datos.username !== process.env.REACT_APP_USU) {
      setErrors('Usuario inválido')
    } else if (datos.password && datos.password !== process.env.REACT_APP_PASS) {
      setErrors('Contraseña inválida')
    } else {
      setErrors('')
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
      </form>
      <div style={{ height: '50px', width: '100%' }}>
        <p style={{ width: '100%', color: 'red', textAlign: 'center' }}>
          {
            errors ? errors : ''
          }
        </p>
      </div>
    </div>
  )
}

export default LoginForm