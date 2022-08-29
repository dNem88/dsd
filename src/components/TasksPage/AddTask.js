import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddTask.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function AddTask({tasks, setTasks}) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        task: '',
        expiresAt: ''
    })
    async function postTask(formdata) {
        try{
            const response = await fetch('https://dsdrealestate.herokuapp.com/tasks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            if (!response.ok) {
                throw new Error('Failed to post data')
            }
            const json = await response.json()
            console.log(json)
            setTasks({...tasks, update: !tasks.update})
            navigate('/tasks')
            
        }catch(err) {
            setError(err.message)
        }
    }
    function submitHandler(e) {
        e.preventDefault()
        postTask(formdata)
    }
    function changeHandler(e) {
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    function changeDate(e) {
        
        setFormdata({
            ...formdata,
            [e.target.id]: new Date(e.target.value).getTime()
        })
    }
    console.log(formdata)
    return (
        <div className={styles.container}>
            <Form title={'Добави задача'} content={'Добави'} submitHandler={submitHandler}>
                <Input type='text' labelContent='задача' id='task' onChange={changeHandler} value={formdata.task}/>
                <Input type='date' labelContent='дата' id='expiresAt' onChange={changeDate} value={formdata.date}/>
                {error && <p>{error.message}</p>}
            </Form>
        </div>
    )
}   

export default AddTask