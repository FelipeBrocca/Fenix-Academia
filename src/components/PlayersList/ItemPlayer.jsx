import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ItemPlayer = ({ id, name, club, pay, roleFilter, ensurance }) => {


    const date = new Date()
    const todayMonth = date.getMonth()
    const [active, setActive] = useState(false)

    useEffect(() => {
        const monthValue = pay.monthsPayed.map((month) => month.value)
        const isActive = monthValue.some((month) => month === todayMonth)
        setActive(isActive)
    }, [pay, todayMonth])

    return (
        <li>
            {
                pay !== undefined
                    ? active
                    ? <span className='active-span'></span>
                    : <span className='unactive-span'></span>
                    : ''
            }
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