import { createContext, useContext, useState } from 'react'
import {
    moneyDetailReq,
    updateMoneyReq
} from '../api/moneyAPI'

export const moneyContext = createContext()
export const useMoney = () => {
    const context = useContext(moneyContext)
    return context
}

export const MoneyProvider = ({ children }) => {
    const [money, setMoney] = useState({})

    const getMoney = async (id) => {
        try {
            const res = await moneyDetailReq(id)
            setMoney(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const updateMoney = async (id, finance) => {
        const moneyToEdit = await updateMoneyReq(id, finance)

        setMoney(moneyToEdit)
    }

    return (
        <moneyContext.Provider value={{
            money,
            setMoney,
            getMoney,
            updateMoney
        }}>
            {children}
        </moneyContext.Provider>
    )
}