import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import { useFinances } from '../../context/FinancesContext'
import Loader from '../Loader/Loader'
import ViewPayments from './ViewPayments'

const AdminCoach = (props) => {

  const { updateCoach } = useCoaches()
  const { finances, updateFinance } = useFinances()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [totalPay, setTotalPay] = useState(0)
  const [viewPayments, setViewPayments] = useState(false)
  const [monthToday, setMonthToday] = useState([])

  const [initialValues, setInitialValues] = useState({
    image: props.image,
    name: props.name,
    dni: props.dni,
    phone: props.phone,
    role: props.role,
    birth: props.birth,
    pay: {
      dateDebt: props.pay.dateDebt,
      totalDebt: {
        hours: Number(props.pay.totalDebt.hours.toFixed(1)),
        money: props.pay.totalDebt.money
      },
      payed: props.pay.payed
    },
    ensurance: {
      secured: props.ensurance.secured,
      paysec: props.ensurance.paysec,
      until: {
        month: props.ensurance.until.month,
        year: props.ensurance.until.year
      }
    },
    createdAt: {
      day: props.createdAt.day,
      month: props.createdAt.month,
      year: props.createdAt.year
    }
  })
  const [formData, setFormData] = useState(initialValues)

  useEffect(() => {
    setInitialValues(props)
  }, [props])

  const date = new Date()
  const todayMonth = date.getMonth()
  const todayYear = date.getFullYear()
  useEffect(() => {
    setMonth(
      todayMonth === 0
        ? 'Enero'
        : todayMonth === 1
          ? 'Febrero'
          : todayMonth === 2
            ? 'Marzo'
            : todayMonth === 3
              ? 'Abril'
              : todayMonth === 4
                ? 'Mayo'
                : todayMonth === 5
                  ? 'Junio'
                  : todayMonth === 6
                    ? 'Julio'
                    : todayMonth === 7
                      ? 'Agosto'
                      : todayMonth === 8
                        ? 'Septiembre'
                        : todayMonth === 9
                          ? 'Octubre'
                          : todayMonth === 10
                            ? 'Noviembre'
                            : todayMonth === 11
                              ? 'Diciembre'
                              : ''
    )
  }, [todayMonth])

  useEffect(() => {
    let monthToEdit = finances.find(finance => finance.month.value === todayMonth && finance.month.year === todayYear)
    setMonthToday(monthToEdit)
  }, [todayMonth, todayYear])

  const ensuranceRef = useRef();
  const ensurancePayRef = useRef()
  const checkboxRef = useRef()

  const resetForm = () => {
    setFormData(initialValues);
    setTotalPay(0)
    checkboxRef.current.checked = false
  };

  const handleCheckboxClick = () => {
    if (checkboxRef.current.checked) {
      setTotalPay(props.pay.totalDebt.money);
    } else {
      setTotalPay(0);
    }
  }

  const handlePayPerDate = (e, dateDebt) => {
    e.preventDefault()
    const datePaying = props.pay.dateDebt.find(date => date === dateDebt)
    const newDateDebt = formData.pay.dateDebt.filter(date => date !== datePaying)
    setFormData(prevFormData => ({
      ...prevFormData,
      pay: {
        dateDebt: newDateDebt,
        totalDebt: {
          money: prevFormData.pay.totalDebt.money - datePaying.money,
          hours: prevFormData.pay.totalDebt.hours - datePaying.hours
        },
        payed: [...prevFormData.pay.payed, datePaying]
      }
    }))
    setTotalPay(prevTotal => prevTotal + datePaying.money)
  }

  const handleSecureChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData, ensurance: {
        ...formData.ensurance,
        [name]: checked
      }
    })
  }

  useEffect(() => {
    if (totalPay === props.pay.totalDebt.money) {
      setFormData(prevFormData => ({
        ...prevFormData,
        pay: {
          dateDebt: [],
          totalDebt: { money: 0, hours: 0 },
          payed: [...prevFormData.pay.payed, ...prevFormData.pay.dateDebt]
        }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPay])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateCoach(props.id, formData)
      setLoading(false)
      resetForm()
    } catch (error) {
      console.log(error);
    }
  }

  const handleViewPayments = (e) => {
    e.preventDefault()
    setViewPayments(viewPayments => !viewPayments)
  }

  return (
    <form onSubmit={handleSubmit} className='form-administrate'>
      <div className='check-input-container payment-administration'>
        {
          props.pay.totalDebt.money > 0
            ? <>
              <table className='table-debts'>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Horas</th>
                    <th>Plata</th>
                    <th></th>
                  </tr>
                </thead>
                {
                  formData.pay.dateDebt[0]
                    ? formData.pay.dateDebt.map((dateDebt, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{dateDebt.date}</td>
                          <td>{dateDebt.hours} hs</td>
                          <td>$ {dateDebt.money}</td>
                          <td><button onClick={(e) => handlePayPerDate(e, dateDebt)}>Pagar</button></td>
                        </tr>
                      </tbody>
                    ))
                    : <tbody>
                      <tr>
                        <td>X</td>
                        <td>X</td>
                        <td>X</td>
                      </tr>
                    </tbody>
                }
                <tfoot>
                  <tr>
                    <td>Horas a pagar: {props.pay.totalDebt.hours} hs</td>
                    <td>Total a pagar: $ {props.pay.totalDebt.money}</td>
                  </tr>
                </tfoot>
              </table>
              <p>Pagando: $ {totalPay}</p>
              <div className='pay-total-checkbox'>Pagar el total
                <input type="checkbox" ref={checkboxRef} onClick={handleCheckboxClick} />
              </div>
            </>
            : <p>Pago al día <span className="ok-icon"></span></p>
        }
      </div>
      {
        (!props.ensurance.paysec && !props.ensurance.secured)
          || (props.ensurance.paysec && !props.ensurance.secured)
          ? <div className='check-input-container ensurance'>
            <div>
              <label htmlFor='ensurance'>Pago seguro</label>
              <input onChange={handleSecureChange} value={formData.ensurance.paysec} type='checkbox' name='paysec' defaultChecked={formData.ensurance.paysec} ref={ensurancePayRef} />
            </div>
            <div className={formData.ensurance.paysec === true ? '' : 'display-none'}>
              <label htmlFor='ensurance'>Habilitación seguro</label>
              <input onChange={handleSecureChange} value={formData.ensurance.secured} type='checkbox' defaultChecked={formData.ensurance.secured} name='secured' ref={ensuranceRef} />
            </div>
          </div>
          : <div className='check-input-container payment-administration'>
            <label>Asegurado/a hasta {props.ensurance.until.month} / {props.ensurance.until.year} <span className="ok-icon"></span></label>
          </div>
      }
      <button onClick={handleViewPayments} className='view-payments'>Ver pagos</button>
      {
        viewPayments
          ? <ViewPayments pays={props.pay.payed} close={setViewPayments} />
          : ''
      }
      {
        loading
          ? <Loader />
          : <div className='buttons-form-container'>
            <button type='submit' className='button-submit-create'>Confirmar</button>
            <button type='reset' onClick={resetForm} className='button-reset-create'>Cancelar</button>
          </div>
      }
    </form>
  )
}

export default AdminCoach