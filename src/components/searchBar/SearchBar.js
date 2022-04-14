import React, {useState} from 'react'
import styles from './SearchBar.module.css'

function SearchBar({data,setData}) {

    function changeHandler(e) {
        setData(e.target.value)
    }
    console.log(data)
    return (
        <input className={styles.search} type='search' id='search' placeholder='търси по адрес' value={data} onChange={changeHandler}></input>
    )
}

export default SearchBar