import React from 'react'
import styles from './Maps.module.css'
import maps from '../../assets/maps.svg'

function Maps({address, color='white'}) {

    return (
        <div className={styles[`container-${color}`]}>
            <a className={styles[color]} href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(`София ${address}`) || encodeURI('ул Стефан Дичев 4')}`}>
                <img src={maps}/>
            </a>
        </div>
    )
}

export default Maps