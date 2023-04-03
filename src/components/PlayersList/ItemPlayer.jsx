import React from 'react'
import { Link } from 'react-router-dom'

const ItemPlayer = ({ id, name, club, pay, roleFilter, ensurance }) => {

    return (
        <li>
            <p className='p-name'>{name}</p>
            {
                club !== undefined
                    ? <p className='p-filter'>{club}</p>
                    : ''
            }{
                pay !== undefined
                    ? <span className='icon-alert-container'>{
                        pay
                            ? ''
                            : <div className='icon-alert' title='Adeuda cuota/s'>
                                <p>!</p>
                            </div>
                    }
                    </span>
                    : ''
            }{
                ensurance !== undefined
                    ? <span className='icon-alert-container'>
                        {
                            ensurance
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