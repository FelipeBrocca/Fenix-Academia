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
  const [formData, setFormData] = useState({
    image: player.image,
    name: player.name,
    dni: player.dni,
    phone: player.phone,
    club: player.club,
    role: player.role,
    birth: player.birth,
    ensurance: player.ensurance,
    active: player.active,
    pay: player.pay,
  });

  const handleResetRolesClub = () => {
    const newRoles = player.role.map(role => {
      return {
        value: role,
        label: role
      };
    });
    setRoles(newRoles);
    if(player.club){
      setClubSelected(player.club)
    }
  }
  
  useEffect(() => {
    handleResetRolesClub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const date = new Date()
    const todayMonth = date.getMonth()
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
  }, [])

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

  const fileInputRef = useRef(null)
  const ensuranceRef = useRef(null);
  const payRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: inputValue });
  };

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
    setFormData({
      image: player.image,
      name: player.name,
      dni: player.dni,
      phone: player.phone,
      club: player.club,
      role: player.role,
      birth: player.birth,
      ensurance: player.ensurance,
      active: player.active,
      pay: player.pay,
    });
    handleResetRolesClub();
    fileInputRef.current.value = "";
    ensuranceRef.current.checked = false;
    payRef.current.checked = false;
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
          <input onChange={handleInputChange} value={formData.dni} type='text' name='dni' placeholder='Dni' required />
          <input onChange={handleInputChange} value={formData.phone} type='tel' name='phone' placeholder='Telefono' required />
          <div className='clubs-container-form-create'>
            <div className='select-clubs'>
              <Select name='club' options={clubsSelect} onChange={setClubSelected} placeholder={player.club} value={clubSelected} />
            </div>
            <span className='button-modal-create-club' onClick={handleCreateClub}>+</span>
          </div>
          <Select name='role' options={roleOptions} isMulti isClearable onChange={setRoles} className='clubs-container-form-create' value={roles} />
          <input onChange={handleInputChange} value={formData.birth} type='text' name='birth' placeholder='Nacimiento' required />
          <div className='check-input-container'>
            <label htmlFor='ensurance'>Asegurado/a</label>
            <input onChange={handleInputChange} value={formData.ensurance} type='checkbox' name='ensurance' ref={ensuranceRef} />
          </div>
          <div className='check-input-container'>
            <label htmlFor='active'>Jugador/a activo</label>
            <input onChange={handleInputChange} value={formData.active} type='checkbox' name='active' defaultChecked='checked' />
          </div>
          <div className='check-input-container'>
            <label htmlFor='pay'>Pago de {month}</label>
            <input onChange={handleInputChange} value={formData.pay} type='checkbox' name='pay' ref={payRef} />
          </div>
          <button type='submit' className='button-submit-create'>Editar</button>
          {
            loading
              ? <Loader />
              : <button type='reset' onClick={resetForm} className='button-reset-create'>Cancelar</button>
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



