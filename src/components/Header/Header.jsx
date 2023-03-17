import React, { lazy, Suspense } from 'react'
import logoFenix from '../../public/images/logo-fenix1000.png'
import './Header.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Image = lazy(() => import('../Image/Image'))

const Header = () => {
    return (
        <header>
            <div className='logo-header-container'>
            <Suspense fallback={<Skeleton className='logo-header-skeleton' />}>
                <Image src={logoFenix} className="logo-header" alt='logo-header' />
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