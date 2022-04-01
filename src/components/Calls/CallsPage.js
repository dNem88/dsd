import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './CallsPage.module.css'



function CallsPage() {
    
     return (
        <div className={styles.container}>
            <Outlet/>
        </div>     
        
    )
}

export default CallsPage