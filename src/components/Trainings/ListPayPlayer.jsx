import React, { useState, useEffect } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import { useMoney } from '../../context/MoneyContext'
import { useTrainings } from '../../context/TrainingsContext'

const ListPayPlayer = ({ children, training, date, setCreate }) => {

    const { money } = useMoney()
    const { players, updatePlayer } = usePlayers()
    const { updateTraining } = useTrainings()
    const [busqueda, setBusqueda] = useState('')
    const [loading, setLoading] = useState(false)
    const [playersPay, setPlayersPay] = useState([])
    const [playersChecked, setPlayersChecked] = useState([])
    const body = document.getElementById('body')


    const handleBusqueda = (e) => {
        setBusqueda(e.target.value)
        filter(e.target.value)
    }
    const filter = (busqueda) => {
        let busquedaRes = playersPay.filter(player => {
            if (player.name.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                return player
            } else return ''
        })
        setPlayersPay(busquedaRes)
    }

    useEffect(() => {
        let newPlay = [];

        let found = training.players.assist.map((id) => players.find((player) => id === player._id));
        newPlay.push(...found);

        setPlayersPay(newPlay);
    }, [training.players.assist, players]);


    const handlePlayerInput = (playerId, isChecked) => {
        let currentPlayer = playersPay.find(player => player._id === playerId)
        let tr = currentPlayer?.pay?.trainsPayed.find(tr => tr.tr_id === training._id)
        if (isChecked) {
            setPlayersChecked(prevPlayersChecked => [...prevPlayersChecked, { id: playerId, status: true }]);

            tr.status = true
            let found = training.players.paid.find(pl => pl._id === playerId)
            if (!found) {
                training.players.paid.push(playerId)
            }
            setBusqueda('')
        } else {
            setPlayersChecked(prevPlayersChecked => prevPlayersChecked.filter(id => id.id !== playerId));

            tr.status = false
            training.players.paid = training.players.paid.filter(prev => prev !== playerId)

            setBusqueda('')
        }
    }

    useEffect(() => {
        let newPl = []
        let newIds = []
        playersPay.map((player) => {
            let trcu = player?.pay?.trainsPayed?.find(tr => tr.tr_id === training._id)
            if (trcu.status) {
                newPl.push({ id: player._id, status: trcu.status })
                newIds.push(player._id)
            }
        })

        setPlayersChecked(newPl)
        training.players.paid = newIds
    }, [playersPay, training._id]);

    useEffect(() => {
        training.players.totalPay = training.players.paid.length * money.money.playerSession
    }, [training.players.paid])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await Promise.all(playersPay.map(async (player) => {
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
            <h3>Pagos de: {date.day}/{date.month}/{date.year}</h3>
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
                            playersPay.map((player) => {

                                let tra = player.pay.trainsPayed.find(tr => tr.tr_id === training._id)

                                return (
                                    <li className='item-player-check-assis' key={player._id}>
                                        {player.name}
                                        <input
                                            type="checkbox"
                                            checked={tra.status}
                                            onChange={e => handlePlayerInput(player._id, e.target.checked)}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='confirm-assistance-container'>
                    {
                        loading
                            ? <Loader />
                            : <>
                                <strong>{playersChecked?.length}/{playersPay?.length}</strong>
                                <button className='confirm-assistance-button' onClick={handleSubmit}>Confirmar</button>
                            </>
                    }
                </div>
            </form>
        </div >

    )
}

export default ListPayPlayer