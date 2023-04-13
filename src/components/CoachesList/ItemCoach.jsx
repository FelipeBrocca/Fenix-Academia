import React from 'react'
import Image from '../Image/Image'
import { Link } from 'react-router-dom'
import './CoachList.css'

const ItemCoach = ({ _id, image, name, role, active }) => {
  return (
    <li className='coach-item-container'>
      <Link to={`/entrenadores/listado/${_id}`}>
        <div className='coach-image-container'>
          <Image src={image?.url} alt='img-jug' className='player-image' />
          <span className={
            `player-status ${active ? 'active' : 'unactive'}`
          }>
          </span>
        </div>
        <div className='data-coach-container-item'>
          <h3 className='coach-name-item'>{name}</h3>
          <h4 className='coach-role-item'>Entrenador de {role}</h4>
        </div>
      </Link>
    </li>
  )
}

export default ItemCoach