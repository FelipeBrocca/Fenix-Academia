import React from 'react'

const ItemToAdmin = ({ name, id, button }) => {
    return (
        <li className='admin-coaches-item'>
            <p>{name}</p>
            <button className={`button-admin-${button}`}>
                {button}
            </button>
        </li>
    )
}

export default ItemToAdmin