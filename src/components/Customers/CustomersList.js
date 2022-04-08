import React, {Fragment} from 'react'
import Customer from './Customer'
import Title from '../title/Title'



function CustomersList({customers}) {
   

    return (
        <Fragment>
            <Title content={'Клиенти'}/>
            {
                customers.customers && customers.customers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(x => {
                return <Customer key={x._id} _id={x._id} name={x.name || 'N/A'} price={x.price || 'N/A'} hood={x.hood || 'N/A'} phone={x.phone} offer={x.offer} comment={x.comment}/>
            } )}
        </Fragment>
            
    )
}

export default CustomersList