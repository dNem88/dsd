import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './CallsPage.module.css'
import Title from '../title/Title'


function CallsPage() {
    
     return (
        <div className={styles.container}>
            <Title content={'ОБАЖДАНИЯ'}/>
            <Outlet/>
        </div>     
        
    )
}

export default CallsPage