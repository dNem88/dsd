import React, {useState} from 'react'
import styles from './Customer.module.css'
import {useNavigate} from 'react-router-dom'
import Dial from '../dial/Dial'

function Customer({_id, offer, name, price, hood, address, phone, comment}) {
    const navigate = useNavigate()
     const [hover, setHover] = useState(false)

    function clickHandler(e) {
        navigate(`/customers/${_id}`)
    }
    function onHover(e) {
        setHover(true)
    }

    function onLeave(e) {
        setHover(false)
    }
    return (
        <div className={styles.container} onMouseEnter={onHover} onMouseLeave={onLeave}>
            <Dial phoneNumber={phone} color={hover ? 'purple' : 'white'}/>
            <div className={styles.info} onClick={clickHandler}>
                <div className={styles['first-row']}>
                    <h3>{name}</h3>
                    <h3>{`${price} лв`}</h3>
                </div>
                <div className={styles['second-row']}>
                    <h5>{comment}</h5>
                </div>
            </div>
        </div>
    )
}

export default Customer