import React, {useState} from 'react'
import EditForm from './EditForm'

const EditModal = ({player, id}) => {
    const [create, setCreate] = useState(false)

    return (
        <>
            {
                create
                    ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                    </div>
                    : ''
            }
            <button className='create-button' onClick={() => setCreate(!create)}>Editar jugador/a</button>
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