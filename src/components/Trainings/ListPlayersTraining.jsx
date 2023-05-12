import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'
import SearchPlayer from '../PlayersList/SearchPlayer'
import { useMoney } from '../../context/MoneyContext'
import { useFinances } from '../../context/FinancesContext'


const ListPlayersTraining = ({ children, training, date }) => {

    const { money } = useMoney()
    const { finances, updateFinance } = useFinances()
    const { players, updatePlayer } = usePlayers()
    const { updateTraining } = useTrainings()
    const [loading, setLoading] = useState(false)
    const [playersActive, setPlayersActive] = useState([])
    const [todayFinance, setTodayFinance] = useState({})
    const [busqueda, setBusqueda] = useState('')

    
    useEffect(() => {
        setPlayersActive(players)
    }, [players])
    
    const handleBusqueda = (e) => {
        setBusqueda(e.target.value)
        filter(e.target.value)
    }
    const filter = (busqueda) => {
        let busquedaRes = players.filter(player => {
          if(player.name.toString().toLowerCase().includes(busqueda.toLowerCase())){
            return player
          } else return ''
        })
        setPlayersActive(busquedaRes)
      }

    useEffect(() => {
        let todayMonth = new Date(training.date.day).getMonth()
        let todayYear = new Date(training.date.day).getFullYear()
        let findFin = finances.find(fin => fin.month.value === todayMonth && fin.month.year === todayYear)
        setTodayFinance(findFin);
    }, [training.date.day])

    const handlePlayerInput = async (playerId, isChecked) => {
        let playerPaid = playersActive.find(player => player._id === playerId)
        if (isChecked) {
            setLoading(true)
            training.players.assist.push(playerId)
            if (playerPaid) {
                playerPaid.pay.trainsPayed.push(training._id)
                await updatePlayer(playerId, playerPaid)
            }
            todayFinance.pays.playersXSession = todayFinance.pays.playersXSession + money.money.playerSession
            await updateTraining(training._id, training)
            await updateFinance(todayFinance._id, todayFinance)
            setBusqueda('')
            setLoading(false)
        } else {
            setLoading(true)
            training.players.assist = training.players.assist.filter(player => player !== playerId)
            if (playerPaid) {
                playerPaid.pay.trainsPayed = playerPaid.pay.trainsPayed.filter(train => train !== training._id)
                await updatePlayer(playerId, playerPaid)
            }
            todayFinance.pays.playersXSession = todayFinance.pays.playersXSession - money.money.playerSession
            await updateTraining(training._id, training)
            await updateFinance(todayFinance._id, todayFinance)
            setBusqueda('')
            setLoading(false)
        }
    }

    return (
        <div className='create-form-container'>
            <h3>Asistencias de: {date}</h3>
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
                                        checked={training.players.assist.includes(_id)}
                                        onChange={e => handlePlayerInput(_id, e.target.checked)}
                                        disabled={loading ? true : false}
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
                            : <strong>{training.players.assist.length}/{playersActive?.length}</strong>
                    }
                </div>
            </form>
        </div >
    )
}

export default ListPlayersTraining