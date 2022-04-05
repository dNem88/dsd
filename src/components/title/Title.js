import React from "react";
import styles from './Title.module.css'

function Title({content, button='', options}) {
    return (
        <div className={styles.wrapper} >
            <h2>{content}</h2>
            {button}
        </div>
    )
}

export default Title;