import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'
import ViewPayments from './ViewPayments'

const AdminCoach = (props) => {

  const { updateCoach } = useCoaches()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [totalPay, setTotalPay] = useState(0)
  const [viewPayments, setViewPayments] = useState(false)
  const initialValues = {
    image: props.image,
    name: props.name,
    dni: props.dni,
    phone: props.phone,
    role: props.role,
    birth: props.birth,
    pay: {
      dateDebt: props.pay.dateDebt,
      totalDebt: props.pay.totalDebt,
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
  }
  const [formData, setFormData] = useState(initialValues)

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

  const ensuranceRef = useRef();
  const ensurancePayRef = useRef()

  const resetForm = () => {
    setFormData(initialValues);
    setTotalPay(0)
    if (!props.ensurance.paysec) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    } else if (props.ensurance.paysec && !props.ensurance.secured) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseFloat(event.target.value)
    setTotalPay(inputValue);
  }

  const handleCheckboxClick = () => {
    const checkbox = document.querySelector('.pay-total-checkbox input[type="checkbox"]');
    if (checkbox.checked) {
      setTotalPay(props.pay.totalDebt.money);
    } else {
      setTotalPay(0);
    }
  }

  const handlePayPerDate = (e) => {
    e.preventDefault()

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!props.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      if (totalPay === props.pay.totalDebt.money) {
        formData.pay.totalDebt.money = 0
        formData.pay.totalDebt.hours = 0
        formData.pay.payed = formData.pay.dateDebt
        formData.pay.dateDebt = []
      }
      await updateCoach(props.id, formData)
      setLoading(false)
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
                  props.pay.dateDebt.map((dateDebt, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{dateDebt.date}</td>
                        <td>{dateDebt.hours} hs</td>
                        <td>$ {dateDebt.money}</td>
                        <td><button onClick={handlePayPerDate}>Pagar</button></td>
                      </tr>
                    </tbody>
                  ))
                }
                <tfoot>
                  <tr>
                    <td>Horas a pagar: {props.pay.totalDebt.hours} hs</td>
                    <td>Total a pagar: $ {props.pay.totalDebt.money}</td>
                  </tr>
                </tfoot>
              </table>
              <input className='amount-to-pay-coach' type="number" onChange={handleInputChange} value={totalPay} />
              <div className='pay-total-checkbox'>Pagar el total
                <input type="checkbox" onClick={handleCheckboxClick} />
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
      <button onClick={handleViewPayments}>Ver pagos</button>
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