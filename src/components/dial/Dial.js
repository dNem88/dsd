import React from 'react'
import styles from './Dial.module.css'
import phone from '../../assets/phone.svg'
import phonewhite from '../../assets/phonewhite.svg'

function Dial({phoneNumber, color='purple'}) {

    return (
        <div className={styles[`container-${color}`]}>
            <a className={styles[color]} href={`tel:${phoneNumber || ''}`}>
                <img src={color === 'purple' ? phone : phonewhite}/>
            </a>
        </div>
    )
}

export default Dial