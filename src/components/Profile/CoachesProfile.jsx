import React, { useState, useEffect } from 'react'
import { useCoaches } from '../../context/CoachesContext'
import { useNavigate } from 'react-router-dom'
import Image from '../Image/Image'
import Loader from '../Loader/Loader'


const CoachesProfile = ({ coach }) => {

    const { deleteCoach } = useCoaches()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const navigation = useNavigate()
    const birthCoach = coach?.birth instanceof Date ? coach?.birth : new Date(coach?.birth)
    const [age, setAge] = useState('')
    const [elimModal, setElimModal] = useState(false)
    const todayDate = new Date()


    useEffect(() => {
        const differenceInTime = todayDate.getTime() - birthCoach.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        setAge(Math.floor(differenceInDays / 365))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [birthCoach])
console.log(coach);
    const eliminateCoach = async (id) => {
        try {
            setLoadingDelete(true)
            await deleteCoach(id)
            setLoadingDelete(false)
            navigation('/entrenadores/listado')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='player-card'>
            <ul className='profile-data-list'>
                <div className='player-image-container'>
                    <Image src={coach?.image.url} alt='img-coach' className='player-image' />
                </div>
                <h2>{coach?.name}</h2>
                <li className='profile-data-item'>
                    <label>Edad:</label>
                    <p>{age}</p>
                </li>
                <li className='profile-data-item'>
                    <label>DNI:</label>
                    <p>{coach?.dni}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Alta:</label>
                    <p>{coach?.createdAt?.day}/{coach?.createdAt?.month}/{coach?.createdAt?.year}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Teléfono: </label>
                    <p>{coach?.phone}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Entrenador/a de:</label>
                    <ul>
                        {
                            coach?.role.map((role) => (
                                <li className='roles-in-profile' key={role}>- {role}</li>
                            ))
                        }
                    </ul>
                </li>
                <li className='profile-data-item ensurance'>
                    {
                        !coach?.ensurance.secured
                            ? <label>Pago del seguro: {coach?.ensurance.paysec ? <span className="ok-icon"></span>
                                : <span className="red-cross-icon"></span>
                            }</label>
                            : ''
                    }
                    <label>Seguro activo: {coach?.ensurance.secured ? <span className="ok-icon"></span>
                        : <span className="red-cross-icon"></span>
                    }</label>
                    {
                        coach?.ensurance.paysec && coach?.ensurance.secured
                            ? <label>Hasta:
                                <p>{coach?.ensurance.until.month} de {coach?.ensurance.until.year}</p>
                            </label>
                            : ''
                    }
                </li>
                <button className='button-eliminate-player' onClick={() => setElimModal(!elimModal)}>Eliminar entrenador</button>
                {
                    elimModal
                        ? <div className='modal-eliminate'>
                            <div className='elim-confirmation'>
                                <h3>Estás seguro de querer eliminar a {coach?.name}?</h3>
                                {
                                    loadingDelete
                                        ? <Loader />
                                        : <div>
                                            <button className='button-eliminate-confirm' onClick={() => eliminateCoach(coach?._id)}>Eliminar</button>
                                            <button className='button-eliminate-cancel' onClick={() => setElimModal(!elimModal)}>Cancelar</button>
                                        </div>
                                }
                            </div>
                        </div>
                        : ''
                }
            </ul>
        </div>
    )
}

export default CoachesProfile