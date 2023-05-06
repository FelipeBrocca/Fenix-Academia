import React, { useState } from 'react'
import { useFinances } from '../../context/FinancesContext'

const MonthBList = () => {
  const { finances } = useFinances()
  return (
    <div className='month-balance-list'>
        {
          finances.map((finance, index) => (
            <div key={index}>{finance.month.month} {finance.month.year}</div>
          ))
        }
    </div>
  )
}

export default MonthBList