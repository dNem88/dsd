import React, {Fragment} from 'react'
import styles from './input.module.css'

function Input({type, id, value, labelContent, onChange, readonly=false}) {

    return (
        <Fragment>
            <label className={styles.label} htmlFor={id}>{labelContent}</label>
            <input className={styles.input} type={type} id={id} placeholder={labelContent} value={value} onChange={onChange} readOnly={readonly}></input>
        </Fragment>
    )
}

export default Input