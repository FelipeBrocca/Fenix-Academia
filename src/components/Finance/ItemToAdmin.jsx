import React from 'react'

const ItemToAdmin = ({ name, id, type }) => {
    return (
        <li className='admin-coaches-item'>
            <p>{name}</p>
            <button className={`button-admin-${type}`}>
                Administrar
            </button>
        </li>
    )
}

export default ItemToAdmin