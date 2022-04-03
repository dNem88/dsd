import React, {Fragment} from 'react'
import Deal from './Deal'
import {useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'


function DealsList({deals}) {
    const navigate = useNavigate()

    function addDeal() {
        navigate('/deals/add')
    }
    return (
        <Fragment>
            <LinkButton clickHandler={addDeal} href='' content='добави' image='add'/>
            {deals.deals && deals.deals.map(x => {
                return <Deal key={x._id} _id={x._id} income={x.income || 'N/A'} date={x.date || 'N/A'} address={x.address || 'N/A'}/>
            } )}
        </Fragment>
            
    )
}

export default DealsList