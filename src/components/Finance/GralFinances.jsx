import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { useMoney } from '../../context/MoneyContext'
import EditBillForm from './EditBillForm'
const GralFinances = ({ current }) => {

    const { money } = useMoney()
    const [loading, setLoading] = useState(true)
    const [currentMonth, setCurrentMonth] = useState({})
    const [values, setValues] = useState({})
    const [recMonth, setRecMonth] = useState(0)
    const [ganMonth, setGanMonth] = useState(0)
    const [editBill, setEditBill] = useState(false)


    useEffect(() => {
        setCurrentMonth(current)
        setValues(money.money)
        setLoading(false)
    }, [current, money])

    useEffect(() => {
        if (currentMonth.pays) {
            setRecMonth(currentMonth.pays.playersXSession)
        } else if (currentMonth.pays && currentMonth.billing) {
            setGanMonth(
                currentMonth.pays.playersXMonth + currentMonth.pays.playersXSession + currentMonth.pays.coaches + currentMonth.pays.others + currentMonth.pays.secures - currentMonth.billing.coaches - currentMonth.billing.others - currentMonth.billing.secures
            )
        }
    }, [currentMonth])

    const handleEditBill = () => {
        setEditBill(editBill => !editBill)
    }

    if (loading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className='top-admin-finances-container'>
                <h3>VALORES POR ENTRENAMIENTO
                    <button className='edit-bill-detail' onClick={handleEditBill}>Editar</button>
                    {
                        editBill
                            ? <>
                                <div className='backdropPopUp' onClick={handleEditBill}></div>
                                <EditBillForm setEditBill={setEditBill} />
                            </>
                            : ''
                    }
                </h3>
                <div className='bill-detail-container'>
                    <h5>CUOTA JUGADORES</h5>
                    <h5>$ {values?.playerSession}</h5>
                </div>
                <div className='bill-detail-container'>
                    <h5>SALARIO ENTRENADORES</h5>
                    <h5>$ {values?.coachesSalary}</h5>
                </div>
                <div className='bill-detail-container'>
                    <h5>VALOR SEGURO</h5>
                    <h5>$ {values?.secure}</h5>
                </div>
                <div className='gral-finances-container'>
                    <ul>
                        <li>
                            <label>Recaudación jugadores: </label>
                            <p>
                                {recMonth}
                            </p>
                        </li>
                        <li>
                            <label>Pagos entrenadores:</label>
                            <p>{currentMonth?.billing?.coaches}</p>
                        </li>
                        <li>
                            <label>Pagos otros: </label>
                            <p>{currentMonth?.billing?.others}</p>
                        </li>
                        <li>
                            <label>Ganancias del mes:</label>
                            <p>
                                {ganMonth}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default GralFinances