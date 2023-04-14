import React, { lazy, Suspense, useState, useEffect } from 'react'
import './Header.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useLocation } from 'react-router-dom'
import Menu from '../Menu/Menu'
const Image = lazy(() => import('../Image/Image'))

const Header = () => {

    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false)

    const handleToggleMenu = () => {
        setShowMenu(showMenu => !showMenu)
    }

    useEffect(() => {
      if (showMenu) {
        setShowMenu(showMenu => !showMenu)
      }
      // eslint-disable-next-line 
    }, [location.pathname])

    return (
        <>
            <header>
                <div className='logo-header-container'>
                    <Suspense fallback={<Skeleton className='logo-header-skeleton' />}>
                        <Link to='/'>
                            <Image src={'https://res.cloudinary.com/dlah9v2do/image/upload/v1679333513/logo-fenix1000_yxf8dn.png'} className="logo-header" alt='logo-header' />
                        </Link>
                    </Suspense>
                </div>
                <div className='burguer-menu' onClick={handleToggleMenu}>
                    <div className='burguer-div'></div>
                    <div className='burguer-div'></div>
                    <div className='burguer-div'></div>
                </div>
            </header>
            {
                showMenu ? <div className='backdropPopUp' onClick={handleToggleMenu}></div> : ''
            }
            <Menu
                toggleMenu={showMenu}
            >
                <span onClick={handleToggleMenu} className='close-menu'>X</span>
            </Menu>
        </>
    )
}

export default Header