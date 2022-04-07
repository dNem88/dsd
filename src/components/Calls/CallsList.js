import React, {Fragment} from 'react'
import Call from './Call'
import {useNavigate} from 'react-router-dom'
import LinkButton from '../LinkButton/LinkButton'
import styles from './CallsList.module.css'

function CallsList({calls}) {
    const navigate = useNavigate()

    function addCall() {
        navigate('/calls/add')
    }
     function viewStats() {
        navigate('/stats')
    }
    return (
        <Fragment>
            <div className={styles['links-container']}>
                <LinkButton clickHandler={addCall} href='' content={'добави'} image={'add'}/>
                <LinkButton clickHandler={viewStats} href='' content={'статистика'} image={'edit'}/>
            </div>
            {calls.calls && calls.calls.map(x => {
                return <Call key={x._id} _id={x._id} calls={x.calls || 'N/A'} valid={x.valid || 'N/A'} date={x.createdAt || ''} />
            } )}
        </Fragment>
            
    )
}

export default CallsList