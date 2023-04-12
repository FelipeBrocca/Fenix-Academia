import React, { useEffect, useState } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'
import ItemCoach from './ItemCoach'
import './CoachList.css'


const CoachesList = () => {

const { coaches } = useCoaches()
const [coachToList, setCoachToList] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  setCoachToList(coaches)
  setLoading(false)
}, [coaches])

  return (
    <div className='coaches-list'>
      {
      loading
      ? <Loader />
      : <ul>
        {
          coachToList.map(({_id, image, name, role, active}) => (
            <ItemCoach 
            key={_id}
            _id={_id}
            image={image}
            name={name}
            role={role}
            active={active}
            />
          ))
        }
      </ul>
      }
    </div>
  )
}

export default CoachesList