import React from 'react'
import styles from './Form.module.css'
import SubmitButton from '../submitBtn/SubmitButton'

function Form({children, submitHandler, title, content}) {


    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>{title}</h2>
            {children}
            <SubmitButton content={content}/>
        </form>
    )
}

export default Form