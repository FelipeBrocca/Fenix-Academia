import React, { useEffect, useState } from 'react'
import './SecureAlert.css'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import { Link } from 'react-router-dom'

const SecureAlert = () => {

    const { players } = usePlayers()
    const { coaches } = useCoaches()
    const [coachesSec, setCoachesSec] = useState([])
    const [playersSec, setPlayersSec] = useState([])

    useEffect(() => {
        let playersNotSec = players.filter((player) => player.ensurance.secured === false)
        let coachesNotSec = coaches.filter((coach) => coach.ensurance.secured === false)
        setCoachesSec(coachesNotSec)
        setPlayersSec(playersNotSec)
    }, [coaches, players])


    return (
        <div className='sec-alert-container'>
            <h3>Seguros sin habilitar</h3>
            <ul>
                <h4>Jugadores <Link to={'/finanzas'} state={{ admin: { value: 1, label: 'Jugadores' } }}>Admin</Link></h4>
                {
                    playersSec[0]
                        ? playersSec.map((player, index) => (
                            <li key={index}><div className='icon-alert2' title='No asegurado'>
                                <p>!</p>
                            </div>{player.name}</li>
                        ))
                        : <p className='all-secure-alert'>Todos asegurados</p>
                }
            </ul>
            <ul>
                <h4>Entrenadores <Link to={'/finanzas'} state={{ admin: { value: 0, label: 'Entrenadores' } }}>Admin</Link></h4>
                {
                    coachesSec[0]
                        ? coachesSec.map((coach, index) => (
                            <li key={index}><div className='icon-alert2' title='No asegurado'>
                                <p>!</p>
                            </div>{coach.name}</li>
                        ))
                        : <p className='all-secure-alert'>Todos asegurados</p>
                }
            </ul>
        </div>
    )
}

export default SecureAlert