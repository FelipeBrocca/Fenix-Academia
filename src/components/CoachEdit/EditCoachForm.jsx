import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Select from 'react-select'
import Resizer from 'react-image-file-resizer';
import Loader from '../Loader/Loader';


const EditCoachForm = ({ children, coach, id }) => {

  const { updateCoach } = useCoaches()
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [month, setMonth] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const initialValues = {
    image: coach.image,
    name: coach.name,
    dni: coach.dni,
    phone: coach.phone,
    role: coach.role,
    birth: coach.birth,
    pay: {
      trainingsMang: [
        {
            tr_id: coach.pay.trainingsMang.tr_id,
            statusPay: coach.pay.trainingsMang.statusPay 
        }
    ]
  },
    ensurance: {
      secured: coach.ensurance.secured,
      paysec: coach.ensurance.paysec,
      until: {
        month: coach.ensurance.until.month,
        year: coach.ensurance.until.year
      }
    },
    createdAt: {
      day: coach.createdAt.day,
      month: coach.createdAt.month,
      year: coach.createdAt.year
    }
  }
  const [formData, setFormData] = useState(initialValues)
  const resetForm = () => {
    setFormData(initialValues)
    handleResetRoles()
    if (!coach.ensurance.paysec) {
      ensurancePayRef.current.checked = coach.ensurance.paysec;
      ensuranceRef.current.checked = coach.ensurance.secured;
    } else if (coach.ensurance.paysec && !coach.ensurance.secured) {
      ensurancePayRef.current.checked = coach.ensurance.paysec;
      ensuranceRef.current.checked = coach.ensurance.secured;
    }
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

  const handleResetRoles = () => {
    const newRoles = coach.role.map(role => {
      return {
        value: role,
        label: role
      };
    });
    setRoles(newRoles);
  }

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
    handleResetRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const date = new Date(coach.birth);
    const formatted = date.toISOString().substring(0, 10);
    setBirthDate(formatted)
  }, [coach.birth]);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      birth: birthDate
    }))
  }, [birthDate])

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    setFormData({ ...formData, image: image });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (!coach.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await updateCoach(id, formData)
      setLoading(false)
      resetForm()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='create-form-container'>
      <h3>Editar entrenador/a</h3>
      {children}
      <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
        <label className='form-create-label-image' htmlFor="image">Imagen de perfil</label>
        <input onChange={handleFileChange} ref={fileInputRef} type='file' name='image' />
        <input onChange={handleInputChange} value={formData.name} type='text' name='name' placeholder='Nombre' required />
        <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' inputMode="numeric" required />
        <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' inputMode="numeric" required />
        <Select name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' placeholder='Seleccione rol de entrenador' value={roles} required />
        <input onChange={handleInputChange} value={formData.birth} type='date' name='birth' placeholder='Nacimiento' max="2005-12-31" required />
        {
          (!coach.ensurance.paysec && !coach.ensurance.secured)
            || (coach.ensurance.paysec && !coach.ensurance.secured)
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
              <label>Asegurado/a</label>
              <span className="ok-icon"></span>
            </div>
        }
        {
          loading
            ? <Loader />
            : <div className='buttons-form-container'>
              <button type='submit' className='button-submit-create'>Editar</button>

              <button type='reset' onClick={resetForm} className='button-reset-create'>Cancelar</button>
            </div>
        }
      </form>
    </div>
  )
}

export default EditCoachForm