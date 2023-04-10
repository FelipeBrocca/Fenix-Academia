import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import ItemPlayer from './ItemPlayer'
import './PlayersList.css'
import { useClubs } from '../../context/ClubsContext'

const PlayersList = () => {

    const { players } = usePlayers();
    const { clubs } = useClubs()
    const [playersToFilt, setPlayersToFilt] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('')
    const [roleFilter, setRoleFilter] = useState('');
    const [clubFilter, setClubFilter] = useState('');

    useEffect(() => {
        setPlayersToFilt(players)
        setLoading(false)
    }, [players])

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);
    };
    const handleRoleFilterChange = (e) => {
        setRoleFilter(e.target.value)
    }
    const handleClubFilterChange = (e) => {
        setClubFilter(e.target.value)
    }
    const filteredRolePlayers = playersToFilt?.filter(({ role }) =>
        role.includes(roleFilter)
    );
    const filteredClubPlayers = playersToFilt?.filter(({ club }) =>
        club.includes(clubFilter)
    );

    return (
        <>
            <div className='filter-container'>
                <label>Filtrar por:</label>
                <div className='container-selects-filter'>
                    <select id='filter-select' onChange={handleFilterChange} value={filter}>
                        <option value=''>--Seleccionar filtro--</option>
                        <option value='club'>Club</option>
                        <option value='role'>Puesto</option>
                    </select>
                    {filter === 'club' &&
                        <select id='pay-filter-select' onChange={handleClubFilterChange} value={clubFilter}>
                            <option value={null}>--Seleccionar filtro--</option>
                            {
                                clubs.map(({ name, _id }) => (
                                    <option value={name} key={_id}>{name}</option>
                                ))
                            }
                        </select>
                    }
                    {filter === 'role' &&
                        <select id='pay-filter-select' onChange={handleRoleFilterChange} value={roleFilter}>
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
                                filter === 'role' && roleFilter && roleFilter !== '--Seleccionar filtro--'
                                    ? filteredRolePlayers[0]
                                        ? filteredRolePlayers?.map(({ _id, name, pay, ensurance }) => (
                                            <ItemPlayer
                                                key={_id}
                                                id={_id}
                                                name={name}
                                                pay={pay}
                                                roleFilter={roleFilter}
                                                ensurance={ensurance}
                                            />
                                        ))
                                        : <p>No hay jugadores/as de este puesto</p>
                                    : filter === 'club' && clubFilter && clubFilter !== '--Seleccionar filtro--'
                                        ? filteredClubPlayers[0]
                                            ? filteredClubPlayers?.map(({ _id, name, pay, ensurance, club }) => (
                                                <ItemPlayer
                                                    key={_id}
                                                    id={_id}
                                                    name={name}
                                                    pay={pay}
                                                    club={club}
                                                    ensurance={ensurance}
                                                />
                                            ))
                                            : <p>No hay jugadores/as de este club</p>
                                        : playersToFilt?.map(({ _id, name, pay, ensurance }) => 
                                        (
                                            <ItemPlayer
                                                key={_id}
                                                id={_id}
                                                name={name}
                                                pay={pay}
                                                ensurance={ensurance}
                                            />
                                        ))
                            }
                        </ul>
                }
            </div>
        </>
    )
}

export default PlayersList

