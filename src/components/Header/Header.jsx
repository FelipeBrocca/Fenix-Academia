import React from 'react'
import logoFenix from '../../public/images/logo-fenix1000.png'
import './Header.css'


const Header = () => {
    return (
        <header>
            <img src={logoFenix} className="logo-header" alt='logo-header' />
            <div className='burguer-menu'>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
            </div>
        </header>
    )
}

export default Header