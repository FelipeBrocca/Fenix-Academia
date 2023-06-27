import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useClubs } from '../../context/ClubsContext'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import CreateClub from '../CreateClub/CreateClub'
import Resizer from 'react-image-file-resizer';



const FormCreate = ({ children }) => {

  const { createPlayer } = usePlayers()
  const { clubs } = useClubs()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [roles, setRoles] = useState([])
  const [clubSelected, setClubSelected] = useState('')
  const [formClubs, setFormClubs] = useState(false)
  const [clubsSelect, setClubsSelect] = useState([])
  const [initialValues] = useState({
    image: null,
    name: '',
    dni: '',
    phone: '',
    club: '',
    role: [],
    birth: '',
    ensurance: {
      secured: false,
      paysec: false,
      until: {
        month: '',
        year: ''
      }
    },
    assistances: [],
    pay: {
      trainsPayed: [],
    },
    createdAt: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  })
  const [formData, setFormData] = useState(initialValues);

  const fileInputRef = useRef()
  const ensuranceRef = useRef();
  const ensurancePayRef = useRef()


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

  const roleOptions = [
    { value: 'Arquero/a', label: 'Arquero/a' },
    { value: 'Arrastrador/a', label: 'Arrastrador/a' },
    { value: 'Defensa', label: 'Defensa' },
    { value: 'Volante', label: 'Volante' },
    { value: 'Delantero/a', label: 'Delantero/a' }
  ]

  const handleCreateClub = () => {
    setFormClubs(!formClubs)
  }

  useEffect(() => {
    const selectOptions = clubs.map(club => ({
      value: club.name,
      label: club.name
    }))
    setClubsSelect(selectOptions);
  }, [clubs]);

  useEffect(() => {
    const roleValues = roles.map((role) => role.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: roleValues,
    }))
  }, [roles])

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData, club: clubSelected.value
    }))
  }, [clubSelected])

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    setFormData({ ...formData, image: image });
  };

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

  const resetForm = () => {
    setFormData(initialValues);
    setRoles([]);
    setClubSelected('')
    fileInputRef.current.value = "";
    ensurancePayRef.current.checked = false;
    ensuranceRef.current.checked = false;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (formData.ensurance.paysec && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await createPlayer(formData);
      setLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className='create-form-container'>
        <h3>Crear nuevo jugador/a</h3>
        {children}
        <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
          <label className='form-create-label-image' htmlFor="image">Imagen de perfil</label>
          <input onChange={handleFileChange} ref={fileInputRef} type='file' name='image' />
          <input onChange={handleInputChange} value={formData.name} type='text' name='name' placeholder='Nombre' required />
          <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' inputMode="numeric" />
          <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' inputMode="numeric" />
          <div className='clubs-container-form-create'>
            <div className='select-clubs'>
              <Select isSearchable={ false } name='club' placeholder='Seleccione club' options={clubsSelect} onChange={setClubSelected} value={clubSelected} />
            </div>
            <span className='button-modal-create-club' onClick={handleCreateClub}>+</span>
          </div>
          <Select isSearchable={ false } name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' placeholder='Seleccione posiciones' value={roles} />
          <input onChange={handleInputChange} value={formData.birth} type='date' name='birth' placeholder='Nacimiento' max="2012-12-31" />
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
      {
        formClubs
          ? <CreateClub
            handleCreateClub={handleCreateClub}
          />
          : ''
      }
    </>
  )
}

export default FormCreate

