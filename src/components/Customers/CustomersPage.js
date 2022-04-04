import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './CustomersPage.module.css'



function CustomersPage() {
    
     return (
        <div className={styles.container}>
            <Outlet/>
        </div>     
        
    )
}

export default CustomersPage