import React, { useEffect, useState } from 'react'
import EditForm from './EditForm'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import EditCoachForm from '../CoachEdit/EditCoachForm'

const EditModal = ({ person, id }) => {
    const [create, setCreate] = useState(false)
    const { players } = usePlayers()
    const { coaches } = useCoaches()
    useEffect(() => {
        setCreate(false)
    }, [players, coaches])

    return (
        <>
            {
                create
                    ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                    </div>
                    : ''
            }
            <button className='edit-button' onClick={() => setCreate(!create)}>Editar {person.club ? 'jugador/a' : 'entrenador/a'}</button>
            {
                create && person.club
                    ? <EditForm player={person} id={id}>
                        <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                    </EditForm>
                    : create && !person.club
                        ? <EditCoachForm coach={person} id={id}>
                            <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                        </EditCoachForm>
                        : ''
            }
        </>
    )
}

export default EditModal