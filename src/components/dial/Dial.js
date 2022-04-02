import React from 'react'
import styles from './Dial.module.css'

function Dial({phoneNumber}) {

    return (
        <div className={styles.container}>
            <a href={`tel:+359${phoneNumber.substring(1) || ''}`}>Dial</a>
        </div>
    )
}

export default Dial