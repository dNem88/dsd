import React from 'react'
import styles from './HomePage.module.css'
import LinkButton from '../LinkButton/LinkButton'
import Offer from './Offer'
import Spinner from '../spinner/Spinner'
import ErrorComp from '../errorComp/ErrorComp'
import {useNavigate} from 'react-router-dom'

function HomePage({offers}) {
    console.log(offers)
    const navigate = useNavigate()
    
    return (
        <div className={styles.container}>
            <LinkButton href={'/offers/add'} content={'добави'} clickHandler={() => {navigate('/offers/add')}} image={'add'}/>
            {!offers.error ? offers ? offers.offers.map((x,i) => {
                return <Offer key={i} _id={x._id} phone={x.phone} hood={x.hood || 'N/A'} price={x.price || 'N/A'} address={x.address || 'N/A'}/>
            }) : <Spinner/> : <ErrorComp errorMessage={'Failed to fetch'}/>}
        </div>
    )
}   

export default HomePage