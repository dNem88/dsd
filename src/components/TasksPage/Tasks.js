import React from 'react'
import styles from './Tasks.module.css'
import { Outlet } from 'react-router-dom'

function Tasks({tasks, setTasks}) {
   

    return (
        <div className={styles['wrapper']}>
            <Outlet/>
        </div>
    )
}

export default Tasks