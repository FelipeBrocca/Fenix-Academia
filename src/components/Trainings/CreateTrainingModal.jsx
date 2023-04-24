import React, { useState } from 'react'
import FormCreateTraining from './FormCreateTraining'

const CreateTrainingModal = () => {

  const [create, setCreate] = useState(false)

  return (
    <>
      {
        create
          ? <div className='backdropPopUp' onClick={() => setCreate(!create)}></div>
          : ''
      }
      <button className='create-button' onClick={() => setCreate(!create)}>Agregar entrenamiento</button>
      {
        create
          ? <FormCreateTraining>
            <button className='close-create-form' onClick={() => setCreate(!create)}>X</button>
          </FormCreateTraining>
          : ''
      }
    </>
  )
}

export default CreateTrainingModal