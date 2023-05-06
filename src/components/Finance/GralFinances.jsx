import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
const GralFinances = () => {

    const { players } = usePlayers()
    const [loading, setLoading] = useState(true)
    const [playersPay, setPlayersPay] = useState([])

    useEffect(() => {
        setPlayersPay(players)
        setLoading(false)
    }, [players])

    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className='top-admin-finances-container'>
                <div className='gral-finances-container'>
                    <ul>
                        <li>Recaudación cuotas mensuales: </li>
                        <li>Recaudación pago sesión: </li>
                        <li>Gastos entrenadores: </li>
                        <li>Seguros: </li>
                        <li>Gastos otros: </li>
                        <h2>Ganancias: </h2>
                    </ul>
                </div>
            </div>
        )
    }
}

export default GralFinances