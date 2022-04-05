import React from 'react'
import styles from './TableRow.module.css'

function TableRow({data}) {
    const [key,value] = data
    let blacklist = ['_id', 'createdAt', 'updatedAt', 'date', 'offer']
    let translator = {
        hood: 'квартал',
        owner: 'собственик',
        address: 'адрес',
        phone: 'телефон',
        price: 'цена',
        comment: 'коментар',
        date: 'дата',
        income: 'приход',
        name: 'име'
    }

    if (blacklist.includes(key)) {
        return null
    } else {
        return (
        <tr className={styles.tr}>
            <td>{translator[key] || key}</td>
            <td>{value}</td>
        </tr>
    )
    }

    
}

export default TableRow