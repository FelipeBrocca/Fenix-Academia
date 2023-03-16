import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className='form-login-container'>
      <form className='form-login'>
        <input placeholder='Usuario' type='text' className='input-login' />
        <input placeholder='Contraseña' type='password' className='input-login' />
        <button 
        className='login-button'
        onClick={(e) => e.preventDefault()}
        >Iniciar sesión</button>
        <Link to='/' className='change-password'>Cambiar contraseña</Link>
      </form>
    </div>
  )
}

export default LoginForm