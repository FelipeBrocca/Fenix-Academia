import { lazy, Suspense } from "react";
import LoginForm from "./LoginForm"
import './Login.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import logoFenix from '../../../public/images/logo-fenix1000.png'
const Image = lazy(() => import('../../../components/Image/Image'))


const Login = () => {
    return (
        <div className="login-container">
            <div className="logo-login-container">
                <Suspense fallback={<Skeleton className="logo-login-skeleton" />}>
                    <Image
                        src={logoFenix}
                        alt='logo-fenix'
                        className='logo-login' />
                </Suspense>
            </div>
            <LoginForm />
        </div>
    )
}

export default Login