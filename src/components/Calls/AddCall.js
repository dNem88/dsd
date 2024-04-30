import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddCall.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function AddCall({calls, setCalls}) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        calls: '',
        valid: ''
    })
    async function postCall(formdata) {
        try{
            const response = await fetch('https://realestate-p973.onrender.com/calls', {
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
        <div className={styles.container}>
            <Form title={'Добави обаждания'} content={'Добави'} submitHandler={submitHandler}>
                <Input type='text' labelContent='обаждания' id='calls' onChange={changeHandler} value={formdata.hood}/>
                <Input type='text' labelContent='валидни' id='valid' onChange={changeHandler} value={formdata.address}/>
                {error && <p>{error.message}</p>}
            </Form>
        </div>
    )
}   

export default AddCall