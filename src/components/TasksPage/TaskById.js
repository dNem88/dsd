import React, {useState, useEffect, Fragment} from 'react'
import styles from './TaskById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import TableRow from '../tableRow/TableRow'
import Table from '../table/Table'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'

function TaskById({tasks, setTasks}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [task, setTask] = useState({task: null, error: null, errorMessage: null,})

    useEffect(() => {
        async function FetchTask() {
            try{
                const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get task!')
                }
                let json = await response.json()
                console.log(json)
                setTask({...task, ...json})
            }catch(e) {
                setTask({...task, error: true, errorMessage: e.message})
            }
        }
        FetchTask()
    }, [])

     async function onDelete() {
         try{
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
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
   
   

     if (task.task) {
    return (
        <div className={styles.container}>
            {task.task &&
                <Fragment>
                    <Title content={'Задача'}/>
                    <div>
                        {task.task}
                    </div>
                    <div>
                        {task.expiresAt}
                    </div>
                     <LinkButton href={``} clickHandler={() => {navigate(`/tasks/${id}/edit`)}} image={'edit'} content={'промени'}/>
                    <LinkButton href={``} clickHandler={onDelete} content={'изтрий'} image={'del'}/>
                </Fragment>

             }
        </div>
    )} else {
        return <FullSpinner/>
    }
}

export default TaskById