import React, { useState } from 'react'
import Select from 'react-select'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'

const FormCreateTraining = ({ children }) => {

    const { createTraining } = useTrainings()
    const [loading, setLoading] = useState(false)
    const [coachesAssis, setCoachesAssis] = useState([])
    const initialValues = {
        active: true,
        coaches: [],
        players: [],
        date: {
            day: '',
            since: 0,
            until: 0
        },
        techniques: ''
    }
    const [formData, setFormData] = useState(initialValues)

    const today = new Date()
    const todayDate = today.getDate()
    const todayMonth = today.getMonth() + 1
    const todayYear = today.getFullYear()

    const minDate = new Date().toISOString().split('T')[0];

    return (
        <div className='create-form-container'>
            <h3>Crear nuevo entrenamiento</h3>
            {children}
            <form className='create-form' encType='application/json'>
                <div className='input-create-container'>
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" name='date' min={minDate} />
                </div>
                <div className='input-create-container time'>
                    <div className='time-create-container'>
                        <label htmlFor="since">Desde:</label>
                        <input type="time" name='since' />
                    </div>
                    <div className='time-create-container'>
                        <label htmlFor="until">Hasta:</label>
                        <input type="time" name='until' />
                    </div>
                </div>
                <div className='input-create-container'>
                    <label htmlFor="coaches">Entrenadores:</label>
                    <Select isMulti isClearable name='coaches' />
                </div>
                <div className='input-create-container'>
                    <label htmlFor="techniques">Técnicas a trabajar:</label>
                    <textarea name='techniques' style={{resize: 'none'}} />
                </div>
                {
                    loading
                        ? <Loader />
                        : <div className='buttons-form-container'>
                            <button type='submit' className='button-submit-create'>Crear</button>

                            <button type='reset' className='button-reset-create'>Cancelar</button>
                        </div>
                }
            </form>
        </div>
    )
}

export default FormCreateTraining