import React from 'react'
import styles from './Dial.module.css'

function Dial({phoneNumber}) {

    return (
        <div className={styles.container}>
            <a href={`tel:${phoneNumber || ''}`}>Dial</a>
        </div>
    )
}

export default Dial