import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlayers } from '../context/PlayersContext'
import Image from '../components/Image/Image'

const PlayerProfile = () => {

  const { getPlayers, getPlayer, eliminatePlayer } = usePlayers()
  const [player, setPlayer] = useState({})
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const navigation = useNavigate()

  const deletePlayer = async (id) => {
    try {
      setLoading(true)
      await eliminatePlayer(id)
      setLoading(false)
      navigation('/')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlayers()
  }, [deletePlayer])

  useEffect(() => {
    (async() => {
      if(params.id){
        const playerProfile = await getPlayer(params.id)
        setPlayer(playerProfile)
      }
    })();
  }, [params.id])


  return (
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
      <p>{player.active}</p>
      <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
      <p>{player.ensurance}</p>
      <p>{player.pay}</p>
      <p>{player.phone}</p>
      <p>{player.role}</p>
      <p>{player.birth}</p>
      <button onClick={() => deletePlayer(player._id)}>{loading ? 'Cargando' : 'Eliminar'}</button>
    </div>
  )
}

export default PlayerProfile