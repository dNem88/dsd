import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './EditOffer.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function EditOffer({setOffers, offers}) {
    const navigate = useNavigate()
    const {id} = useParams()
     const [error, setError] = useState(null)
     const [formdata, setFormdata] = useState(null)

    useEffect(() => {
         async function Fetch() {
            try{
                const response = await fetch(`https://dsdrealestate.herokuapp.com/offers/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get offer!')
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
            const response = await fetch(`https://dsdrealestate.herokuapp.com/offers/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            if (!response.ok) {
                throw new Error('Failed to update offer')
            }
            let json = await response.json()
            setOffers({...offers, update: !offers.update})
            navigate('/')
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
    
    return (
        <div className={styles.container}>
            {formdata && 
            <Form submitHandler={submitHandler} title={'?????????????? ????????????'} content={"????????????"}>
                <Input type='text' labelContent='??????????????' id='hood' onChange={changeHandler} value={formdata.hood}/>
                <Input type='text' labelContent='??????????' id='address' onChange={changeHandler} value={formdata.address}/>
                <Input type='text' labelContent='????????????????????' id='owner' onChange={changeHandler} value={formdata.owner}/>
                <Input type='text' labelContent='??????????????' id='phone' onChange={changeHandler} value={formdata.phone}/>
                <Input  type='text' labelContent='????????' id='price' onChange={changeHandler} value={formdata.price}/>
                <Input  type='text' labelContent='????????????????' id='comment' onChange={changeHandler} value={formdata.comment}/>
                {error && <p>{error.message}</p>}
            </Form>
            }
        </div>
    )
}

export default EditOffer