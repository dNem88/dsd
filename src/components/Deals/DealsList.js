import React, {Fragment} from 'react'
import Deal from './Deal'
import {useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import Title from '../title/Title'


function DealsList({deals}) {
    const navigate = useNavigate()

    function addDeal() {
        navigate('/deals/add')
    }
    return (
        <Fragment>
            
            <Title content={'Сделки'} button={<LinkButton clickHandler={addDeal} href='' content='добави' image='add'/>} options={{height: '6vh', width: '100%', justifyContent: 'space-evenly'}}/>
            {
                deals.deals && deals.deals.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(x => {
                return <Deal key={x._id} _id={x._id} income={x.income || 'N/A'} date={x.date || 'N/A'} address={x.address || 'N/A'}/>
            } )}
        </Fragment>
            
    )
}

export default DealsList