import React from "react";
import styles from './FullSpinner.module.css'
import Spinner from "../spinner/Spinner";

function FullSpinner() {

    return (
        <div className={styles.container}>
            <Spinner/>
        </div>
    )
}

export default FullSpinner