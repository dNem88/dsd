import React from 'react'
import styles from './Deal.module.css'
import {useNavigate} from 'react-router-dom'

function Deal({_id, address, income, date}) {
    const navigate = useNavigate()
    let dateString = date.split(' ').slice(1,4).join(' ');
    function clickHandler(e) {
        navigate(`/deals/${_id}`)
    }
    return (
        <div className={styles.container} onClick={clickHandler}>
            <h3>{dateString}</h3>
            <h3>{`${income} лв`}</h3>
            <h5>{address}</h5>
        </div>
    )
}

export default Deal