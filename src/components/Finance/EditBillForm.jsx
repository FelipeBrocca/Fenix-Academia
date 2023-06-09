import React, { useEffect, useState } from 'react'
import { useMoney } from '../../context/MoneyContext'
import Loader from '../Loader/Loader'

const EditBillForm = ({ setEditBill }) => {

    const { money, updateMoney } = useMoney()
    const [playersMon, setPlayersMon] = useState(money?.money?.playerSession)
    const [coachesMon, setCoachesMon] = useState(money?.money?.coachesSalary)
    const [secureMon, setSecureMon] = useState(money?.money?.secure)
    const [fieldMon, setFieldMon] = useState(money?.money?.field)
    const [initialValues] = useState(money)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState(initialValues)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'playerSession') {
            setPlayersMon(value)
        } else if (name === 'coachesSalary') {
            setCoachesMon(value)
        } else if (name === 'secure') {
            setSecureMon(value)
        } else if (name === 'field') {
            setFieldMon({field: 'Tuc.Rugby', cost: value})
        }
    }

    const handleClose = () => {
        setEditBill(false)
    }

    useEffect(() => {
        setForm(form => ({
            ...form,
            money: {
                playerSession: parseInt(playersMon),
                coachesSalary: parseInt(coachesMon),
                secure: parseInt(secureMon),
                field: {
                    field: fieldMon.field,
                    cost: parseInt(fieldMon.cost)
                }
            }
        }))
    }, [playersMon, coachesMon, secureMon, fieldMon])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await updateMoney(money._id, form)
            setLoading(false)
            setEditBill(false)
        } catch (error) {
            console.log(error);
        }
    }

    const resetForm = () => {
        setForm(initialValues)
        setPlayersMon(money.money.playerSession)
        setCoachesMon(money.money.coachesSalary)
        setSecureMon(money.money.secure)
    }
    console.log(money);

    return (
        <form className='edit-bill-form' onSubmit={handleSubmit}>
            <h3>Editar valores</h3>
            <button className='close-edit-bill' onClick={handleClose}>X</button>
            <div>
                <label>Cuota jugadores</label>
                <input min={0} type="number" name='playerSession' value={playersMon} inputMode="numeric" onChange={handleInputChange} />
            </div>
            <div>
                <label>Salario entrenadores</label>
                <input min={0} type="number" name='coachesSalary' onChange={handleInputChange} inputMode="numeric" value={coachesMon} />
            </div>
            <div>
                <label>Seguros</label>
                <input min={0} type="number" name='secure' onChange={handleInputChange} inputMode="numeric" value={secureMon} />
            </div>
            <div>
                <label>Valor Tuc. Rugby</label>
                <input min={0} type="number" name='field' onChange={handleInputChange} inputMode="numeric" value={fieldMon.cost} />
            </div>
            <div className='edit-bill-buttons'>
                {
                    loading
                        ? <Loader />
                        : <>
                            <button className='edit-bill-button cancel' type='reset' onClick={resetForm}>Cancelar</button>
                            <button className='edit-bill-button submit' type='submit'>Editar</button>
                        </>
                }
            </div>
        </form>
    )
}

export default EditBillForm