import React from 'react'
import PlayersList from '../components/PlayersList/PlayersList'
import CreateModal from '../components/CreatePlayer/CreateModal'
import SearchPlayer from '../components/PlayersList/SearchPlayer'


const PlayersPage = () => {

    return (
        <main>
            <div className='players-list-container'>
                <h2>Lista de jugadores</h2>
                <CreateModal />
                <SearchPlayer />
                <PlayersList />
            </div>
        </main>
    )
}

export default PlayersPage