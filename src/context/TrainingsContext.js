import { createContext, useContext, useState } from 'react'
import {
    getTrainingsReq,
    trainingDetailReq,
    createTrainingReq,
    updateTrainingReq,
    deleteTrainingReq
} from '../api/trainingsAPI'

const trainingsContext = createContext()

export const useTrainings = () => {
    const context = useContext(trainingsContext)
    return context
}

export const TrainingsProvider = ({ children }) => {
    const [trainings, setTrainings] = useState([])
    const [passedTrainings, setPassedTrainings] = useState([])

    const getTrainings = async () => {
        try {
            const res = await getTrainingsReq();
            const trainings = res.data.sort((a, b) => {
                
                const dateA = new Date(a.date.day);
                const dateB = new Date(b.date.day);
                return dateA - dateB;
            });
            const activeTrainings = [];
            const pastTrainings = [];
            trainings.forEach(training => {
                if (training.active) {
                    activeTrainings.push(training);
                } else {
                    pastTrainings.push(training);
                }
            });
            setTrainings(activeTrainings);
            setPassedTrainings(pastTrainings);
        } catch (error) {
            console.log(error);
        }
    };

    const getTraining = async (id) => {
        try {
            const training = await (trainingDetailReq(id))
            return training.data
        } catch (error) {
            console.log(error);
        }
    }

    const createTraining = async (training) => {
        const create = await createTrainingReq(training)

        if (create) {
            setTrainings([...trainings, create.data])
        } else {
            alert('No se pudo crear el entrenamiento')
        }

        getTrainings()
    }

    const updateTraining = async (id, training) => {
        const trainingToEdit = await updateTrainingReq(id, training)

        setTrainings(trainings.map(training => (
            training._id === id ? trainingToEdit.data : training
        )))

        getTrainings()
    }

    const deleteTraining = async (id) => {
        await deleteTrainingReq(id)
        setTrainings(trainings.filter(training => training._id !== id))
    }

    return (
        <trainingsContext.Provider value={{
            trainings,
            setTrainings,
            passedTrainings,
            setPassedTrainings,
            getTrainings,
            getTraining,
            createTraining,
            updateTraining,
            deleteTraining
        }}>
            {children}
        </trainingsContext.Provider>
    )
}