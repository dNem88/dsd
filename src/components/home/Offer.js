import React from 'react'
import styles from './Offer.module.css'
import {useNavigate} from 'react-router-dom'
import Dial from '../dial/Dial'

function Offer({_id, hood, price, address}) {
    const navigate = useNavigate()

    function clickHandler(e) {
        navigate(`/offers/${_id}`)
    }
    return (
        <div className={styles.container} >
            <Dial phoneNumber={'0899140844'}/>
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