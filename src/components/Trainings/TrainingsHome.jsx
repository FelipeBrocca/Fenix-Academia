import React, { useState, useEffect } from 'react'
import './Trainings.css'
import { Link } from 'react-router-dom'
import { useTrainings } from '../../context/TrainingsContext'
import ModalListPlayers from './ModalListPlayers'
import CloseTraining from './CloseTraining'
import ModalPayPlayer from './ModalPayPlayer'
const TrainingsHome = () => {

    const { trainings } = useTrainings()
    const [loading, setLoading] = useState(true)
    const [showTechniques, setShowTechniques] = useState(false)
    const [dayFormatted, setDayFormatted] = useState('')
    const [dayOfTraining, setDayOfTraining] = useState(false)
    const [fakeTraining] = useState({
        active: true,
        coaches: [],
        players: [],
        createdAt: {},
        techniques: 'No hay entrenamientos disponibles',
        _id: "000000000",
        date: {
            day: '2000-01-01',
            since: '00:00',
            until: '01:00'
        }
    })
    const [nextTraining, setNextTraining] = useState(fakeTraining)

    useEffect(() => {
        if (trainings[0]) {
            setNextTraining(trainings[0])
        } else {
            setNextTraining(fakeTraining)
        }
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trainings[0]])

    const handleTechniques = () => {
        setShowTechniques(showTechniques => !showTechniques)
    }

    const todayDate = new Date()
    const formattedTodayDate = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`;
    useEffect(() => {
        if (formattedTodayDate >= dayFormatted && dayFormatted !== '1/1/2000') {
            setDayOfTraining(true)
        } else {
            setDayOfTraining(false)
        }
    }, [formattedTodayDate, dayFormatted, trainings])


    useEffect(() => {
        const date = nextTraining.date.day;
        const newDate = new Date(date)
        const formatDate = `${newDate.getUTCDate()}/${newDate.getUTCMonth() + 1}/${newDate.getUTCFullYear()}`;
        setDayFormatted(formatDate)
    }, [nextTraining.date.day])

    const lines = nextTraining.techniques.split('\n');
    let currentTitleText = null;
    let isTitleLine = false;
    return (
        <>
            {
                loading
                    ? ''
                    : <>
                        <div className='trainings-home-container' >
                            <div className='top-training-home'>
                                <h3>Próximo entrenamiento</h3>
                                {
                                    dayOfTraining
                                        ? <div className='buttons-top-tr-container'>
                                            <ModalListPlayers training={nextTraining} date={dayFormatted} />
                                            {
                                                nextTraining.players.assist && nextTraining.players.assist[0]
                                                    ? <ModalPayPlayer training={nextTraining} date={dayFormatted} />
                                                    : ''
                                            }
                                        </div>
                                        : ''
                                }
                            </div>
                            <div className={'training-home-data'}>
                                <div className='date-hour-container-training-home'>
                                    <div className='date-training-home'>
                                        <label>Fecha: </label>
                                        <p>{dayFormatted ? dayFormatted : '-/-/-'}</p>
                                    </div>
                                    <div className='hour-training-home'>
                                        <label>Horario: </label>
                                        <p>{nextTraining.date.since ? nextTraining.date.since : '-'} hs</p>
                                    </div>
                                </div>
                                <div className={`techniques-data-container ${showTechniques ? 'show' : ''}`}>
                                    <h3 className='title-techniques-home'>TÉCNICAS A TRABAJAR</h3>
                                    <div className='techniques-data'>
                                        {
                                            lines
                                                ? lines.map((line, index) => {
                                                    const isTitle = /^\*[\s\S]*\*$/.test(line);
                                                    if (isTitle) {
                                                        currentTitleText = line.replace(/^\*|\*$/g, '');
                                                        isTitleLine = true;
                                                    } else {
                                                        isTitleLine = false;
                                                    }
                                                    const className = isTitleLine ? 'subtitle-techniques-home' : 'item-techniques-data';
                                                    return (
                                                        <p key={index} className={className}>
                                                            {line}
                                                        </p>
                                                    )
                                                })
                                                : 'No hay entrenamiento programado'
                                        }
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
                            {
                                dayOfTraining
                                    ? <CloseTraining training={nextTraining} _id={nextTraining._id} />
                                    : ''
                            }
                            <Link className='button-home-to' to='/entrenamientos'>
                                Ver entrenamientos
                            </Link>
                        </div>
                    </>
            }
        </>
    )
}

export default TrainingsHome