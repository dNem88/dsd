import React, {useState, useEffect} from 'react'
import styles from './ArchivePage.module.css'
import Offer from '../home/Offer'
import ErrorComp from '../errorComp/ErrorComp'
import {useNavigate} from 'react-router-dom'
import Title from '../title/Title'
import FullSpinner from '../FullSpinner/FullSpinner'
import SearchBar from '../searchBar/SearchBar'


function ArchivePage() {
    const [archive, setArchive] = useState({archive: null, error: null, errorMessage: null, update: true})
    const [searchString, setSearchString] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        async function FetchArchive() {
            try {
            const response = await fetch('https://realestate2024-dnem88s-projects.vercel.app/offers/archive', {
                headers: {
                'Content-type': 'application/json'
                }
            })
            const json = await response.json()
            setArchive({...archive, archive: json, error: null})
            } catch(e) {
            setArchive({...archive, error: true, errorMessage: e.message})
            }
        }
        FetchArchive()
    },[])

    
    return (
        <div className={styles.container}>
            <div className={styles['bar-container']}>
                <SearchBar setData={setSearchString} data={searchString}/>
            </div>
            <Title content={'Архив'} />
            {!archive.error ? archive.archive ? archive.archive.filter(x => x.address.toLowerCase().includes(searchString.toLowerCase())).sort((a,b) => new Date(b.createdAt)-new Date(a.createdAt)).slice(0, 10).map((x,i) => {
                return <Offer key={i} href={'archive'} _id={x._id} phone={x.phone} hood={x.hood || 'N/A'} price={x.price || 'N/A'} address={x.address || 'N/A'}/>
            }) : <FullSpinner/> : <ErrorComp errorMessage={'Failed to fetch'}/>}
        </div>
    )
}   

export default ArchivePage