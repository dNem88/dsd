import React from 'react'
import styles from './Offer.module.css'
import {useNavigate} from 'react-router-dom'

function Offer({_id, hood, price, address}) {
    const navigate = useNavigate()

    function clickHandler(e) {
        navigate(`/offers/${_id}`)
    }
    return (
        <div className={styles.container} onClick={clickHandler}>
            <h3>{hood}</h3>
            <h3>{`${price} лв`}</h3>
            <h5>{address}</h5>
        </div>
    )
}

export default Offer