import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import { useFinances } from '../../context/FinancesContext'
import { useTrainings } from '../../context/TrainingsContext'
import { useMoney } from '../../context/MoneyContext'
import Loader from '../Loader/Loader'
import ViewPayments from './ViewPayments'

const AdminCoach = (props) => {

  const { updateCoach } = useCoaches()
  const { passedTrainings, updateTraining } = useTrainings()
  const { money } = useMoney()
  const { finances, updateFinance } = useFinances()
  const [loading, setLoading] = useState(false)
  const [totalPay, setTotalPay] = useState(0)
  const [viewPayments, setViewPayments] = useState(false)
  const [trainingsToPay, setTrainingsToPay] = useState([])
  const [monthToday, setMonthToday] = useState([])
  const [totalToPayHours, setTotalToPayHours] = useState(0)
  const [toggledItems, setToggledItems] = useState([]);
  const [initialValues, setInitialValues] = useState({
    image: props.image,
    name: props.name,
    dni: props.dni,
    phone: props.phone,
    role: props.role,
    birth: props.birth,
    pay: props.pay,
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

  useEffect(() => {
    const newTrainingsToPay = [];
    let totalHoursToPay = 0;

    props.pay.trainingsMang.forEach((training) => {
      if (training.statusPay === false) {
        let trainToPay = passedTrainings.find(train => train._id === training.tr_id);
        if (trainToPay) {
          let sinceTime = new Date(`${trainToPay.date.day}T${trainToPay.date.since}`);
          let untilTime = new Date(`${trainToPay.date.day}T${trainToPay.date.until}`);
          const differenceInMilliseconds = untilTime.getTime() - sinceTime.getTime();
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
          trainToPay.date.diffHs = differenceInHours;
          trainToPay.date.billCoach = differenceInHours * money.money.coachesSalary;
          newTrainingsToPay.push(trainToPay);
          totalHoursToPay += differenceInHours;
        }
      }
    });
    setTotalToPayHours(totalHoursToPay);
    setTrainingsToPay(newTrainingsToPay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pay.trainingsMang]);



  const date = new Date()
  const todayMonth = date.getMonth()
  const todayYear = date.getFullYear()


  useEffect(() => {
    let monthToEdit = finances.find(finance => finance.month.value === todayMonth && finance.month.year === todayYear)
    setMonthToday(monthToEdit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      trainingsToPay.map(({ _id }) => {
       return setToggledItems(prev => [...prev, _id])
      })
       setTotalPay(totalToPayHours * money.money.coachesSalary);
    } else {
      setToggledItems([])
      setTotalPay(0);
    }
  }

  const handlePayPerDate = (e, id) => {
    e.preventDefault();
    let trainingPayed = trainingsToPay.find(train => train._id === id);

    const valueToAdd = toggledItems.includes(id)
      ? -(trainingPayed.date.diffHs * money.money.coachesSalary)
      : trainingPayed.date.diffHs * money.money.coachesSalary;

    setTotalPay(prevTotal => prevTotal + valueToAdd);

    setToggledItems(prevItems => {
      if (prevItems.includes(id)) {
        return prevItems.filter(item => item !== id);
      } else {
        return [...prevItems, id];
      }
    });
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

  useEffect(() => {
    const updatedTrainingsMang = formData.pay.trainingsMang.map(train => {
      if (train && !train.statusPay) {
        if (toggledItems.includes(train.tr_id) && !train.statusPay) {
          return { ...train, toPay: true };
        } else {
          return { ...train, toPay: false };
        }
      }
      return train
    });

    setFormData(prevFormData => ({
      ...prevFormData,
      pay: {
        ...prevFormData.pay,
        trainingsMang: updatedTrainingsMang
      }
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggledItems]);


  useEffect(() => {
    if (trainingsToPay[0]) {
      if (totalPay > 0 && totalPay === (totalToPayHours * money.money.coachesSalary)) {
        checkboxRef.current.checked = true
      } else {
        checkboxRef.current.checked = false
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPay])

  const setStatus = async () => {
    const updatedTrainingsMang = await formData.pay.trainingsMang.map(train => {
      if (train && train.statusPay === false && train.toPay === true) {
        return { ...train, statusPay: true, toPay: false };
      }
      return train;
    });

    formData.pay.trainingsMang = updatedTrainingsMang
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    monthToday.billing.coaches += totalPay
    await setStatus()
    try {
      await Promise.all(trainingsToPay.map(async (train) => {
        await updateTraining(train._id, train)
      }))
      await updateCoach(props.id, formData)
      await updateFinance(monthToday._id, monthToday)
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
          trainingsToPay[0]
            ? <>
              <table className='table-debts'>
                <thead className='thead-pay-train'>
                  <tr>
                    <th>Fecha</th>
                    <th>Horas</th>
                    <th>Plata</th>
                    <th></th>
                  </tr>
                </thead>
                {
                  trainingsToPay[0] && money ?
                    trainingsToPay.map((training, index) => (
                      <tbody key={index} className={`tbody-pay-train ${toggledItems.includes(training._id) ? 'train-payed-toggled' : ''}`}>
                        <tr>
                          <td className='date-td'>{training.date.day}</td>
                          <td className='hs-td'>{training.date.diffHs} hs</td>
                          <td className='mon-td'>$ {training.date.diffHs * money.money.coachesSalary}</td>
                          <td className='but-td'>
                            <button onClick={(e) => handlePayPerDate(e, training._id)}>
                              {toggledItems.includes(training._id) ? 'Cancelar' : 'Pagar'}
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    )) : (
                      <tbody className='tbody-pay-train'>
                        <tr>
                          <td>X</td>
                          <td>X</td>
                          <td>X</td>
                        </tr>
                      </tbody>
                    )
                }
                <tfoot>
                  <tr>
                    <td>Total horas:
                      {
                        totalToPayHours
                          ? ` ${totalToPayHours}`
                          : ''
                      }
                      hs</td>
                    <td></td>
                    <td>Total a pagar: $
                      {
                        totalToPayHours && money
                          ? totalToPayHours * money.money.coachesSalary
                          : ''
                      }</td>
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
          ? <ViewPayments pays={props.pay.trainingsMang} close={setViewPayments} />
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