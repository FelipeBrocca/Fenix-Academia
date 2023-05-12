import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ItemPlayer = ({ id, name, club, roleFilter, ensurance }) => {


    const [active, setActive] = useState(false)

    return (
        <li>
            <p className='p-name'>{name}</p>
            {
                club !== undefined
                    ? <p className='p-filter'>{club}</p>
                    : ''
            }{
                ensurance !== undefined && ensurance.paysec && !ensurance.secured
                    ? <span className='icon-alert-container'>
                        {
                            !ensurance.paysec && ensurance.secured
                                ? ''
                                : <div className='icon-alert2' title='No asegurado'>
                                    <p>!</p>
                                </div>
                        }
                    </span>
                    : ''
            }
            {
                roleFilter
                    ? <p className='p-filter'>- {roleFilter.slice(0, 3)} -</p>
                    : ''
            }
            <Link className='item-player-link-to-profile' to={`/jugador/listado/${id}`}>Ver</Link>
        </li >
    )
}

export default ItemPlayer