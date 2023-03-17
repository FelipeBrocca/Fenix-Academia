import React from 'react'
import { usePlayers } from '../context/PlayersContext'

const Home = () => {

  const { players, eliminatePlayer } = usePlayers()

  const handleDelete = async(id) => {
    await eliminatePlayer(id)
  }
  return (
    <>
      {
        players?.map((player) => (
          <div className='player-card' key={player._id}>
              <p>{player.name}</p>
              <p>{player.club}</p>
              <p>{player.dni}</p>
              <p>{player.active}</p>
              <p>{player.createdAt.day}/{player.createdAt.month}/{player.createdAt.year}</p>
              <p>{player.ensurance}</p>
              <p>{player.pay}</p>
              <p>{player.phone}</p>
              <p>{player.role}</p>
              <p>{player.birth}</p>
              <button onClick={() => handleDelete(player._id)}>ELIMINAR</button>
          </div>
        ))
      }
    </>
  )
}

export default Home