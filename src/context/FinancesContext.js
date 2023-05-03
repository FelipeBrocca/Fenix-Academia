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

export const FinancesProvider = ({children}) => {
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
            const finance = await getFinance(id)
            return finance.data
        } catch (error) {
            console.log(error);
        }
    }

    const createFinance = async (finance) => {
        try {
            const create = await createFinance(finance)

            if (create) {
                setFinances([...finances, create.data])
            } else {
                alert('No se pudo crear')
            }

            getFinances()
        } catch (error) {
            console.log(error);
        }
    }

    const updateFinance = async (id, finance) => {
        const financeToEdit = await updateFinance(id, finance)

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