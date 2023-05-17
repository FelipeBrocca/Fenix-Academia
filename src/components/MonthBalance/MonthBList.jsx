import React, { useEffect, useState } from 'react'
import { useFinances } from '../../context/FinancesContext'
import GralFinances from '../Finance/GralFinances'
import MonthBItem from './MonthBItem'
import './MonthB.css'

const MonthBList = () => {
  const { finances } = useFinances()
  const [current, setCurrent] = useState({})
  const [active, setActive] = useState(null)

  const todayMonth = new Date().getMonth()

  const handleCurrentFin = () => {
    let currentFin = finances.find(finance => finance.month.value === todayMonth)
    if (currentFin) {
      setCurrent(currentFin)
    }
  }

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null)
    } else {
      setActive(index)
    }
  }

  useEffect(() => {
    handleCurrentFin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayMonth])


  return (
    <>
      <GralFinances current={current} />
      <div className='month-balance-list'>
        {
          finances.map((finance) => (
            <MonthBItem
              key={finance._id}
              active={active}
              handleToggle={handleToggle}
              finance={finance}
            />
          ))
        }
      </div>
    </>
  )
}

export default MonthBList