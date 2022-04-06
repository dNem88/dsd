import React, {useState, useEffect} from 'react'
import styles from './ArchivePage.module.css'
import Offer from '../home/Offer'
import ErrorComp from '../errorComp/ErrorComp'
import {useNavigate} from 'react-router-dom'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'

function ArchivePage() {
    const [archive, setArchive] = useState({archive: null, error: null, errorMessage: null, update: true})
    const navigate = useNavigate()
    
    useEffect(() => {
        async function FetchArchive() {
            try {
            const response = await fetch('https://dsdrealestate.herokuapp.com/offers/archive', {
                headers: {
                'Content-type': 'application/json'
                }
            })
            const json = await response.json()
            console.log(json)
            setArchive({...archive, archive: json, error: null})
            } catch(e) {
            console.log(e)
            setArchive({...archive, error: true, errorMessage: e.message})
            }
        }
        FetchArchive()
    },[])


    return (
        <div className={styles.container}>
            <Title content={'Архив'} />
            {!archive.error ? archive.archive ? archive.archive.map((x,i) => {
                return <Offer key={i} href={'archive'} _id={x._id} phone={x.phone} hood={x.hood || 'N/A'} price={x.price || 'N/A'} address={x.address || 'N/A'}/>
            }) : <FullSpinner/> : <ErrorComp errorMessage={'Failed to fetch'}/>}
        </div>
    )
}   

export default ArchivePage