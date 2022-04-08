import React from 'react'
import styles from './Stat.module.css'

function Stat({keyField,value}) {


    return (
        <div className={styles.container}>
            <div className={styles[`key`]}>
                <p>{keyField}</p>
            </div>
            <div className={styles[`value`]}>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default Stat