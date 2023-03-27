import React, { lazy, Suspense, useState } from 'react'
import './Header.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../../context/LoginContext'
import Loader from '../Loader/Loader'
const Image = lazy(() => import('../Image/Image'))

const Header = () => {

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
        <header>
            <div className='logo-header-container'>
                <Suspense fallback={<Skeleton className='logo-header-skeleton' />}>
                    <Link to='/'>
                        <Image src={'https://res.cloudinary.com/dlah9v2do/image/upload/v1679333513/logo-fenix1000_yxf8dn.png'} className="logo-header" alt='logo-header' />
                    </Link>
                </Suspense>
            </div>
            {/* <div className='burguer-menu'>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
                <div className='burguer-div'></div>
            </div> */}
            <div>
                {
                    loadingLogOut
                        ? <Loader />
                        : <button onClick={() => logOutHandler()}>
                            Cerrar sesion
                        </button>
                }
            </div>
        </header>
    )
}

export default Header