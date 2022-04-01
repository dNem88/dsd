import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddDeal.module.css'
import Input from '../input/Input'

function AddDeal({deals, setDeals}) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        hood: '',
        address: '',
        income: '',
        comment: ''
    })
    async function postDeal(formdata) {
        try{
            const response = await fetch('http://localhost:4000/deals', {
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
                setDeals({...deals, update: !deals.update})
                navigate('/deals')
            }
        }catch(err) {
            setError(err.message)
        }
    }
    function submitHandler(e) {
        e.preventDefault()
        postDeal(formdata)
    }
    function changeHandler(e) {
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    
    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input type='text' labelContent='квартал' id='hood' onChange={changeHandler} value={formdata.hood}/>
            <Input type='text' labelContent='адрес' id='address' onChange={changeHandler} value={formdata.address}/>
            <Input  type='text' labelContent='приход' id='income' onChange={changeHandler} value={formdata.income}/>
            <Input  type='text' labelContent='коментар' id='comment' onChange={changeHandler} value={formdata.comment}/>
            {error && <p>{error.message}</p>}
            <button className={styles.submit} type='submit'>Добави</button>
        </form>
    )
}   

export default AddDeal