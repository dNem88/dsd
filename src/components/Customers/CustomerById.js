import React, {useState, useEffect, Fragment} from 'react'
import styles from './CustomerById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import TableRow from '../tableRow/TableRow'
import Table from '../table/Table'
import Dial from '../dial/Dial'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'


function CustomerById({setCustomers, customers}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [customer, setCustomer] = useState({customer: null, error: null, errorMessage: null,})
    

    useEffect(() => {
        async function FetchCustomer() {
            try{
                const response = await fetch(`https://realestate2024-dnem88s-projects.vercel.app/customers/${id}`, {
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Failed to get customer!')
                }
                let json = await response.json()
                console.log(json)
                setCustomer({...customer, customer: json})
            }catch(e) {
                setCustomer({...customer, error: true, errorMessage: e.message})
            }
        }
        FetchCustomer()
    }, [])
  
    async function onDelete() {
         try{
            const response = await fetch('https://realestate2024-dnem88s-projects.vercel.app/customers', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({_id: id})
            })
            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setCustomers({...customers, update: !customers.update})
            navigate('/customers')
        }catch(e) {
            return e
        }
       
    }
   
    if (customer.customer) {
    return (
        <div className={styles.container}>
            <Dial phoneNumber={customer.customer && customer.customer.phone}/>
            {customer.customer &&
                <Fragment>
                    <Title content={'Клиент'}/>
                    <Table>
                            {customer.customer && 
                                Object.entries(customer.customer).map(x => {
                                    return <TableRow key={x[0]} data={x}/>
                                })
                            }
                    </Table>
                     <LinkButton href={``} clickHandler={() => {navigate(`/customers/${id}/edit`)}} image={'edit'} content={'промени'}/>
                    <LinkButton href={``} clickHandler={onDelete} content={'изтрий'} image={'del'}/>
                </Fragment>

             }
        </div>
    )} else {
        return <FullSpinner/>
    }
}

export default CustomerById