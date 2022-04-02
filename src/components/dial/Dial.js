import React from 'react'
import styles from './Dial.module.css'
import phone from '../../assets/phone.svg'

function Dial({phoneNumber}) {

    return (
        <div className={styles.container}>
            <a href={`tel:${phoneNumber || ''}`}>
                <img src={phone}/>
            </a>
        </div>
    )
}

export default Dial