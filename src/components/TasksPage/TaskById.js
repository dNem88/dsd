import React, {useState, useEffect, Fragment} from 'react'
import styles from './TaskById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'

function TaskById({tasks, setTasks}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [task, setTask] = useState({task: null, error: null, errorMessage: null,})

    useEffect(() => {
        async function FetchTask() {
            try{
                const response = await fetch(`https://realestate2024-dnem88s-projects.vercel.app/tasks/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get task!')
                }
                let json = await response.json()
                
                setTask({...task, ...json})
                
            }catch(e) {
                
                setTask({...task, error: true, errorMessage: e.message})
            }
        }
        FetchTask()
    }, [])

     async function onDelete() {
         try{
            const response = await fetch(`https://realestate2024-dnem88s-projects.vercel.app/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({_id: id})
            })
            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setTasks({...tasks, update: !tasks.update})
            navigate('/tasks')
        }catch(e) {
            return e
        }
       
    }
   
   
    return (
        <div className={styles.container}>
            <Title content={'Задача'}/>
            <div className={styles.task}>
               {task.task || ''}
            </div>
            <div className={styles.date}>
                <p> {new Date(+task.expiresAt).toDateString() || 'грешна дата'}</p>
            </div>
            <div className={styles['buttons']}>
                <LinkButton href={``} clickHandler={() => {navigate(`/tasks/${id}/edit`)}} image={'edit'} content={'промени'}/>
                <LinkButton href={``} clickHandler={onDelete} content={'изтрий'} image={'del'}/>
            </div>
       </div>
    )
}

export default TaskById