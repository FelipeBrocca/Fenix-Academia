import React from 'react'
import { Link } from 'react-router-dom'

const ItemPlayer = ({id, name}) => {
    return (
        <li>
            <p>{name}</p>
            <Link to={`/jugador/listado/${id}`}>Ver</Link>
        </li>
    )
}

export default ItemPlayer