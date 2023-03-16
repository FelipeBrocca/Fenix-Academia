import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

const LoggedLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default LoggedLayout