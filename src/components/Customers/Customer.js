import React from 'react'
import styles from './Customer.module.css'
import {useNavigate} from 'react-router-dom'
import Dial from '../dial/Dial'

function Customer({_id, offer, name, price, hood, address, phone}) {
    const navigate = useNavigate()

    function clickHandler(e) {
        navigate(`/customers/${_id}`)
    }
    return (
        <div className={styles.container} >
            <Dial phoneNumber={phone} color={'white'}/>
            <div className={styles.info} onClick={clickHandler}>
                <div className={styles['first-row']}>
                    <h3>{name}</h3>
                    <h3>{`${price} лв`}</h3>
                </div>
                <div className={styles['second-row']}>
                    <h5>{hood}</h5>
                </div>
            </div>
        </div>
    )
}

export default Customer