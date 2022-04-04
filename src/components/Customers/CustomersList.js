import React, {Fragment} from 'react'
import Customer from './Customer'
import {useNavigate} from 'react-router-dom'



function CustomersList({customers}) {
   

    return (
        <Fragment>
            {customers.customers && customers.customers.map(x => {
                return <Customer key={x._id} _id={x._id} name={x.name || 'N/A'} price={x.price || 'N/A'} hood={x.hood || 'N/A'} phone={x.phone} offer={x.offer}/>
            } )}
        </Fragment>
            
    )
}

export default CustomersList