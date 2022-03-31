import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css' 

function LinkButton({href,content, className, clickHandler=() => null}) {

    return (
        <Link onClick={clickHandler} className={styles[className]} to={href} styles={styles}>{content}</Link>
    )
}
export default LinkButton