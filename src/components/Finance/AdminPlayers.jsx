import React, {useState, useEffect} from 'react'
import { usePlayers } from '../../context/PlayersContext'
import ItemToAdmin from './ItemToAdmin'
import AdminPlayer from '../CreatePlayer/AdminPlayer'

const AdminPlayers = () => {

    const { players } = usePlayers()
    const [playersActive, setPlayersActive] = useState([])
    const [busqueda, setBusqueda] = useState('')


    useEffect(() => {
        setPlayersActive(players)
    }, [players])

    const filter = (busqueda) => {
        let busquedaRes = players.filter(player => {
            if (player.name.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                return player
            } else return ''
        })
        setPlayersActive(busquedaRes)
    }

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value)
        filter(e.target.value)
    }


    return (
        <div className='admin-container'>
            <h2>Jugadores</h2>
            <div className='search-player'>
                <input type='text' placeholder='Buscar jugador/a' onChange={handleBusqueda} value={busqueda} />
            </div>
            <ul className='admin-coaches-list'>
                {
                    playersActive.map((player) => (
                        <ItemToAdmin
                            _id={player._id}
                            key={player._id}
                            type={'player'}
                            image={player.image}
                            name={player.name}
                            dni={player.dni}
                            phone={player.phone}
                            club={player.club}
                            role={player.role}
                            birth={player.birth}
                            ensurance={player.ensurance}
                            pay={player.pay}
                            createdAt={player.createdAt}
                            active={player.active}
                            assistances={player.assistances}
                        >
                            <AdminPlayer
                                _id={player._id}
                                key={player._id}
                                type={'player'}
                                image={player.image}
                                name={player.name}
                                dni={player.dni}
                                phone={player.phone}
                                club={player.club}
                                role={player.role}
                                birth={player.birth}
                                ensurance={player.ensurance}
                                pay={player.pay}
                                createdAt={player.createdAt}
                                active={player.active}
                                assistances={player.assistances}
                            />
                        </ItemToAdmin>
                    ))
                }
            </ul>
        </div>
    )
}

export default AdminPlayers