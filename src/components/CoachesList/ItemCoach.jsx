import React from 'react'
import Image from '../Image/Image'
import { Link } from 'react-router-dom'
import './CoachList.css'

const ItemCoach = ({ _id, image, name, role }) => {
  return (
    <li className='coach-item-container'>
      <Link to={`/entrenadores/listado/${_id}`}>
        <div className='coach-image-container'>
          <Image src={
            image
              ? image.url
              : 'https://res.cloudinary.com/dlah9v2do/image/upload/v1684277158/userimage_wmdcqv.png'
          } alt='img-jug' className='player-image' />
        </div>
        <div className='data-coach-container-item'>
          <h3 className='coach-name-item'>{name}</h3>
          <ul className='coach-role-list'>
            {
              role.map((role) => (
                <li className='coach-role-item' key={role}>{role}</li>
              ))
            }
          </ul>
        </div>
      </Link>
    </li>
  )
}

export default ItemCoach