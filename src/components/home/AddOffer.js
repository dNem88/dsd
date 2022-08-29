import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './AddOffer.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function AddOffer({offers, setOffers}) {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [formdata, setFormdata] = useState({
        hood: '',
        address: '',
        owner: '',
        phone: '',
        price: '',
        comment: ''
    })
    async function postOffer(formdata) {
        try{
            const response = await fetch('http://dsdrealestate.herokuapp.com/offers', {
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
                setOffers({...offers, update: !offers.update})
                navigate('/')
            }
        }catch(err) {
            setError(err.message)
        }
    }
    function submitHandler(e) {
        e.preventDefault()
        postOffer(formdata)
    }
    function changeHandler(e) {
        setFormdata({...formdata, [e.target.id]: e.target.value})
    }
    
    return (
        <div className={styles.container}>
            {formdata && 
            <Form submitHandler={submitHandler} title={'Добави оферта'} content={"Запази"}>
               <Input type='text' labelContent='квартал' id='hood' onChange={changeHandler} value={formdata.hood}/>
                <Input type='text' labelContent='адрес' id='address' onChange={changeHandler} value={formdata.address}/>
                <Input type='text' labelContent='собственик' id='owner' onChange={changeHandler} value={formdata.owner}/>
                <Input type='text' labelContent='телефон' id='phone' onChange={changeHandler} value={formdata.phone}/>
                <Input  type='text' labelContent='цена' id='price' onChange={changeHandler} value={formdata.price}/>
                <Input  type='text' labelContent='коментар' id='comment' onChange={changeHandler} value={formdata.comment}/>
                {error && <p>{error.message}</p>}
            </Form>
            }
        </div>
    )
}   

export default AddOffer