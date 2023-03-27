import React from 'react'
import { Link } from 'react-router-dom'

const ItemSearch = ({ name, id }) => {
    return (
        <li>
            <Link to={`/jugador/listado/${id}`}>
                {name}
            </Link>
        </li>
    )
}

export default ItemSearch