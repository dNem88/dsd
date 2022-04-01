import React, {useState, useEffect} from 'react'
import styles from './DealById.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'

function DealById({deals, setDeals}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [deal, setDeal] = useState({offer: null, error: null, errorMessage: null})
    
    useEffect(() => {
        async function Fetch() {
            try{
                const response = await fetch(`https://dsdrealestate.herokuapp.com/deals/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get offer!')
                }
                let json = await response.json()
                console.log(json, 'json')
                setDeal({...deal, deal: json})
            }catch(e) {
                setDeal({...deal, error: true, errorMessage: e.message})
            }
        }
        Fetch()
    }, [])

    async function onDelete() {
         try{
            const response = await fetch('https://dsdrealestate.herokuapp.com/deals', {
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
            setDeals({...deals, update: !deals.update})
            navigate('/deals')
        }catch(e) {
            return e
        }
       
    }
    
    return (
        <div>
            <LinkButton href={`/deals/${id}/edit`} content={'ПРОМЕНИ'}/>
            <button onClick={onDelete}>ИЗТРИЙ</button>
        </div>
    )
}

export default DealById