import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css' 
import add from '../../assets/add.svg'

function LinkButton({href,content, image, clickHandler=() => null}) {

    return (
        <div className={styles.container} onClick={clickHandler}>
            <div className={styles['image-container']}>
                <img src={add}/>
            </div>
            <Link  to={''} styles={styles}>{content}</Link>
        </div>
    )
}
export default LinkButton