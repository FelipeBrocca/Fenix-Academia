import React, { useRef, useState, useEffect } from 'react'
import Select from 'react-select'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'

const AdminPlayer = (props) => {
  const { updatePlayer } = usePlayers()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [monthsPay, setMonthsPay] = useState([])
  const [trainsPayed, setTrainsPayed] = useState(0)
  const [birthDate, setBirthDate] = useState('')
  const initialValues = {
    image: props.image,
    name: props.name,
    dni: props.dni,
    phone: props.phone,
    club: props.club,
    role: props.role,
    birth: birthDate,
    ensurance: {
      secured: props.ensurance.secured,
      paysec: props.ensurance.paysec,
      until: {
        month: props.ensurance.until.month,
        year: props.ensurance.until.year
      }
    },
    pay: {
      monthsPayed: props.pay.monthsPayed,
      trainsPayed: props.pay.trainsPayed,
    },
    createdAt: {
      day: props.createdAt.day,
      month: props.createdAt.month,
      year: props.createdAt.year
    }
  }
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    const date = new Date(props.birth);
    const formatted = date.toISOString().substring(0, 10);
    setBirthDate(formatted)
  }, [props.birth]);
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      birth: birthDate
    }))
  }, [birthDate])

  const handleResetPaymMonthlyTraining = () => {
    const newMonthly = props.pay.monthsPayed.map(month => {
      return {
        value: month.value,
        label: month.label
      }
    });
    setMonthsPay(newMonthly);
    if (props.pay.trainsPayed) {
      setTrainsPayed(props.pay.trainsPayed)
    }
  }
  useEffect(() => {
    handleResetPaymMonthlyTraining()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  const ensurancePayRef = useRef();

  const handleSecureChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData, ensurance: {
        ...formData.ensurance,
        [name]: checked
      }
    })
  }

  const handleTrainsPayment = (e) => {
    setTrainsPayed(e.target.value)
  }
  useEffect(() => {
    const monthsPayValue = monthsPay.map((month) => ({
      value: month.value,
      label: month.label
    }))
    setFormData((prevData) => ({
      ...prevData,
      pay: {
        ...prevData.pay,
        monthsPayed: monthsPayValue
      }
    }))
  }, [monthsPay])
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      pay: {
        ...prevData.pay,
        trainsPayed: parseInt(trainsPayed)
      }
    }))
  }, [trainsPayed])

  const monthlyFeeOptions = [
    { value: 0, label: 'Enero' },
    { value: 1, label: 'Febrero' },
    { value: 2, label: 'Marzo' },
    { value: 3, label: 'Abril' },
    { value: 4, label: 'Mayo' },
    { value: 5, label: 'Junio' },
    { value: 6, label: 'Julio' },
    { value: 7, label: 'Agosto' },
    { value: 8, label: 'Septiembre' },
    { value: 9, label: 'Octubre' },
    { value: 10, label: 'Noviembre' },
    { value: 11, label: 'Diciembre' },
  ]



  const resetForm = () => {
    setFormData(initialValues);
    setMonthsPay(props.pay.monthsPayed)
    setTrainsPayed(props.pay.trainsPayed)
    if (!props.ensurance.paysec) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    } else if (props.ensurance.paysec && !props.ensurance.secured) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!props.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await updatePlayer(props.id, formData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-administrate'>
      <div className='check-input-container payment-administration'>
        <div className='monthly-pay-administration'>
          <label htmlFor='pay'>Pago mensual</label>
          <Select isMulti isClearable options={monthlyFeeOptions} onChange={setMonthsPay} value={monthsPay} />
        </div>
        <div className='training-pay-administration'>
          <label htmlFor='pay'>Pago por sesiones</label>
          <input className='numb-of-sessions' type='number' name='trainsPayed' placeholder='Cantidad de sesiones' onChange={handleTrainsPayment} value={trainsPayed} />
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

export default AdminPlayer