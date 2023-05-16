import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'

const ViewPayments = ({ pays, close }) => {

    const { passedTrainings } = useTrainings()
    const [trainingsPayed, setTrainingsPayed] = useState([])

    useEffect(() => {
        let newTrain = []

        pays.map((train) => {
            if (train.statusPay) {
                let trainP = passedTrainings.find(trn => trn._id === train.tr_id)
                if (trainP) {
                    let sinceTime = new Date(`${trainP.date.day}T${trainP.date.since}`);
                    let untilTime = new Date(`${trainP.date.day}T${trainP.date.until}`);
                    const differenceInMilliseconds = untilTime.getTime() - sinceTime.getTime();
                    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
                    trainP.date.diffHs = differenceInHours;
                    newTrain.push(trainP);
                }
            }
            setTrainingsPayed(newTrain)
        })
    }, [pays])


    return (
        <>
            <div className='backdropPopUp' onClick={() => close(!close)}></div>
            <div className='view-pays-container'>
                <h3>Pagos  <button onClick={() => close(!close)}>X</button></h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Horas</th>
                        </tr>
                    </thead>
                    {
                        trainingsPayed[0]
                            ?
                            trainingsPayed.map((tr, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{tr.date.day}</td>
                                        <td>{tr.date.diffHs} hs</td>
                                    </tr>
                                </tbody>
                            ))
                            : ''
                    }
                </table>
            </div>
        </>
    )
}

export default ViewPayments