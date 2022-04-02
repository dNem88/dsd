import React from 'react'
import styles from './TableRow.module.css'

function TableRow({data}) {
    const [key,value] = data
    let blacklist = ['_id', 'createdAt', 'updatedAt']
    let translator = {
        hood: 'квартал',
        owner: 'собственик',
        address: 'адрес',
        phone: 'телефон',
        price: 'цена',
        comment: 'коментар'
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