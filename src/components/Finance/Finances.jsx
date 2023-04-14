import React, { useState } from 'react'
import Select from 'react-select'
import './Finances.css'
import AdminCoaches from './AdminCoaches'
import AdminPlayers from './AdminPlayers'
import AdminOthers from './AdminOthers'
import { useLocation } from 'react-router-dom'


const Finances = () => {

  const location = useLocation()
  const { admin } = location.state ? location.state : {value: 0, label: 'Entrenadores'};
  const [adminOpt, setAdminOpt] = useState(admin !== undefined ? admin : {value: 0, label: 'Entrenadores'})

  const adminOptions = [
    { value: 0, label: 'Entrenadores' },
    { value: 1, label: 'Jugadores' },
    { value: 2, label: 'Otros' }
  ]

  return (
    <>
      <div>Total recaudado mes: $136.000</div>
      <div>Total pagado mes: $36.000</div>
      <div>Total ganancias: $100.000</div>
      <div className='select-admin-finances-container'>
        <label>Administrar</label>
        <Select options={adminOptions} onChange={setAdminOpt} value={adminOpt} className='select-admin-finance' />
      </div>
      <div className='option-finance-container'>
        {
          adminOpt.value === 0
            ? <AdminCoaches />
            : adminOpt.value === 1
            ? <AdminPlayers />
            : adminOpt.value === 2
            ? <AdminOthers />
            : ''
        }
      </div>
    </>
  )
}

export default Finances