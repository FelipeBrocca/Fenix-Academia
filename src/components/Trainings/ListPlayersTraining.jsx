import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'
import { useMoney } from '../../context/MoneyContext'
import { useFinances } from '../../context/FinancesContext'


const ListPlayersTraining = ({ children, training, date, create, setCreate }) => {

    const { money } = useMoney()
    const { players, updatePlayer } = usePlayers()
    const { updateTraining } = useTrainings()
    const [loading, setLoading] = useState(false)
    const [playersActive, setPlayersActive] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [playersChecked, setPlayersChecked] = useState(training.players.assist)
    const body = document.getElementById('body')

    useEffect(() => {
        setPlayersActive(players)
    }, [players])

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value)
        filter(e.target.value)
    }
    const filter = (busqueda) => {
        let busquedaRes = players.filter(player => {
            if (player.name.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                return player
            } else return ''
        })
        setPlayersActive(busquedaRes)
    }

    useEffect(() => {
        playersActive.forEach((player) => {
            if (!playersChecked.includes(player._id)) {
                const index = player?.pay?.trainsPayed?.findIndex((obj) => obj.tr_id === training._id);
                if (index !== -1) {
                    player?.pay?.trainsPayed?.splice(index, 1);
                }
            }
        });

        playersChecked.forEach((id) => {
            let playerCh = playersActive.find((player) => player._id === id);
            if (playerCh) {
                const existingObject = playerCh.pay.trainsPayed.find((obj) => obj.tr_id === training._id);
                if (!existingObject) {
                    playerCh.pay.trainsPayed.push({ tr_id: training._id, status: true });
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playersChecked]);



    const handlePlayerInput = (playerId, isChecked) => {
        if (isChecked) {
            setPlayersChecked(prevPlayersChecked => [...prevPlayersChecked, playerId]);

            setBusqueda('')
            setLoading(false)
        } else {
            setPlayersChecked(prevPlayersChecked => prevPlayersChecked.filter(id => id !== playerId));
            training.players.paid = training.players.paid.filter(id => id !== playerId)


            setBusqueda('')
            setLoading(false)
        }
    }

    useEffect(() => {
        training.players.totalPay = training.players.paid.length * money.money.playerSession
    }, [training.players.paid])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        training.players.assist = playersChecked
        try {
            await Promise.all(playersActive.map(async (player) => {
                if (player.birth === null) {
                    player.birth = new Date('1970-01-01')
                }
                await updatePlayer(player._id, player)
            }))
            await updateTraining(training._id, training)
            setLoading(false)
            setCreate(create => !create)
            body.style.overflowY = "auto"
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-form-container'>
            <h3>Asistencias de: {date.day}/{date.month}/{date.year}</h3>
            {children}
            <div className='search-player'>
                <input type='text' placeholder='Buscar jugador/a' onChange={handleBusqueda} value={busqueda} />
            </div>
            <form
                className='form-assistance'>
                <div className='active-players-to-list'>
                    <h4>Jugadores</h4>
                    <ul>
                        {
                            playersActive.map(({ name, _id }) => (
                                <li className='item-player-check-assis' key={_id}>
                                    {name}
                                    <input
                                        type="checkbox"
                                        checked={playersChecked.includes(_id)}
                                        onChange={e => handlePlayerInput(_id, e.target.checked)}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='confirm-assistance-container'>
                    {
                        loading
                            ? <Loader />
                            : <>
                                <strong>{playersChecked.length}/{playersActive?.length}</strong>
                                <button className='confirm-assistance-button' onClick={handleSubmit}>Confirmar</button>
                            </>
                    }
                </div>
            </form>
        </div >
    )
}

export default ListPlayersTraining