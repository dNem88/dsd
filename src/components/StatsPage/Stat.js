import React, {useEffect,useState} from 'react'
import styles from './Stat.module.css'

function Stat({keyField,value, period}) {
   
    const targets = {
        'оферти': {
            year: 168,
            month: 14
        },
        'клиенти': {
            year: 50,
            month: 4
        },
        'сделки': {
            year: 48,
            month: 4
        },
         'приход': {
             year: 15000,
             month: 1250
         },
        'обаждания': {
            year: 7200,
            month: 600
        },
        'валидни оферти': {
            year: 360,
            month: 30
        },
        'активни дни': {
            year: 104,
            month: 10
        }
    }
    
    return (
        <div className={styles.container}>
            <div className={styles[`key`]}>
                <p>{keyField}</p>
            </div>
            <div className={styles[`value`]}>
                <p>{value}</p>
            </div>
            <div className={styles[`target`]}>
                <p>{targets[keyField][period]}</p>
            </div>
            <div className={styles[`completion`]}>
                <p>{`${((Number(value) / Number(targets[keyField][period])) * 100).toFixed(2)} %`}</p>
            </div>
        </div>
    )
}

export default Stat