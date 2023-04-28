import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import TrainingItem from './TrainingItem'

const ListTrainings = () => {

    const { trainings, passedTrainings } = useTrainings()
    const [activeTrainings, setActiveTrainings] = useState([])
    const [pastTrainings, setPastTrainings] = useState([])

    useEffect(() => {
        setActiveTrainings(trainings)
        setPastTrainings(passedTrainings)
    }, [trainings, passedTrainings])

    return (
        <>
            <ul className='trainings-list'>
                {
                    activeTrainings.map(training => (
                        <TrainingItem 
                        key={training._id} 
                        training={training}
                        active={true}
                        />
                    ))
                }
            </ul>
            <h2>Entrenamientos pasados</h2>
            <ul className='trainings-list'>
                {
                    pastTrainings.map(training => (
                        <TrainingItem 
                        key={training._id} 
                        training={training} 
                        active={false}
                        />
                    ))
                }
            </ul>
        </>
    )
}

export default ListTrainings