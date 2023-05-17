import React, { useRef, useState, useEffect } from 'react'

const MonthBItem = (props) => {
    const contentEl = useRef(null);
    const { handleToggle, active, finance } = props;
    const { _id, billing, month, pays } = finance;
    const [recMonth, setRecMonth] = useState(0)
    const [ganMonth, setGanMonth] = useState(0)

    useEffect(() => {
        if (pays) {
            let toGan = pays.coaches + pays.playersXSession + pays.secures + pays.others
            let toLose = billing.coaches + billing.secures + billing.others
            setRecMonth(pays.playersXSession)
            setGanMonth(toGan - toLose)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [billing, pays, month])

    return (
        <>
            <div className={`header-acc-item ${active === _id ? 'active' : ''}`}
                onClick={() => handleToggle(_id)}>
                <h2>{month.month} {month.year}</h2>
                <span className={active === _id ? 'show' : ''}>&#10094;</span>
            </div>
            <div
                ref={contentEl}
                className={`contentEl ${active === _id ? 'show' : ''}`}
                style={
                    active === _id
                        ? {
                            height: contentEl.current.scrollHeight
                        }
                        : { height: '0px' }
                }
            >
                <div>
                    <span>
                        <h4>Recaudación jugadores:</h4>
                        {recMonth}
                    </span>
                    <span>
                        <h4>Pagos entrenadores</h4>
                        {billing?.coaches}
                    </span>
                </div>
                <div>
                    <span>
                        <h4>Cantidad de entrenamientos: </h4>
                        proximo
                    </span>
                    <span>
                        <h4>Ganancias del mes: </h4>
                        {ganMonth}
                    </span>
                </div>
            </div>
        </>
    )
}

export default MonthBItem