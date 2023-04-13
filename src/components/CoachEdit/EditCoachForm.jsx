import React, { useState, useEffect, useRef } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import Select from 'react-select'
import Resizer from 'react-image-file-resizer';
import Loader from '../Loader/Loader';


const EditCoachForm = ({ children, coach, id }) => {

  const { updateCoach } = useCoaches()
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [birthDate, setBirthDate] = useState('')
  const initialValues = {
    image: coach.image,
    name: coach.name,
    dni: coach.dni,
    phone: coach.phone,
    role: coach.role,
    birth: coach.birth,
    pay: {
      salary: coach.pay.salary,
      debt: coach.pay.debt,
      monthlyPay: coach.pay.monthlyPay,
      trainingPay: coach.pay.trainingPay,
      timeMonthly: coach.pay.timeMonthly,
      payed: coach.pay.payed
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

  const fileInputRef = useRef()

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
        <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' required />
        <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' required />
        <Select name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' placeholder='Seleccione rol de entrenador' value={roles} required />
        <input onChange={handleInputChange} value={formData.birth} type='date' name='birth' placeholder='Nacimiento' max="2005-12-31" required />
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