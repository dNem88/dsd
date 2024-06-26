import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddDeal.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

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
            const response = await fetch('https://realestate2024-dnem88s-projects.vercel.app/deals', {
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
            setDeals({...deals, update: !deals.update})
            navigate('/deals')
            
        }catch(err) {
            console.log(err)
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
        <div className={styles.container}>
            {formdata &&
                <Form submitHandler={submitHandler} title='Добави сделка' content={'добави'}>
                    <Input type='text' labelContent='квартал' id='hood' onChange={changeHandler} value={formdata.hood}/>
                    <Input type='text' labelContent='адрес' id='address' onChange={changeHandler} value={formdata.address}/>
                    <Input  type='text' labelContent='приход' id='income' onChange={changeHandler} value={formdata.income}/>
                    <Input  type='text' labelContent='коментар' id='comment' onChange={changeHandler} value={formdata.comment}/>
                </Form> 
            }
        </div>
    )
}   

export default AddDeal