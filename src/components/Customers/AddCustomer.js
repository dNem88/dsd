import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './AddCustomer.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function AddCustomer({customers, setCustomers}) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        offer: id, 
        phone: '', 
        comment: '',
        name: ''
    })
    async function postCustomer(formdata) {
        try{
            const response = await fetch('https://dsdrealestate.herokuapp.com/customers', {
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
                setCustomers({...customers, update: !customers.update})
                navigate('/customers')
            }
        }catch(err) {
            setError(err.message)
        }
    }
    function submitHandler(e) {
        e.preventDefault()
        postCustomer(formdata)
    }
    function changeHandler(e) {
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    
    return (
        <div className={styles.container}>
            {formdata && 
            <Form submitHandler={submitHandler} title={'Добави клиент'} content={"Запази"}>
                <Input type='text' labelContent='име' id='name' onChange={changeHandler} value={formdata.name}/>
                <Input type='text' labelContent='телефон' id='phone' onChange={changeHandler} value={formdata.phone}/>
                <Input type='text' labelContent='коментар' id='comment' onChange={changeHandler} value={formdata.comment}/>
                {error && <p>{error.message}</p>}
            </Form>
            }
        </div>
    )
}   

export default AddCustomer