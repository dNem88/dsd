import React from 'react'
import styles from './Call.module.css'
import {useNavigate} from 'react-router-dom'

function Call({_id, calls, valid, date}) {
    const navigate = useNavigate()
    let dateString = date.split(' ').slice(1,4).join(' ');
    
    return (
        <div className={styles.container} >
            <h3>{dateString}</h3>
            <h3>{`${calls}`}</h3>
            <h5>{valid}</h5>
        </div>
    )
}

export default Call