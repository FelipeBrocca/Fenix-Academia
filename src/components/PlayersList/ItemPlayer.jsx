import React from 'react'
import { Link } from 'react-router-dom'

const ItemPlayer = ({ id, name, club, roleFilter, ensurance, pay }) => {

    const needToPay = pay.trainsPayed.some(it => it.status === false)

    return (
        <li>
            {
                needToPay
                    ? <div className='icon-alert' title='Adeuda cuota'>
                        <p>!</p>
                    </div>
                    : ''
            }
            <p className='p-name'>{name}</p>
            {
                club !== undefined
                    ? <p className='p-filter'>{club}</p>
                    : ''
            }{
                ensurance !== undefined && !ensurance.secured
                    ? <span className='icon-alert-container'>
                        {
                            !ensurance.secured
                                ? <div className='icon-alert2' title='No asegurado'>
                                    <p>!</p>
                                </div>
                                : ''
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