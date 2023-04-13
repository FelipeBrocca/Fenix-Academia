import { createContext, useCallback, useContext, useState } from 'react'
import {
    getCoachesRequest,
    coachDetailRequest,
    newCoachRequest,
    updateCoachRequest,
    deleteCoachRequest
} from '../api/coachesAPI'

const coachesContext = createContext()

export const useCoaches = () => {
    const context = useContext(coachesContext)
    return context
}

export const CoachesProvider = ({children}) => {
    const [coaches, setCoaches] = useState([])

    const getCoaches = useCallback(async() => {
        const res = await getCoachesRequest();
        setCoaches(res.data)
    }, []);

    const getCoach = useCallback(async (id) => {
        try {
            const coach = await coachDetailRequest(id);
        return coach.data
        } catch (error) {
            console.log(error);
        }
    }, [])

    const createCoach = async (coach) => {
        const create = await newCoachRequest(coach)
        if(create){
            setCoaches([...coaches, create.data])
        } else {
            alert('No se pudo crear el nuevo entrenador')
        }
    }
    
    const updateCoach = async(id, coach) => {
        const coachToEdit = await updateCoachRequest(id, coach)
        setCoaches(coaches.map(coach => (
            coach._id === id ? coachToEdit.data : coach
        )))
    }

    const deleteCoach = async (id) => {
        await deleteCoachRequest(id)
        setCoaches(coaches.filter(coach => coach._id !== id))
    }

    return (
        <coachesContext.Provider value={{
            coaches,
            setCoaches,
            getCoaches,
            getCoach,
            createCoach,
            updateCoach,
            deleteCoach
        }}>
            {children}
        </coachesContext.Provider>
    )
}