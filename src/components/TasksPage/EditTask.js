import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './EditTask.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function EditTask({setTasks, tasks}) {
    const navigate = useNavigate()
    const {id} = useParams()
     const [error, setError] = useState(null)
     const [formdata, setFormdata] = useState(null)

    useEffect(() => {
         async function Fetch() {
            try{
                const response = await fetch(`https://easy-rose-coral-veil.cyclic.app/tasks/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get task!')
                }
                let json = await response.json()
                setFormdata(json)
            }catch(e) {
                setError({error: true, errorMessage: e.message})
            }
        }
        Fetch()
    }, [])
    async function submitHandler(e) {
        e.preventDefault()
        try{
            const response = await fetch(`https://easy-rose-coral-veil.cyclic.app/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            if (!response.ok) {
                throw new Error('Failed to update task')
            }
            let json = await response.json()
            setTasks({...tasks, update: !tasks.update})
            navigate('/tasks')
        } catch(e) {
            setError({
                error: true,
                errorMessage: e.message
            })
        }
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
    
    return (
        <div className={styles.container}>
            {formdata && 
            <Form submitHandler={submitHandler} title={'Промени задача'} content={"Запази"}>
                <Input type='text' labelContent='задача' id='task' onChange={changeHandler} value={formdata.task}/>
                <Input type='date' labelContent='дата' id='expiresAt' onChange={changeDate} value={formdata.date}/>
                {error && <p>{error.message}</p>}
            </Form>
            }
        </div>
    )
}

export default EditTask