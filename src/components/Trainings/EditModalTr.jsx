import React, { useState } from 'react'
import EditTrainingForm from './EditTrainingForm'

const EditModalTr = ({ training, id }) => {

    const [create, setCreate] = useState(false)

    return (
        <>
            {
                create
                    ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                    </div>
                    : ''
            }
            <button className='edit-button training' onClick={() => setCreate(!create)}>Editar</button>
            {
                create
                    ? <EditTrainingForm training={training} id={id} >
                        <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                    </EditTrainingForm>
                    : ''
            }
        </>
    )
}

export default EditModalTr