import React, { useRef, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'

const FormCreate = () => {

  const { createPlayer } = usePlayers()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    dni: '',
    phone: '',
    club: '',
    role: '',
    birth: '',
    ensurance: false,
    active: true,
    pay: false,
  });

  const fileInputRef = useRef(null)

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const resetForm = () => {
    setFormData({
      image: null,
      name: "",
      dni: "",
      phone: "",
      club: "",
      role: "",
      birth: "",
      ensurance: false,
      active: true,
      pay: false,
    });
    fileInputRef.current.value = "";
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true)
      await createPlayer(formData)
      .then(() => {
        setLoading(false)
        resetForm();
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='create-form-container'>
      <h3>Crear nuevo jugador/a</h3>
      <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
        <input onChange={handleFileChange} ref={fileInputRef} type='file' name='image' />
        <input onChange={handleInputChange} value={formData.name} type='text' name='name' placeholder='Nombre' />
        <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' />
        <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' />
        <input onChange={handleInputChange} value={formData.club} type='text' name='club' placeholder='Club' />
        <input onChange={handleInputChange} value={formData.role} type='text' name='role' placeholder='Posicion' />
        <input onChange={handleInputChange} value={formData.birth} type='text' name='birth' placeholder='Nacimiento' />
        <div className='check-input-container'>
          <label htmlFor='ensurance'>Esta asegurado</label>
          <input onChange={handleInputChange} value={formData.ensurance} type='checkbox' name='ensurance' />
        </div>
        <div className='check-input-container'>
          <label htmlFor='active'>Desactivar</label>
          <input onChange={handleInputChange} value={formData.active} type='checkbox' name='active' defaultChecked='checked' />
        </div>
        <div className='check-input-container'>
          <label htmlFor='pay'>Esta pago</label>
          <input onChange={handleInputChange} value={formData.pay} type='checkbox' name='pay' />
        </div>
        <button type='submit'>{loading ? 'Cargando' : 'Crear'}</button>
        <button type='reset'>Cancelar</button>
      </form>
    </div>
  )
}

export default FormCreate