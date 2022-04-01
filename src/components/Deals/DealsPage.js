import React, {useState, useEffect, useContext} from 'react'
import { Outlet } from 'react-router-dom'
import styles from './DealsPage.module.css'



function DealsPage() {
    
     return (
        <div className={styles.container}>
            <Outlet/>
        </div>     
        
    )
}

export default DealsPage