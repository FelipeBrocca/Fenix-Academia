import { Navigate, Outlet } from "react-router-dom"
import Header from "../Header/Header"

const LoggedLayout = () => {
    const auth = sessionStorage.getItem('token')
    return (
        auth
            ?
            <>
                <Header />
                <main>
                    <Outlet />
                </main>
            </>
            : <Navigate to='/login' />
    )
}

export default LoggedLayout