import React from 'react'
import styles from './Offer.module.css'
import {useNavigate} from 'react-router-dom'
import Dial from '../dial/Dial'

function Offer({_id, hood, price, address, phone, href}) {
    const navigate = useNavigate()

    function clickHandler(e) {
        navigate(`/${href}/${_id}`)
    }
    return (
        <div className={styles.container} >
            <Dial phoneNumber={phone} color={'purple'}/>
            <div className={styles.info} onClick={clickHandler}>
                <div className={styles['first-row']}>
                    <h3>{hood}</h3>
                    <h3>{`${price} лв`}</h3>
                </div>
                <div className={styles['second-row']}>
                    <h5>{address}</h5>
                </div>
            </div>
        </div>
    )
}

export default Offer