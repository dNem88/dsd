import React from 'react'
import styles from './errorComp.module.css'
function ErrorComp({errorMessage}) {

    return (
        <div className={styles['main']}>
            <p className={styles['error-p']}>ERROR</p>
            <h3 className={styles['error-message']}>{errorMessage}</h3>
        </div>
    )
}

export default ErrorComp;