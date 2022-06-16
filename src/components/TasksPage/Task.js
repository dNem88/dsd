import React from 'react'
import styles from './Task.module.css'
import {useNavigate} from 'react-router-dom'

function Task({task, expiresAt, id}) {
    const navigateTo = useNavigate()
    

    return (
        <div className={styles["container"]} onClick={() => {
            navigateTo(`/tasks/${id}`)
        }}>
            <div className={styles["task"]}>
                {task}
            </div>
            <div className={styles["date"]}>
                <p>{new Date(expiresAt).toDateString()}</p>
               
            </div>
        </div>
    )
}

export default Task