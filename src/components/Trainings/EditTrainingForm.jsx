import React, { useState, useEffect, useRef } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import { useCoaches } from '../../context/CoachesContext'
import Select from 'react-select'
import Loader from '../Loader/Loader'

const EditTrainingForm = ({ children, training, id }) => {

    const { updateTraining } = useTrainings()
    const { coaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [coachesOpt, setCoachesOpt] = useState([])
    const [coachesAssis, setCoachesAssis] = useState(training.coaches)
    const initialValues = {
        active: training.active,
        coaches: training.coaches,
        players: training.players,
        date: {
            day: training.date.day,
            since: training.date.since,
            until: training.date.until
        },
        techniques: training.techniques
    }
    const [formData, setFormData] = useState(initialValues)
    const sinceRef = useRef()
    const untilRef = useRef()
    const tecRef = useRef()


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
        setCoachesAssis(training.coaches)
        sinceRef.current.value = training.date.since
        untilRef.current.value = training.date.until
        tecRef.current.value = training.techniques
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateTraining(id, formData)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <div className='create-form-container'>
            <h3>Editar entrenamiento</h3>
            {children}
            <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='input-create-container'>
                    <label htmlFor="date">Fecha:</label>
                    <input type="date" name='day' onChange={handleInputDateChange} value={formData.date.day} required />
                </div>
                <div className='input-create-container time'>
                    <div className='time-create-container'>
                        <label htmlFor="since">Desde:</label>
                        <input type="time" name='since' onChange={handleInputDateChange} ref={sinceRef} value={formData.date.since} required />
                    </div>
                    <div className='time-create-container'>
                        <label htmlFor="until">Hasta:</label>
                        <input type="time" name='until' onChange={handleInputDateChange} ref={untilRef} value={formData.date.until} required />
                    </div>
                </div>
                <div className='input-create-container'>
                    <label htmlFor="coaches">Entrenadores:</label>
                    <Select isMulti isClearable name='coaches' options={coachesOpt} onChange={setCoachesAssis} value={coachesAssis} required />
                </div>
                <div className='input-create-container'>
                    <label htmlFor="techniques">Técnicas a trabajar:</label>
                    <textarea name='techniques' style={{ resize: 'none' }} onChange={handleInputChange} value={formData.techniques} ref={tecRef} required />
                </div>
                {
                    loading
                        ? <Loader />
                        : <div className='buttons-form-container'>
                            <button type='submit' className='button-submit-create'>Editar</button>

                            <button type='reset' className='button-reset-create'
                                onClick={handleReset}
                            >Cancelar</button>
                        </div>
                }
            </form>
        </div>
    )
}

export default EditTrainingForm