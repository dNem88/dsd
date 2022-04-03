import React from 'react'
import styles from './Table.module.css'


function Table({children, options}) {


    return (
         <table className={styles.table} styles={options}>
            <tbody>
               {children}             
            </tbody>
        </table>
    )
}

export default Table