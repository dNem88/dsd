import React, {useState} from 'react'
import styles from './Offer.module.css'
import {useNavigate} from 'react-router-dom'
import Dial from '../dial/Dial'

function Offer({_id, hood, price, address, phone, href}) {
    const navigate = useNavigate()
    const [hover, setHover] = useState(false)
    function clickHandler(e) {
        navigate(`/${href}/${_id}`)
    }
    function onHover(e) {
        setHover(true)
    }
    function onLeave(e) {
        setHover(false)
    }
    
    return (
        <div className={styles.container} onMouseEnter={onHover} onMouseLeave={onLeave}>
            <Dial phoneNumber={phone} color={hover ? 'white' : 'purple'}/>
            <div className={styles.info} onClick={clickHandler}>
                <div className={styles['first-row']}>
                    <div>
                        <h3>{hood}</h3>
                    </div>
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