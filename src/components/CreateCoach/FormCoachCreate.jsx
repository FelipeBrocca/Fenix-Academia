import React from 'react'

const FormCoachCreate = ({children}) => {
    return (
        <div className='create-form-container'>
        <h3>Crear nuevo entrenador/a</h3>
            {children}
        </div>
    )
}

export default FormCoachCreate