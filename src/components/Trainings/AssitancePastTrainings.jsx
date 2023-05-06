import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

const AssitancePastTrainings = ({ players, handleClose }) => {

    const [playersA, setPlayersA] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setPlayersA(players)
        setLoading(false)
    }, [players])

    return (
        <div className='create-form-container'>
            <div className='assis-title-container'>
                <h2>Asistencias: {playersA.length > 0 ? playersA.length : ''}</h2>
                <h3 onClick={() => handleClose()}>X</h3>
            </div>
            {
                loading
                    ? <Loader />
                    : <ul style={{ width: '100%', display: "flex", flexDirection: 'column', gap: '10px' }}>
                        {
                            playersA.map((player, index) => (
                                <li style={{ width: '100%', listStyle: "none", fontSize: '16px' }} key={index}>{player}</li>
                            ))
                        }
                    </ul>
            }
        </div>
    )
}

export default AssitancePastTrainings