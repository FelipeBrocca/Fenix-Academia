import React, { useState } from 'react'
import { useLogin } from '../../context/LoginContext'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import './Menu.css'
import MenuContain from './MenuContain'

const Menu = ({ children, toggleMenu }) => {

    const { logOut, setLoggedIn } = useLogin()
    const [loadingLogOut, setLoadingLogOut] = useState(false)

    const navigation = useNavigate()

    const logOutHandler = async () => {
        setLoadingLogOut(true)
        await logOut()
            .then(() => {
                setLoggedIn(false)
                navigation('/')
                setLoadingLogOut(false)
            })
    }

    return (
            <div className={`menu-container ${toggleMenu ? '' : 'closed'}`}>
                <div className='top-menu'>
                    {children}
                </div>
                <MenuContain />
                <div className='logout-menu-container'>
                    {
                        loadingLogOut
                            ? <Loader />
                            : <button className='logout-button' onClick={() => logOutHandler()}>
                                Cerrar sesión
                            </button>
                    }
                </div>
            </div>
    )
}

export default Menu