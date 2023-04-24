import React, { useState } from 'react'

const TrainingItem = ({ training }) => {

    const [seeTraining, setSeeTraining] = useState(false)

    const handleSeeTraining = () => {
        setSeeTraining(seeTraining => !seeTraining)
    }
    return (
        <>
            <li className='training-list-item'>
                <div className='item-contain-data'>
                    <p>{training.date.day}</p>
                    <p>{training.date.since} hs.</p>
                </div>
                <button className='watch-training-item' onClick={() => handleSeeTraining()}>Ver</button>
            </li>

            <div className={`detail-training-item ${seeTraining ? 'active' : ''}`}>
                <p>{training.techniques}</p>
            </div>
        </>
    )
}

export default TrainingItem