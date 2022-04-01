import React, {Fragment} from 'react'
import Deal from './Deal'
import {useNavigate} from 'react-router-dom'

function DealsList({deals}) {
    const navigate = useNavigate()

    function addDeal() {
        navigate('/deals/add')
    }
    return (
        <Fragment>
            <button onClick={addDeal}>добави</button>
            {deals.deals && deals.deals.map(x => {
                return <Deal key={x._id} _id={x._id} income={x.income || 'N/A'} date={x.date || 'N/A'} address={x.address || 'N/A'}/>
            } )}
        </Fragment>
            
    )
}

export default DealsList