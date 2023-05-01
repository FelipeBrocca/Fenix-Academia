import React from 'react'

const ViewPayments = ({ pays, close }) => {
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
                            <th>Plata</th>
                        </tr>
                    </thead>
                    {
                        pays?.map((pay, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{pay.date}</td>
                                    <td>{pay.hours} hs</td>
                                    <td>$ {pay.money}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </>
    )
}

export default ViewPayments