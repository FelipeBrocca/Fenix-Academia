import React from 'react'
import PlayersList from '../components/PlayersList/PlayersList'
import CreateModal from '../components/CreatePlayer/CreateModal'
import SearchPlayer from '../components/PlayersList/SearchPlayer'
import { Link } from 'react-router-dom'


const PlayersPage = () => {

    return (
        <main>
            <div className='list-container'>
                <div className='top-list-page'>
                    <Link className='back-to-list' to='/'>Volver</Link>
                    <CreateModal />
                </div>
                <h2>Lista de jugadores</h2>
                <SearchPlayer />
                <PlayersList />
            </div>
        </main>
    )
}

export default PlayersPage