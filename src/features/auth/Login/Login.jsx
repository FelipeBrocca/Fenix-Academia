import { lazy, Suspense } from "react";
import LoginForm from "./LoginForm"
import './Login.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Image = lazy(() => import('../../../components/Image/Image'))


const Login = () => {
    return (
        <div className="login-container">
            <div className="logo-login-container">
                <Suspense fallback={<Skeleton className="logo-login-skeleton" />}>
                    <Image
                        src={'https://res.cloudinary.com/dlah9v2do/image/upload/v1679333513/logo-fenix1000_yxf8dn.png'}
                        alt='logo-fenix'
                        className='logo-login' />
                </Suspense>
            </div>
            <LoginForm />
        </div>
    )
}

export default Login