import React, { useState } from 'react'


const ItemToAdmin = (props) => {

    const [adminForm, setAdminForm] = useState(false)

    const handleAdminForm = () => {
        setAdminForm(adminForm => !adminForm)
    }
    return (
        <>
            <li className={`admin-coaches-item ${adminForm ? 'active' : ''}`}>
                {
                    props.ensurance && !props.ensurance.secured
                        ? <div className='icon-alert2' title='No asegurado'>
                            <p>!</p>
                        </div>
                        : ''
                }
                {
                    props.type === 'player' && props.pay.trainsPayed.some(item => item.status === false)
                        ? <div className='icon-alert'><p>!</p></div>
                        : ''
                }
                <p
                    className={`item-admin-name ${props.type === 'player' ? 'player' : ''}`}>
                    {props.name}
                </p>
                <button
                    className={`button-admin-${props.type} ${adminForm ? 'active' : ''}`}
                    onClick={() => handleAdminForm()}>
                    {adminForm ? 'X' : 'Administrar'}
                </button>
            </li>
            <span className={`administrate-form ${adminForm ? 'active' : ''}`}>
                {
                    adminForm
                        ? <div className='administrate-form-container'>
                            {props.children}
                        </div>
                        : ''
                }
            </span>
        </>
    )
}

export default ItemToAdmin