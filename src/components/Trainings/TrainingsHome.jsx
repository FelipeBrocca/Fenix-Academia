import React, { useState } from 'react'
import './Trainings.css'
import { Link } from 'react-router-dom'
const TrainingsHome = () => {

    const [showTechniques, setShowTechniques] = useState(false)

    const handleTechniques = () => {
        setShowTechniques(showTechniques => !showTechniques)
    }

    return (
        <>
            <div className='trainings-home-container' >
                <div className='top-training-home'>
                    <h3>Próximo entrenamiento</h3>
                </div>
                <div className={'training-home-data'}>
                    <div className='date-hour-container-training-home'>
                        <div className='date-training-home'>
                            <label>Fecha: </label>
                            <p>14/04/2023</p>
                        </div>
                        <div className='hour-training-home'>
                            <label>Horario: </label>
                            <p>15:30 hs</p>
                        </div>
                    </div>
                    <div className={`techniques-data-container ${showTechniques ? 'show' : ''}`}>
                        <h3 className='title-techniques-home'>TÉCNICAS A TRABAJAR</h3>
                        <div className='techniques-data'>
                            <h3 className='subtitle-techniques-home'>- ARQUEROS -</h3>
                            <strong></strong>
                            <ul className='list-techniques'>
                                <li>- Defensa del córner</li>
                                <li>- Despejes</li>
                            </ul>
                        </div>
                        <div className='techniques-data'>
                            <h3 className='subtitle-techniques-home'>- JUGADORES DE CAMPO -</h3>
                            <strong>CÓRNER CORTO EN ATAQUE</strong>
                            <ul className='list-techniques'>
                                <li>- Servicio</li>
                                <li>- Parada</li>
                                <li>- Ejecuciones</li>
                                <li>- Defensa del poste</li>
                            </ul>
                        </div>
                    </div>
                    <div className='techniques-training-home-button'>
                        <button className='toggle-button-techniques-home' onClick={handleTechniques}>
                            {showTechniques ? 'Ver menos' : 'Ver más'}
                            <div>
                                <div className={`arrow-down ${showTechniques ? 'up' : ''}`}></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='bottom-training-home'>
                <Link className='button-home-to' to='/entrenamientos'>
                    Ver entrenamientos
                </Link>
            </div>
        </>
    )
}

export default TrainingsHome