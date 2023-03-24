import { createContext, useContext, useEffect, useState } from "react"
import {
    loggedInAuth,
    loginRequest
} from '../api/loginAPI'

const loginContext = createContext()

export const useLogin = () => {
    const context = useContext(loginContext)
    return context
}

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLogged = async() => {
        try {
            const loggedInRes = await loggedInAuth()
            setLoggedIn(loggedInRes.data)
        } catch (error) {
            console.log(error);
        }
    }
    const logIn = async(user) => {
        try {
            await loginRequest(user)
            getLogged()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLogged()
    }, [])

    return(
        <loginContext.Provider value={{
            logIn,
            getLogged,
            loggedIn,
            setLoggedIn   
        }}>
            {children}
        </loginContext.Provider>
    )
}