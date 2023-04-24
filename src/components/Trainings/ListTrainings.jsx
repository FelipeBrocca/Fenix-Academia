import React from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import TrainingItem from './TrainingItem'

const ListTrainings = () => {

    const { trainings } = useTrainings()
    console.log(trainings);

    return (
        <ul className='trainings-list'>
            {
                trainings.map(training => (
                    <TrainingItem key={training._id} training={training} />
                ))
            }
        </ul>
    )
}

export default ListTrainings