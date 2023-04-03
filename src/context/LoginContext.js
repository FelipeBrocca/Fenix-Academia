import { createContext, useContext, useEffect, useState, useCallback } from "react"
import {
    loggedInAuth,
    loginRequest,
    logoutRequest
} from '../api/loginAPI'

const loginContext = createContext()

export const useLogin = () => {
    const context = useContext(loginContext)
    return context
}

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(undefined)

    const getLogged = useCallback(async() => {
        try {
            const loggedInRes = await loggedInAuth()
            setLoggedIn(loggedInRes.data)
        } catch (error) {
            console.log(error);
        }
    }, [])
    const logIn = async(user) => {
        try {
            await loginRequest(user)
            getLogged()
        } catch (error) {
            console.log(error);
        }
    }
    const logOut = useCallback(async() => {
        try {
            await logoutRequest()
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        getLogged()
    })


    return(
        <loginContext.Provider value={{
            logIn,
            getLogged,
            loggedIn,
            setLoggedIn,
            logOut   
        }}>
            {children}
        </loginContext.Provider>
    )
}