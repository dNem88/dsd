import React, {useState, useEffect, Fragment} from 'react'
import styles from './OfferById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import TableRow from '../tableRow/TableRow'
import Table from '../table/Table'
import Customer from '../Customers/Customer'
import Dial from '../dial/Dial'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'


function OfferById({setOffers, offers}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [offer, setOffer] = useState({offer: null, error: null, errorMessage: null,})
     const [customers, setCustomers] = useState({customers: null, error: null, errorMessage: null,})
    

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
                setOffer({...offer, offer: json})
            }catch(e) {
                setOffer({...offer, error: true, errorMessage: e.message})
            }
        }
        Fetch()
    }, [])
    useEffect(() => {
        async function FetchCustomers() {
            try{
                const response = await fetch(`https://dsdrealestate.herokuapp.com/customers/offer/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get offer!')
                }
                let json = await response.json()
                console.log(json)
                setCustomers({...customers, customers: json})
            }catch(e) {
                setCustomers({...customers, error: true, errorMessage: e.message})
            }
        }
        FetchCustomers()
    }, [])
    console.log(customers)
    async function onDelete() {
         try{
            const response = await fetch('https://dsdrealestate.herokuapp.com/offers', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({_id: id})
            })
            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setOffers({...offers, update: !offers.update})
            navigate('/')
        }catch(e) {
            return e
        }
       
    }
    function addDeal() {
        navigate('/deals/add')
    }
    
    if (offer.offer && customers.customers) {
        return (
        <div className={styles.container}>
            {offer.offer &&
                <Fragment>
                     <LinkButton href={``} clickHandler={() => {navigate(`/customers/${id}/add`)}} image={'add'} content={'клиент'}/>
                    <LinkButton href={``} clickHandler={addDeal} content={'сделка'} image={'add'}/>
                    <Title content={'Оферта'}/>
                    <Table>
                            {offer.offer && 
                                Object.entries(offer.offer).map(x => {
                                    return <TableRow key={x[0]} data={x}/>
                                })
                            }
                    </Table>
                </Fragment>

             }
             <div className={styles['buttons-container']}>
                 {offer.offer && <Dial phoneNumber={offer.offer.phone}/>}
                
             </div>
             {customers.customers && offer.offer &&
                customers.customers.map(x => {
                    return <Customer key={x._id} {...x} hood={offer.offer.hood} address={offer.offer.address} price={offer.offer.price}/>
                })
             }
            <LinkButton href={``} clickHandler={() => {navigate(`/offers/${id}/edit`)}} image={'edit'} content={'промени'}/>
             <LinkButton href={``} clickHandler={onDelete} content={'изтрий'} image={'del'}/>
        </div>
    )
    } else {
        return <FullSpinner/>
    }
    
}

export default OfferById