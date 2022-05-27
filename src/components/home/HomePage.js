import React from 'react'
import styles from './HomePage.module.css'
import LinkButton from '../LinkButton/LinkButton'
import Offer from './Offer'
import ErrorComp from '../errorComp/ErrorComp'
import {useNavigate} from 'react-router-dom'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'

function HomePage({offers}) {

    const navigate = useNavigate()
    
    if (offers.offers) {
    return (
        <div className={styles.container}>
            <Title content={'Оферти'} button={<LinkButton href={'/offers/add'} content={'добави'} clickHandler={() => {navigate('/offers/add')}} image={'add'}/>}/>
            {!offers.error  ? offers.offers.sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).map((x,i) => {
                return <Offer href={'offers'} key={i} _id={x._id} phone={x.phone} hood={x.hood || 'N/A'} price={x.price || 'N/A'} address={x.address || 'N/A'}/>
            }) : <ErrorComp errorMessage={'Failed to fetch'}/>}
        </div>
    )
    } else {
        return <FullSpinner/>
    }
}   

export default HomePage