import React from 'react'
import styles from './Call.module.css'
import {useNavigate} from 'react-router-dom'

function Call({_id, calls, valid, date}) {
    let dateString = date.split(' ').slice(1,4).join(' ');
    
    return (
        <div className={styles.container} >
            <div className={styles.info} >
                <div className={styles['first-row']}>
                    <h3>{dateString}</h3>
                    <h3>{`${calls}`}</h3>
                    <div>
                        <p>{`${valid}`}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Call