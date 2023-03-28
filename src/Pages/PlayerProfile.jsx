import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePlayers } from '../context/PlayersContext'
import Image from '../components/Image/Image'
import Loader from '../components/Loader/Loader'

const PlayerProfile = () => {

  const { getPlayer, eliminatePlayer } = usePlayers()
  const [player, setPlayer] = useState({})
  const [loading, setLoading] = useState(true)
  const [noPlayerFound, setNoPlayerFound] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const params = useParams()
  const navigation = useNavigate()

  const deletePlayer = async (id) => {
    try {
      setLoadingDelete(true)
      await eliminatePlayer(id)
      setLoadingDelete(false)
      navigation('/jugador/listado')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (params.id) {
          const playerProfile = await getPlayer(params.id)
          setPlayer(playerProfile)
          setLoading(false)
        }
      } catch (error) {
        setNoPlayerFound(true)
        setLoading(false)
      }
    })();
  }, [params.id, getPlayer])

  if (loading) {
    return <Loader />
  }
  else if (noPlayerFound) {
    return <h2 className='no-player-found'>No existe este jugador/a</h2>
  }
  else {
    return (
      <main>
      <Link to='/jugador/listado'>Volver</Link>
        <div className='player-card'>
          <div className='player-image-container'>
            {
              player.image
                ? <Image src={player.image.url} alt='img-jug' className='player-image' />
                : <Image src='https://res.cloudinary.com/dlah9v2do/image/upload/v1679335452/1200px-Breezeicons-actions-22-im-user.svg_ycuwsn.png' className='player-image' />
            }
          </div>
          <p>{player.name}</p>
          <p>{player.club}</p>
          <p>{player.dni}</p>
          <p>{player.active ? 'Activo' : ''}</p>
          <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
          <p>{player.ensurance ? 'Asegurado' : ''}</p>
          <p>{player.pay ? 'Pago' : ''}</p>
          <p>{player.phone}</p>
          <p>{player.role}</p>
          <p>{player.role2 ? player.role2 : ''}</p>
          <p>{player.birth}</p>
          <button onClick={() => deletePlayer(player._id)}>{loadingDelete ? 'Cargando' : 'Eliminar'}</button>
        </div>
      </main>
    )
  }
}

export default PlayerProfile