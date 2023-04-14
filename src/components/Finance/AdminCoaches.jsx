import React from 'react'
import { useCoaches } from '../../context/CoachesContext'
import ItemToAdmin from './ItemToAdmin'


const AdminCoaches = () => {

    const { coaches } = useCoaches()

    return (
        <div className='admin-container'>
            <h2>Entrenadores</h2>
            <ul className='admin-coaches-list'>
               {
                coaches.map(({name, _id}) => (
                    <ItemToAdmin
                    name={name}
                    id={_id}
                    key={_id}
                    type={'coach'}
                    />
                ))
               }
            </ul>
        </div>
    )
}

export default AdminCoaches