import React, { useState } from 'react'
import { useClubs } from '../../context/ClubsContext'
import Loader from '../Loader/Loader'

const CreateClub = ({handleCreateClub}) => {

    const { createClub } = useClubs()
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({ name: '' })


    const resetForm = () => {
        setValues({ name: '' })
        handleCreateClub()
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            if (values.name) {
                await createClub(values)
                    .then(() => {
                        setLoading(false)
                        resetForm()
                        handleCreateClub()
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='create-club-modal' >
            <form onSubmit={handleSubmit}>
                <input name='name' onChange={handleInput} placeholder='Nuevo club' autoComplete='off' value={values.name} required />
                {
                    loading
                        ? <Loader />
                        : <div>
                            <button type='submit'>Crear</button>
                            <span onClick={() => resetForm()}>Cancelar</span>
                        </div>}
            </form>
        </div>
    )
}

export default CreateClub