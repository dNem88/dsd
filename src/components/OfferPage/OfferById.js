import React, {useState, useEffect, Fragment} from 'react'
import styles from './OfferById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import ErrorComp from '../errorComp/ErrorComp'
import LinkButton from '../LinkButton/LinkButton'


function OfferById({setOffers, offers}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [offer, setOffer] = useState({offer: null, error: null, errorMessage: null})
    
    useEffect(() => {
        async function Fetch() {
            try{
                const response = await fetch(`http://localhost:4000/offers/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get offer!')
                }
                let json = await response.json()
                console.log(json)
                setOffer({...offer, offer: json})
            }catch(e) {
                console.log(e)
                setOffer({...offer, error: true, errorMessage: e.message})
            }
        }
        Fetch()
    }, [])

    async function onDelete() {
         try{
            const response = await fetch('http://localhost:4000/offers', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({_id: id})
            })
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setOffers({...offers, update: !offers.update})
            console.log('here')
            navigate('/')
        }catch(e) {
            console.log(e)
        }
       
    }
    return (
        <div>
            <LinkButton href={`/offers/${id}/edit`} content={'EDIT'}/>
            <button onClick={onDelete}>DELETE</button>
        </div>
    )
}

export default OfferById