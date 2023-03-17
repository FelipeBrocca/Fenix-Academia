import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {

  const [datos, setDatos] = useState({})

  const navigation = useNavigate()

  const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name]: event.target.value
    })
}

const handleLogin = (e) => {
  e.preventDefault()
  const goodUser = datos.user === 'candy'
  const goodPassword = datos.password === 'india2020'

  if(goodUser && goodPassword){
    sessionStorage.setItem('token', true)
    navigation('/')
  }
}
  return (
    <div className='form-login-container'>
      <form className='form-login' onSubmit={handleLogin}>
        <input onChange={handleInputChange} placeholder='Usuario' type='text' className='input-login' name='user' />
        <input onChange={handleInputChange} placeholder='Contraseña' type='password' className='input-login' name='password' />
        <button 
        className='login-button'
        >Iniciar sesión</button>
        <p className='change-password'>Cambiar contraseña</p>
      </form>
    </div>
  )
}

export default LoginForm