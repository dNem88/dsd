import React, {useState} from 'react'
import styles from './Select.module.css'

function Select({options}) {
    const [selected, setSelected] = useState(null)
    console.log(options)
    function changeHandler(e) {
        setSelected()
    }
    return (
        <select value={selected} onCahnge={changeHandler}>
            {options.map(x => {
                return <option selected={x._id === selected._id} id={x._id}>{`${x.hood} ${x.price}`}</option>
            })}
        </select>
    )
}

export default Select