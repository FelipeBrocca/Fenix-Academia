import React, { lazy, Suspense } from 'react'
import './Header.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
const Image = lazy(() => import('../Image/Image'))

const Header = () => {
    return (
        <header>
            <div className='logo-header-container'>
            <Suspense fallback={<Skeleton className='logo-header-skeleton' />}>
                <Link to='/'>
                <Image src={'https://res.cloudinary.com/dlah9v2do/image/upload/v1679333513/logo-fenix1000_yxf8dn.png'} className="logo-header" alt='logo-header' />
                </Link>
            </Suspense>
            </div>
            <div className='burguer-menu'>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
            </div>
        </header>
    )
}

export default Header