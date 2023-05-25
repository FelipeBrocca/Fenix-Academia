import React, {useState, useEffect} from 'react'
import ListPayPlayer from './ListPayPlayer'

const ModalPayPlayer = ({training, date}) => {
    const [create, setCreate] = useState(false)
    const body = document.getElementById('body')

    useEffect(() => {
        if (create) {
            body.style.overflowY = "hidden"
        } else {
            body.style.overflowY = "auto"
        }
    }, [create])

    return (
        <>
        {
            create
                ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
                </div>
                : ''
        }
        <button className='edit-button pay' onClick={() => setCreate(!create)}>Pagos</button>
        {
            create
                ? <ListPayPlayer training={training} date={date} setCreate={setCreate} create={create} >
                    <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
                </ListPayPlayer>
                : ''
        }
    </>
    )
}

export default ModalPayPlayer