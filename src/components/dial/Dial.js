import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Dial.module.css'

function Dial({phoneNumber}) {

    return (
        <div className={styles.container}>
            <Link to={`tel:+359${phoneNumber.substring(1) || ''}`}>Dial</Link>
        </div>
    )
}

export default Dial