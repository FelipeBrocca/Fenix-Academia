import React, { useState } from 'react'
import Select from 'react-select'
import './Finances.css'
import AdminCoaches from './AdminCoaches'
import AdminPlayers from './AdminPlayers'
import AdminFinances from './AdminFinances'
import { useLocation } from 'react-router-dom'


const Finances = () => {

  const location = useLocation()
  const { admin } = location.state ? location.state : { value: 0, label: 'Entrenadores' };
  const [adminOpt, setAdminOpt] = useState(admin !== undefined ? admin : { value: 0, label: 'Entrenadores' })

  const adminOptions = [
    { value: 0, label: 'Entrenadores' },
    { value: 1, label: 'Jugadores' },
    { value: 2, label: 'Finanzas' }
  ]

  return (
    <>
      <div className='select-admin-finances-container'>
        <label>Administrar</label>
        <Select isSearchable={ false } options={adminOptions} onChange={setAdminOpt} value={adminOpt} className='select-admin-finance' />
      </div>
      <div className='option-finance-container'>
        {
          adminOpt.value === 0
            ? <AdminCoaches />
            : adminOpt.value === 1
              ? <AdminPlayers />
              : adminOpt.value === 2
                ? <AdminFinances />
                : ''
        }
      </div>
    </>
  )
}

export default Finances