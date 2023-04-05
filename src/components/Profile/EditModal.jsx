import React, {useEffect, useState} from 'react'
import EditForm from './EditForm'
import { usePlayers } from '../../context/PlayersContext'

const EditModal = ({player, id}) => {
    const [create, setCreate] = useState(false)
    const {players} = usePlayers()
    useEffect(() => {
        setCreate(false)
    }, [players])

    return (
        <>
            {
                create
                    ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                    </div>
                    : ''
            }
            <button className='edit-button' onClick={() => setCreate(!create)}>Editar jugador/a</button>
            {
                create
                    ? <EditForm player={player} id={id}>
                        <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                    </EditForm>
                    : ''
            }
        </>
    )
}

export default EditModal