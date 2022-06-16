import React from 'react'
import styles from './Task.module.css'
import {useNavigate} from 'react-router-dom'

function Task({task, expiresAt, id}) {
    const navigateTo = useNavigate()
    const dateObject = new Date(Number(expiresAt))

    return (
        <div className={styles["container"]} onClick={() => {
            navigateTo(`/tasks/${id}`)
        }}>
            <div className={styles["task"]}>
                {task}
            </div>
            <div className={styles["date"]}>
                <p>{`${dateObject.getDay()}-${dateObject.getMonth()+1}-${dateObject.getFullYear()}`}</p>
                <p>{`${dateObject.getHours()}:${dateObject.getMinutes()}`}</p>
            </div>
        </div>
    )
}

export default Task