import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'
import { useCoaches } from '../../context/CoachesContext'

const FormCreateTraining = ({ children }) => {

    const { createTraining } = useTrainings()
    const { coaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [coachesOpt, setCoachesOpt] = useState([])
    const [coachesAssis, setCoachesAssis] = useState([])
    const initialValues = {
        active: true,
        coaches: [],
        players: [],
        date: {
            day: '',
            since: '',
            until: ''
        },
        techniques: ''
    }
    const [formData, setFormData] = useState(initialValues)
    const sinceRef = useRef()
    const untilRef = useRef()
    const tecRef = useRef()


    const timeZone = 'America/Argentina/Buenos_Aires';
    const minDate = new Date().toLocaleDateString('en-CA', { timeZone });

    const handleInputDateChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, date: {
                ...formData.date,
                [name]: value 
            }
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        const newOptions = coaches.map(({ _id, name }) => ({
            value: _id,
            label: name,
        }));
        setCoachesOpt(newOptions);
    }, [coaches]);

    useEffect(() => {
        setFormData({
            ...formData, coaches: coachesAssis
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coachesAssis])

    const handleReset = () => {
        setFormData(initialValues)
        setCoachesAssis([])
        sinceRef.current.value = ''
        untilRef.current.value = ''
        tecRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await createTraining(formData)
            handleReset()
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <div className='create-form-container'>
            <h3>Crear nuevo entrenamiento</h3>
            {children}
            <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='input-create-container'>
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" name='day' min={minDate} onChange={handleInputDateChange} value={formData.date.day} required />
                </div>
                <div className='input-create-container time'>
                    <div className='time-create-container'>
                        <label htmlFor="since">Desde:</label>
                        <input type="time" name='since' onChange={handleInputDateChange} ref={sinceRef} required />
                    </div>
                    <div className='time-create-container'>
                        <label htmlFor="until">Hasta:</label>
                        <input type="time" name='until' onChange={handleInputDateChange} ref={untilRef} required />
                    </div>
                </div>
                <div className='input-create-container'>
                    <label htmlFor="coaches">Entrenadores:</label>
                    <Select isMulti isClearable name='coaches' options={coachesOpt} onChange={setCoachesAssis} value={coachesAssis} required />
                </div>
                <div className='input-create-container'>
                    <label htmlFor="techniques">Técnicas a trabajar:</label>
                    <textarea name='techniques' style={{ resize: 'none' }} onChange={handleInputChange} ref={tecRef} required />
                </div>
                {
                    loading
                        ? <Loader />
                        : <div className='buttons-form-container'>
                            <button type='submit' className='button-submit-create'>Crear</button>

                            <button type='reset' className='button-reset-create'
                                onClick={handleReset}
                            >Cancelar</button>
                        </div>
                }
            </form>
        </div>
    )
}

export default FormCreateTraining