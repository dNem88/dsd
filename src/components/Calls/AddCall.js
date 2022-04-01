import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddCall.module.css'
import Input from '../input/Input'

function AddCall({calls, setCalls}) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        calls: '',
        valid: ''
    })
    async function postCall(formdata) {
        try{
            const response = await fetch('https://dsdrealestate.herokuapp.com/calls', {
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
            if (json.insertedId) {
                setCalls({...calls, update: !calls.update})
                navigate('/calls')
            }
        }catch(err) {
            setError(err.message)
        }
    }
    function submitHandler(e) {
        e.preventDefault()
        postCall(formdata)
    }
    function changeHandler(e) {
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input type='text' labelContent='обаждания' id='calls' onChange={changeHandler} value={formdata.hood}/>
            <Input type='text' labelContent='валидни' id='valid' onChange={changeHandler} value={formdata.address}/>
            {error && <p>{error.message}</p>}
            <button className={styles.submit} type='submit'>Добави</button>
        </form>
    )
}   

export default AddCall