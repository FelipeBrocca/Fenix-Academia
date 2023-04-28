import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'


const ListPlayersTraining = ({ children, training, date, setCreate, create }) => {

    const { players } = usePlayers()
    const { updateTraining } = useTrainings()
    const [loading, setLoading] = useState(false)
    const [playersActive, setPlayersActive] = useState([])
    const [playersWithSess, setPlayersWithSess] = useState([])
    const [playersChecked, setPlayersChecked] = useState(training.players)
    const body = document.getElementById('body')


    useEffect(() => {
        const playersActive = players.filter(player => player.active)
        const playersSess = players.filter(player => !player.active && player.pay.trainsPayed > 0)
        setPlayersActive(playersActive)
        setPlayersWithSess(playersSess)
    }, [players])

    const handlePlayerInput = (playerId, isChecked, setPlayersChecked) => {
        if (isChecked) {
            setPlayersChecked(prevPlayersChecked => [...prevPlayersChecked, playerId]);
        } else {
            setPlayersChecked(prevPlayersChecked => prevPlayersChecked.filter(id => id !== playerId));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            training.players = playersChecked
            await updateTraining(training._id, training)
            setLoading(false)
            setCreate(!create)
            body.style.overflowY = "auto"
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-form-container'>
            <h3>Asistencias de: {date}</h3>
            {children}
            <form onSubmit={handleSubmit} className='form-assistance'>
                <div className='active-players-to-list'>
                    <h4>Jugadores activos</h4>
                    <ul>
                        {
                            playersActive?.map(({ name, _id }) => (
                                <li className='item-player-check-assis' key={_id}>
                                    {name} <input
                                        type="checkbox"
                                        checked={playersChecked.includes(_id)}
                                        onChange={e => handlePlayerInput(_id, e.target.checked, setPlayersChecked)} />
                                </li>

                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h4>Jugadores con sesiones pagas</h4>
                    <ul>
                        {
                            playersWithSess?.map(({ name, _id }) => (
                                <li className='item-player-check-assis' key={_id}>
                                    {name} <input
                                        type="checkbox"
                                        checked={playersChecked.includes(_id)}
                                        onChange={e => handlePlayerInput(_id, e.target.checked, setPlayersChecked)} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='confirm-assistance-container'>
                    <strong>{playersChecked.length}/{playersActive?.length + playersWithSess?.length}</strong>
                    {
                        loading
                            ? <Loader />
                            : <button className='confirm-assistance-button'>Confirmar</button>
                    }
                </div>
            </form>
        </div >
    )
}

export default ListPlayersTraining