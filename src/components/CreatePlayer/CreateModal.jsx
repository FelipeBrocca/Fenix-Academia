import React, { useState } from 'react'
import './create.css'
import FormCreate from './FormCreate'

const CreateModal = () => {

  const [create, setCreate] = useState(false)

  return (
    <>
    {
      create 
      ? <div className='backdropPopUp' onClick={() => setCreate(!create)}>
      </div>
      : ''
    }
      <button className='create-button' onClick={() => setCreate(!create)}>Agregar juador/a</button>
      {
        create
          ? <FormCreate />
          : ''
      }
    </>
  )
}

export default CreateModal