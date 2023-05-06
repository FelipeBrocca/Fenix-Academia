import { createContext, useContext, useState } from 'react'
import {
    getFinancesReq,
    financeDetailReq,
    createFinanceReq,
    updateFinanceReq,
    deleteFinanceReq
} from '../api/financesAPI'

export const financesContext = createContext()

export const useFinances = () => {
    const context = useContext(financesContext)
    return context
}

export const FinancesProvider = ({ children }) => {
    const [finances, setFinances] = useState([])

    const getFinances = async () => {
        try {
            const res = await getFinancesReq()
            setFinances(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getFinance = async (id) => {
        try {
            const finance = await financeDetailReq(id)
            return finance.data
        } catch (error) {
            console.log(error);
        }
    }

    const createFinance = async (finance) => {
        const create = await createFinanceReq(finance)
        if (create) {
            setFinances([...finances, create.data])
        } else {
            console.log('no');
        }
    }

    const updateFinance = async (id, finance) => {
        const financeToEdit = await updateFinanceReq(id, finance)

        setFinances(finances.map(finance => (
            finance._id === id ? financeToEdit.data : finance
        )))

        getFinances()
    }

    const deleteFinance = async (id) => {
        await deleteFinanceReq(id)
        setFinances(finances.filter(finance => finance._id !== id))
    }

    return (
        <financesContext.Provider value={{
            finances,
            setFinances,
            getFinances,
            getFinance,
            createFinance,
            updateFinance,
            deleteFinance
        }}>
            {children}
        </financesContext.Provider>
    )
}