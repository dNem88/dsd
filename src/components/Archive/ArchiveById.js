import React, {useState, useEffect, Fragment} from 'react'
import styles from './ArchiveById.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import TableRow from '../tableRow/TableRow'
import Table from '../table/Table'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'



function ArchiveById({setOffers, offers}) {
    const navigate = useNavigate()
    const {id} = useParams() 
    const [offer, setOffer] = useState({offer: null, error: null, errorMessage: null,})
    

    useEffect(() => {
        async function Fetch() {
            try{
                const response = await fetch(`http://dsdrealestate.herokuapp.com//offers/${id}`, {
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
   

    async function Activate(e) {
        try{
            const response = await fetch(`http://dsdrealestate.herokuapp.com//offers/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({_id: id, active: 'true', createdAt: new Date()})
            })
            if (!response.ok) {
                throw new Error('Failed to delete!')
            }
            setOffers({
                ...offers,
                update: !offers.update
            })
            navigate('/')
        }catch(e) {
            return e
        }
    }
   
    
    if (offer.offer) {
        return (
        <div className={styles.container}>
            {offer.offer &&
                <Fragment>
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
            <LinkButton href={``} clickHandler={Activate} image={'edit'} content={'активирай'}/>
        </div>
    )
    } else {
        return <FullSpinner/>
    }
    
}

export default ArchiveById