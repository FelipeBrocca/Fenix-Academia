import React, {useState} from 'react'
import ListPlayersTraining from './ListPlayersTraining'

const ModalListPlayers = ({training, date}) => {

    const [create, setCreate] = useState(false)

    return (
        <>
        {
            create
                ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                </div>
                : ''
        }
        <button className='edit-button assistance' onClick={() => setCreate(!create)}>Tomar asistencias</button>
        {
            create
                ? <ListPlayersTraining training={training} date={date} setCreate={setCreate} create={create} >
                    <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                </ListPlayersTraining>
                : ''
        }
    </>
    )
}

export default ModalListPlayers