import React, { useEffect, useState } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import ItemToAdmin from './ItemToAdmin'
import AdminCoach from '../CreateCoach/AdminCoach'


const AdminCoaches = () => {

    const { coaches } = useCoaches()
    const [coachesAd, setCoachesAd] = useState([])

    useEffect(() => {
        setCoachesAd(coaches)
    }, [coaches])

    return (
        <div className='admin-container'>
            <h2>Entrenadores</h2>
            <ul className='admin-coaches-list'>
               {
                coachesAd.map((coach) => (
                    <ItemToAdmin
                    name={coach.name}
                    id={coach._id}
                    key={coach._id}
                    type={'coach'}
                    active={'none'}
                    >
                        <AdminCoach
                        id={coach._id}
                        image={coach.image}
                        name={coach.name}
                        dni={coach.dni}
                        phone={coach.phone}
                        role={coach.role}
                        birth={coach.birth}
                        pay={coach.pay}
                        createdAt={coach.createdAt}
                        type={'coach'}
                        ensurance={coach.ensurance}
                        />
                    </ItemToAdmin>
                ))
               }
            </ul>
        </div>
    )
}

export default AdminCoaches