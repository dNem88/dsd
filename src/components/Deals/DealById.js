import React, {useState, useEffect} from 'react'
import styles from './DealById.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import Table from '../table/Table'
import TableRow from '../tableRow/TableRow'

function DealById({deals, setDeals}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [deal, setDeal] = useState({deal: null, error: null, errorMessage: null})
    
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

            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setDeals({...deals, update: !deals.update})
            navigate('/deals')
        }catch(e) {
            return e
        }
       
    }
    
    function addDeal() {
        navigate('/deals/add')
    }
    function editDeal() {
        navigate(`/deals/${id}/edit`)
    }
    return (
        <div className={styles.container}>
            <LinkButton href={``} content={'промени'} image={'edit'} clickHandler={editDeal}/>
            <LinkButton href={``} content={'добави'} image={'add'} clickHandler={addDeal}/>
            <Table>
                {deal.deal && 
                    Object.entries(deal.deal).map(x => {
                    return <TableRow key={x[0]} data={x}/>
                    })
                }
            </Table>
            <LinkButton href={``} content={'изтрий'} image={'del'} clickHandler={onDelete}/>
        </div>
    )
}

export default DealById