import React from 'react'
import styles from './SubmitButton.module.css'

function SubmitButton({content}) {


    return(
        <button className={styles.submit} type={'submit'}>{content}</button>
    )
}

export default SubmitButton