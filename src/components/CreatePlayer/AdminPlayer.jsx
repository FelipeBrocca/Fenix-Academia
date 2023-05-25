import React, { useRef, useState, useEffect } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'
import { useMoney } from '../../context/MoneyContext'
import { useFinances } from '../../context/FinancesContext'

const AdminPlayer = (props) => {

  const { money } = useMoney()
  const { finances, updateFinance } = useFinances()
  const { passedTrainings, updateTraining } = useTrainings()
  const { updatePlayer } = usePlayers()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [trainToPay, setTrainToPay] = useState([])
  const [birthDate, setBirthDate] = useState('')
  const [toggledItems, setToggledItems] = useState([]);
  const [totalPay, setTotalPay] = useState(0)
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
      trainsPayed: props.pay.trainsPayed,
    },
    assistances: props.assistances,
    createdAt: {
      day: props.createdAt.day,
      month: props.createdAt.month,
      year: props.createdAt.year
    }
  }
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    let newTrains = []
    let trainsFiltered = props.pay.trainsPayed.filter((train) => train.status === false)
    trainsFiltered.map((train) => {
      let found = passedTrainings.find((tr) => train.tr_id === tr._id)
      if (found) {
        newTrains.push(found)
      }
    })
    setTrainToPay(newTrains)
  }, [props.pay.trainsPayed])

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

  const resetForm = () => {
    setFormData(initialValues);
    if (!props.ensurance.paysec) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    } else if (props.ensurance.paysec && !props.ensurance.secured) {
      ensurancePayRef.current.checked = props.ensurance.paysec;
      ensuranceRef.current.checked = props.ensurance.secured;
    }
    setToggledItems([])
  };

  const handlePay = (id, e) => {
    e.preventDefault()

    setToggledItems(prevItems => {
      if (prevItems.includes(id)) {
        return prevItems.filter(item => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
  }

  useEffect(() => {
    trainToPay.map((train) => {
      let plTr = formData.pay.trainsPayed.find((tr) => tr.tr_id === train._id)
      if (toggledItems.includes(train._id)) {
        train.players.paid.push(props._id)
        train.players.totalPay = train.players.totalPay + money.money.playerSession
        plTr.status = true
        setTotalPay(totalPay => totalPay + money.money.playerSession)
      } else {
        train.players.paid = train.players.paid.filter(id => id !== props._id)
        train.players.totalPay = train.players.totalPay - money.money.playerSession
        plTr.status = false
        setTotalPay(totalPay => totalPay - money.money.playerSession)
      }
    })
  }, [toggledItems])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (!props.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await Promise.all(trainToPay.map(async (train) => {
        await updateTraining(train._id, train)
        let todayDate = new Date(train.date.day)
        todayDate.setUTCHours(0, 0, 0, 0)
        let todayMonth = todayDate.getUTCMonth()
        let todayFin = finances.find(fin => fin.month.value === todayMonth)
        if (toggledItems.includes(train._id)) {
          todayFin.pays.playersXSession = todayFin.pays.playersXSession + money.money.playerSession
          await updateFinance(todayFin._id, todayFin)
        }
      }));
      await updatePlayer(props._id, formData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='form-administrate'>
      {
        trainToPay[0]
          ?
          <table className='table-debts'>
            <thead className='thead-pay-train'>
              <tr>
                <th>Fecha</th>
                <th>Plata</th>
                <th></th>
              </tr>
            </thead>
            {
              trainToPay.map((train, index) => {
                return (
                  <tbody key={index} className={`tbody-pay-train ${toggledItems.includes(train._id) ? 'train-payed-toggled' : ''}`}>
                    <tr>
                      <td className='date-td'>{train.date.day}</td>
                      <td>$ {money.money.playerSession}</td>
                      <td className='but-td'>
                        <button onClick={(e) => handlePay(train._id, e)}>PAGAR</button>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
          : <span style={{justifyContent: 'center', display: 'flex', gap: '10px'}}>
            <span className="ok-icon"></span>
            <p>No adeuda cuotas</p>
            </span>
      }
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
          : <div className='check-input-container ensurance'>
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