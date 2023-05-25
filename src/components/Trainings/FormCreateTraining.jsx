import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import Loader from '../Loader/Loader'
import { useTrainings } from '../../context/TrainingsContext'
import { useCoaches } from '../../context/CoachesContext'
import { useMoney } from '../../context/MoneyContext'

const FormCreateTraining = ({ children }) => {

    const { createTraining } = useTrainings()
    const { money } = useMoney()
    const { coaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [coachesOpt, setCoachesOpt] = useState([])
    const [coachesAssis, setCoachesAssis] = useState([])
    const [field, setField] = useState(true)
    const [field2, setField2] = useState(false)
    const [field2Values, setField2Values] = useState({})
    const initialValues = {
        active: true,
        coaches: [],
        players: {
            paid: [],
            assist: []
        },
        date: {
            day: '',
            since: '',
            until: ''
        },
        field: {
            field: '',
            cost: 0
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

    const handleField2Values = (e) => {
        const {name, value} = e.target;
        setField2Values({...field2Values, [name]: name === 'cost' ? parseInt(value) : value})
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

    const handleField = () => {
        setField(field => !field)
        setField2(field2 => !field2)
    }

    useEffect(() => {
       setFormData({
        ...formData, 
        field: field ? money?.money?.field : field2Values
       })
    }, [field2Values, field, field2])

    const handleReset = () => {
        setFormData(initialValues)
        setCoachesAssis([])
        setField(true)
        setField2(false)
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
                    <Select isMulti isClearable name='coaches' options={coachesOpt} onChange={setCoachesAssis} value={coachesAssis} placeholder="Entrenadores" required />
                </div>
                <div className='input-create-container'>
                    <h3 htmlFor="techniques">Cancha</h3>
                    <div className='field-container'>
                        <input type="checkbox" name="field" id="tucu_field"  onChange={handleField} checked={field} />
                        <label htmlFor='field'>Tucumán Rugby</label>
                    </div>
                    <div className='field-container'>
                        <input type="checkbox" name="field2" id="field2" onChange={handleField} checked={field2}  />
                        <label htmlFor="field2">Otra</label>
                    </div>
                    {
                        field2
                            ? <div className='field2-container'>
                                <div>
                                    <label htmlFor="field">Nombre: </label>
                                    <input type="text" name='field' id='field_field' onChange={handleField2Values} />
                                </div>
                                <div>
                                    <label htmlFor="cost">Precio: </label>
                                    <input type="number" name="cost" id="field" inputMode="numeric" onChange={handleField2Values} required />
                                </div>
                            </div>
                            : ''
                    }
                </div>
                <div className='input-create-container'>
                    <label htmlFor="techniques">Técnicas a trabajar:</label>
                    <textarea name='techniques' style={{ resize: 'none' }} onChange={handleInputChange}
                        placeholder='Detalle de técnicas
                (Secreto... probá poner títulos entre asteriscos)'
                        ref={tecRef} required />
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