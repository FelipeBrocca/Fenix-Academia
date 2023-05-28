import React, { useState, useRef, useEffect } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Resizer from 'react-image-file-resizer';
import Select from 'react-select'
import Loader from '../Loader/Loader'



const FormCoachCreate = ({ children }) => {

    const { createCoach } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])
    const [month, setMonth] = useState('')
    const [initialValues] = useState({
        image: null,
        name: '',
        dni: '',
        phone: '',
        role: [],
        birth: '',
        pay: {
            trainingsMang: [
                // {
                //     tr_id: '',
                //     statusPay: false 
                // }
            ]
        },
        ensurance: {
            secured: false,
            paysec: false,
            until: {
                month: '',
                year: ''
            }
        },
        createdAt: {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    })
    const [formData, setFormData] = useState(initialValues);

    const resetForm = () => {
        setFormData(initialValues);
        setRoles([])
        fileInputRef.current.value = "";
        ensurancePayRef.current.checked = false;
        ensuranceRef.current.checked = false;
    }

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


    const fileInputRef = useRef()
    const ensuranceRef = useRef();
    const ensurancePayRef = useRef()

    const roleOptions = [
        { value: 'Arquero/a', label: 'Arquero/a' },
        { value: 'Arrastrador/a', label: 'Arrastrador/a' },
        { value: 'Defensa', label: 'Defensa' },
        { value: 'Volante', label: 'Volante' },
        { value: 'Delantero/a', label: 'Delantero/a' }
    ]

    useEffect(() => {
        const roleValues = roles.map((role) => role.value);
        setFormData((prevFormData) => ({
            ...prevFormData,
            role: roleValues,
        }))
    }, [roles])

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
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

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                150,
                150,
                "PNG",
                50,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const image = await resizeFile(file);
        setFormData({ ...formData, image: image });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (formData.ensurance.paysec && formData.ensurance.secured) {
                formData.ensurance.until.month = month
                formData.ensurance.until.year = todayYear + 1
            }
            await createCoach(formData);
            setLoading(false);
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-form-container'>
            <h3>Crear nuevo entrenador/a</h3>
            {children}
            <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
                <label className='form-create-label-image' htmlFor="image">Imagen de perfil</label>
                <input onChange={handleFileChange} ref={fileInputRef} type='file' name='image' />
                <input onChange={handleInputChange} value={formData.name} type='text' name='name' placeholder='Nombre' required />
                <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' inputMode="numeric" required />
                <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' inputMode="numeric" required />
                <Select inputMode="none" name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' placeholder='Seleccione rol de entrenador' value={roles} required />
                <input onChange={handleInputChange} value={formData.birth} type='date' name='birth' placeholder='Nacimiento' max="2005-12-31" required />
                <div className='check-input-container ensurance'>
                    <div>
                        <label htmlFor='ensurance'>Pago seguro</label>
                        <input onChange={handleSecureChange} value={formData.ensurance.paysec} type='checkbox' name='paysec' ref={ensurancePayRef} />
                    </div>
                    <div className={formData.ensurance.paysec === true ? '' : 'display-none'}>
                        <label htmlFor='ensurance'>Habilitación seguro</label>
                        <input onChange={handleSecureChange} value={formData.ensurance.secured} type='checkbox' name='secured' ref={ensuranceRef} />
                    </div>
                </div>
                {
                    loading
                        ? <Loader />
                        : <div className='buttons-form-container'>
                            <button type='submit' className='button-submit-create'>Crear</button>

                            <button type='reset' onClick={resetForm} className='button-reset-create'>Cancelar</button>
                        </div>
                }
            </form>
        </div>
    )
}

export default FormCoachCreate