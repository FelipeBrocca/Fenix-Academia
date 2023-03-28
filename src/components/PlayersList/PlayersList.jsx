import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import ItemPlayer from './ItemPlayer'
import './PlayersList.css'

const PlayersList = () => {

    const { players } = usePlayers();
    const [playersToFilt, setPlayersToFilt] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('')
    const [payFilter, setPayFilter] = useState('initial');



    useEffect(() => {
        setPlayersToFilt(players)
        setLoading(false)
    }, [players])

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        if (value !== 'pay') {
            setPayFilter('initial');
        }
    };

    const handlePayFilterChange = (e) => {
        setPayFilter(e.target.value);
    };

    const filteredPlayers = playersToFilt?.filter((player) => {
        if (payFilter === 'true') {
            return player.pay === true;
        } else if (payFilter === 'false') {
            return player.pay === false;
        } else {
            return true;
        }
    });


    return (
        <>
            <div className='filter-container'>
                <label>Filtrar por:</label>
                <div className='container-selects-filter'>
                    <select id='filter-select' onChange={handleFilterChange} value={filter}>
                        <option value=''>--Seleccionar filtro--</option>
                        <option value='club'>Club</option>
                        <option value='role'>Puesto</option>
                        <option value='pay'>Pago</option>
                    </select>
                    {filter === 'pay' &&
                        <select id='pay-filter-select' onChange={handlePayFilterChange} value={payFilter}>
                            <option value={null}>--Seleccionar filtro--</option>
                            <option value='true'>No adeudan</option>
                            <option value='false'>Adeudan</option>
                        </select>
                    }
                    {filter === 'club' &&
                        <select id='pay-filter-select' onChange={handlePayFilterChange} value={payFilter}>
                            <option value={null}>--Seleccionar filtro--</option>
                            <option value='club1'>Club 1</option>
                            <option value='club2'>Club 2</option>
                            <option value='club3'>Club 3</option>
                            <option value='club4'>Club 4</option>
                            <option value='club5'>Club 5</option>
                        </select>
                    }
                    {filter === 'role' &&
                        <select id='pay-filter-select' onChange={handlePayFilterChange} value={payFilter}>
                            <option value={null}>--Seleccionar filtro--</option>
                            <option value='Arquero/a'>Arquero/a</option>
                            <option value='Arrastrador/a'>Arrastrador/a</option>
                            <option value='Defensa'>Defensa</option>
                            <option value='Volante'>Volante</option>
                            <option value='Delantero/a'>Delantero/a</option>
                        </select>
                    }
                </div>
            </div>
            <div className='players-list'>
                {
                    loading
                        ? <Loader />
                        : <ul>
                            {
                                payFilter === 'initial'
                                    ? playersToFilt?.map((player) => (
                                        <ItemPlayer
                                            id={player._id}
                                            name={player.name}
                                            pay={player.pay}
                                            role={player.role}
                                            role2={player.role2 ? player.role2 : null}
                                            club={player.club}
                                            key={player._id}
                                        />
                                    ))
                                    : filteredPlayers?.map((player) => (
                                        <ItemPlayer
                                            id={player._id}
                                            name={player.name}
                                            pay={player.pay}
                                            role={player.role}
                                            role2={player.role2 ? player.role2 : null}
                                            club={player.club}
                                            key={player._id}
                                        />
                                    ))}
                        </ul>
                }
            </div>
        </>
    )
}

export default PlayersList

