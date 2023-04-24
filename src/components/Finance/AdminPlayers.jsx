import React from 'react'
import { usePlayers } from '../../context/PlayersContext'
import ItemToAdmin from './ItemToAdmin'
import AdminPlayer from '../CreatePlayer/AdminPlayer'

const AdminPlayers = () => {

    const { players } = usePlayers()


    return (
        <div className='admin-container'>
            <h2>Jugadores</h2>
            <ul className='admin-coaches-list'>
                {
                    players.map((player) => (
                        <ItemToAdmin
                            id={player._id}
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
                        >
                            <AdminPlayer
                                id={player._id}
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
                            />
                        </ItemToAdmin>
                    ))
                }
            </ul>
        </div>
    )
}

export default AdminPlayers