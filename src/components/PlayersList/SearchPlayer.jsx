import React, { useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import ItemSearch from './ItemSearch'

const SearchPlayer = () => {

  const { players } = usePlayers()
  const [busqueda, setBusqueda] = useState('')
  const [playersSearch, setPlayersSearch] = useState([])

const filter = (busqueda) => {
  let busquedaRes = players.filter(player => {
    if(player.name.toString().toLowerCase().includes(busqueda.toLowerCase())){
      return player
    } else return ''
  })
  setPlayersSearch(busquedaRes)
}

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value)
    filter(e.target.value)
  }

  return (
  <div className='search-container'>
        <div className='search-player'>
           <input type='text' placeholder='Buscar jugador/a' onChange={handleBusqueda} className={busqueda ? 'active' : ''} />
        </div>
        <div className={`search-filter-container ${busqueda ? 'active' : 'disabled'}`}>
         <ul>
          {
            busqueda && playersSearch[0]
            ? playersSearch.map(player => {
              return (
                <ItemSearch name={player.name} id={player._id} key={player._id} />
              )
            })
            : busqueda && !playersSearch[0]
            ? <li className='not-found-search-bar'>No se encontraron resultados</li>
            :  '' 
          }
         </ul>
    </div>
    </div>
  )
}

export default SearchPlayer