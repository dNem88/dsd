import React, {useEffect,useState} from 'react'
import styles from './Stat.module.css'
import targets from '../../utils/targets'

function Stat({keyField,value, period, year}) {
    
   
    return (
        <div className={styles.container}>
            <div className={styles[`key`]}>
                <p>{keyField}</p>
            </div>
            <div className={styles[`value`]}>
                <p>{value}</p>
            </div>
            <div className={styles[`target`]}>
                <p>{targets[year][keyField][period]}</p>
            </div>
            <div className={styles[`completion`]}>
                <p>{`${((Number(value) / Number(targets[year][keyField][period])) * 100).toFixed(2)} %`}</p>
            </div>
        </div>
    )
}

export default Stat