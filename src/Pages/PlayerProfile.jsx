import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePlayers } from '../context/PlayersContext'
import Loader from '../components/Loader/Loader'
import PlayersProfile from '../components/Profile/PlayersProfile'
import EditModal from '../components/Profile/EditModal'

const PlayerProfile = () => {

  const { getPlayer, updatePlayer } = usePlayers()
  const [player, setPlayer] = useState({})
  const [loading, setLoading] = useState(true)
  const [noPlayerFound, setNoPlayerFound] = useState(false)
  const params = useParams()

  useEffect(() => {
    (async () => {
          const playerProfile = await getPlayer(params.id)
          if (playerProfile !== undefined && playerProfile !== null && playerProfile.name) {
            setPlayer(playerProfile)
            setLoading(false)
          } else if(playerProfile === null) {
            setLoading(false)
            setNoPlayerFound(true)
          }
    })();
  }, [params.id, updatePlayer, getPlayer])

  if (loading) {
    return <Loader />
  }
  else if (noPlayerFound) {
    return <h3 style={{ color: 'var(--white)' }} className='no-player-found'>No existe este jugador/a</h3>
  }
  else {
    return (
      <main>
        <div className='top-profile'>
          <Link className='back-to-list' to='/jugador/listado'>Volver</Link>
          <EditModal person={player} id={params.id} />
        </div>
        <PlayersProfile
          player={player}
        />
      </main>
    )
  }
}

export default PlayerProfile