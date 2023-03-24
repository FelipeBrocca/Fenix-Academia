import { Outlet } from "react-router-dom"

const LoggedLayout = () => {

    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default LoggedLayout