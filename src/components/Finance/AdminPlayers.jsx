import React from 'react'
import {usePlayers} from '../../context/PlayersContext'
import ItemToAdmin from './ItemToAdmin'

const AdminPlayers = () => {

  const {players} = usePlayers()

    return (
        <div className='admin-container'>
            <h2>Jugadores</h2>
            <ul className='admin-coaches-list'>
               {
                players.map(({name, _id}) => (
                    <ItemToAdmin
                    name={name}
                    id={_id}
                    key={_id}
                    type={'player'}
                    />
                ))
               }
            </ul>
        </div>
    )
}

export default AdminPlayers