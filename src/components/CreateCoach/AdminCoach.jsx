import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'

const AdminCoach = (props) => {

  const { updateCoach } = useCoaches()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [totalPay, setTotalPay] = useState(0)
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
    if (!props.ensurance.paysec) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    } else if (props.ensurance.paysec && !props.ensurance.secured) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    }
  };

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
    try {
      setLoading(true)
      if (!props.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await updateCoach(props.id, formData)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-administrate'>
      <div className='check-input-container payment-administration'>
        <div className='training-pay-administration'>
          <p>Horas a pagar: {props.pay.totalDebt.hours} hs</p>
          <p>Total a pagar: $ {props.pay.totalDebt.money}</p>
        </div>
        <input className='amount-to-pay-coach' type="number" onChange={(e) => setTotalPay(e.target.value)} />
        <div className='pay-total-checkbox'>Pagar el total
          <input type="checkbox" />
        </div>
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
          : <div className='check-input-container'>
            <label>Asegurado/a hasta {props.ensurance.until.month} / {props.ensurance.until.year}</label>
            <span className="ok-icon"></span>
          </div>
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