import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useClubs } from '../../context/ClubsContext'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import CreateClub from '../CreateClub/CreateClub'
import Resizer from 'react-image-file-resizer';


const EditForm = ({ children, player, id }) => {
  const { updatePlayer } = usePlayers()
  const { clubs } = useClubs()
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState('')
  const [roles, setRoles] = useState([])
  const [clubSelected, setClubSelected] = useState('')
  const [formClubs, setFormClubs] = useState(false)
  const [clubsSelect, setClubsSelect] = useState([])
  const [birthDate, setBirthDate] = useState('')
  const initialValues = {
    image: player.image,
    name: player.name,
    dni: player.dni,
    phone: player.phone,
    club: player.club,
    role: player.role,
    birth: birthDate,
    ensurance: {
      secured: player.ensurance.secured,
      paysec: player.ensurance.paysec,
      until: {
        month: player.ensurance.until.month,
        year: player.ensurance.until.year
      }
    },
    pay: {
      trainsPayed: player.pay.trainsPayed,
    },
    assistances: player.assistances,
    createdAt: {
      day: player.createdAt.day,
      month: player.createdAt.month,
      year: player.createdAt.year
    }
  }
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    const date = new Date(player.birth);
    const formatted = date.toISOString().substring(0, 10);
    setBirthDate(formatted)
  }, [player.birth]);
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      birth: birthDate
    }))
  }, [birthDate])

  const handleResetRolesClub = () => {
    const newRoles = player.role.map(role => {
      return {
        value: role,
        label: role
      };
    });
    setRoles(newRoles);
    if (player.club) {
      setClubSelected(player.club)
    }
  }
  useEffect(() => {
    handleResetRolesClub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const handleCreateClub = () => {
    setFormClubs(!formClubs)
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
  const ensuranceRef = useRef();
  const ensurancePayRef = useRef()

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


  const roleOptions = [
    { value: 'Arquero/a', label: 'Arquero/a' },
    { value: 'Arrastrador/a', label: 'Arrastrador/a' },
    { value: 'Defensa', label: 'Defensa' },
    { value: 'Volante', label: 'Volante' },
    { value: 'Delantero/a', label: 'Delantero/a' }
  ]

  useEffect(() => {
    const selectOptions = clubs.map(club => ({
      value: club.name,
      label: club.name
    }));
    setClubsSelect(selectOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const image = await resizeFile(file);
    setFormData({ ...formData, image: image });
  };

  const resetForm = () => {
    setFormData(initialValues);
    handleResetRolesClub();
    fileInputRef.current.value = "";
    if (!player.ensurance.paysec) {
      ensurancePayRef.current.checked = player.ensurance.paysec;
      ensuranceRef.current.checked = player.ensurance.secured;
    } else if (player.ensurance.paysec && !player.ensurance.secured) {
      ensurancePayRef.current.checked = player.ensurance.paysec;
      ensuranceRef.current.checked = player.ensurance.secured;
    }
  };


  useEffect(() => {
    const roleValues = roles.map((role) => role.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: roleValues,
    }))
  }, [roles])


  useEffect(() => {
    setFormData(prevData => ({
      ...prevData, club: clubSelected.value ? clubSelected.value : clubSelected
    }))
  }, [clubSelected])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!player.secured && formData.ensurance.secured) {
        formData.ensurance.until.month = month
        formData.ensurance.until.year = todayYear + 1
      }
      await updatePlayer(id, formData);
      setLoading(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='create-form-container'>
        <h3>Editar jugador/a</h3>
        {children}
        <form className='create-form' encType='multipart/form-data' onSubmit={handleSubmit}>
          <label className='form-create-label-image' htmlFor="image">Imagen de perfil</label>
          <input onChange={handleFileChange} ref={fileInputRef} type='file' name='image' />
          <input onChange={handleInputChange} value={formData.name} type='text' name='name' placeholder='Nombre' required />
          <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' inputMode="numeric" required />
          <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' inputMode="numeric" required />
          <div className='clubs-container-form-create'>
            <div className='select-clubs'>
              <Select inputMode="none" name='club' options={clubsSelect} onChange={setClubSelected} placeholder={player.club} value={clubSelected} />
            </div>
            <span className='button-modal-create-club' onClick={handleCreateClub}>+</span>
          </div>
          <Select inputMode="none" name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' value={roles} />
          <input onChange={handleInputChange} value={formData.birth} type='date' name='birth' placeholder='Nacimiento' max="2012-12-31" required />
          {
            (!player.ensurance.paysec && !player.ensurance.secured)
              || (player.ensurance.paysec && !player.ensurance.secured)
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

export default EditForm



