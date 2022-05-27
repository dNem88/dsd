import React from 'react'
import styles from './SearchBar.module.css'
import search from '../../assets/search.svg'

function SearchBar({data,setData}) {

    function changeHandler(e) {
        setData(e.target.value)
    }
    console.log(data)
    return (
        <div className={styles.container}>
            <input className={styles.search} type='search' id='search' placeholder='търси по адрес' value={data} onChange={changeHandler}></input>
            <img src={search}/>
        </div>
    )
}

export default SearchBar