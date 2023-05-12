import React, { useEffect, useState } from 'react'
import { useFinances } from '../../context/FinancesContext'
import GralFinances from '../Finance/GralFinances'

const MonthBList = () => {
  const { finances } = useFinances()
  const [current, setCurrent] = useState({})

  const todayMonth = new Date().getMonth()

  const handleCurrentFin = () => {
    let currentFin = finances.find(finance => finance.month.value === todayMonth)
    if (currentFin) {
      setCurrent(currentFin)
    }
  }

  useEffect(() => {
    handleCurrentFin()
  }, [todayMonth])

  return (
    <>
      <GralFinances current={current} />
      <div className='month-balance-list'>
        {
          finances.map((finance, index) => (
            <div key={index}>{finance.month.month} {finance.month.year}</div>
            // console.log(finance)
          ))
        }
      </div>
    </>
  )
}

export default MonthBList