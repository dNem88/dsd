import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styles from './EditDeal.module.css'
import Input from '../input/Input'
import Form from '../form/Form'

function EditDeal({setDeals, deals}) {

    const navigate = useNavigate()
    const {id} = useParams()
     const [error, setError] = useState(null)
     const [formdata, setFormdata] = useState(null)

    useEffect(() => {
         async function Fetch() {
            try{
                const response = await fetch(`https://easy-rose-coral-veil.cyclic.app/deals/${id}`, {
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
            const response = await fetch(`https://easy-rose-coral-veil.cyclic.app/deals/${id}`, {
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
            setDeals({...deals, update: !deals.update})
            navigate('/deals')
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
            <Form submitHandler={submitHandler} content={'запази'} title={'Промени сделка'}>
                <Input type='text' labelContent='квартал' id='hood' onChange={changeHandler} value={formdata.hood}/>
                <Input type='text' labelContent='адрес' id='address' onChange={changeHandler} value={formdata.address}/>
                <Input  type='text' labelContent='приход' id='income' onChange={changeHandler} value={formdata.income}/>
                <Input  type='text' labelContent='коментар' id='comment' onChange={changeHandler} value={formdata.comment}/>
                {error && <p>{error}</p>}
            </Form>
            }
        </div>
    )
}

export default EditDeal