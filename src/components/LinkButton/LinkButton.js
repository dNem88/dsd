import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css' 
import add from '../../assets/add.svg'
import bin from '../../assets/bin.svg'
import edit from '../../assets/edit.svg'


function LinkButton({href,content, image, clickHandler=() => null}) {
    const icons = {
        add: add,
        del: bin,
        edit: edit
    }
    return (
        <div className={styles.container} onClick={clickHandler}>
            <div className={styles['image-container']}>
                <img src={icons[image]}/>
            </div>
            <Link  to={''} styles={styles}>{content}</Link>
        </div>
    )
}
export default LinkButton