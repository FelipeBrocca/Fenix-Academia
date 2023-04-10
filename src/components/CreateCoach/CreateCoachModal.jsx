import React, {useState} from 'react'
import FormCoachCreate from './FormCoachCreate'

const CreateCoachModal = () => {

  const [create, setCreate] = useState(false)
  return (
    <>
      {
        create
          ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
          </div>
          : ''
      }
      <button className='create-button' onClick={() => setCreate(!create)}>Agregar entrenador/a</button>
      {
        create
          ? <FormCoachCreate>
            <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
          </FormCoachCreate>
          : ''
      }
    </>
  )
}

export default CreateCoachModal