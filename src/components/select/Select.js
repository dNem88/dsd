import React, {useState, Fragment} from 'react'
import styles from './Select.module.css'

function Select({options, defaultSelected='', label, setFormdata, setStats}) {
    const [selected, setSelected] = useState({value: defaultSelected})

    function changeHandler(e) {
        setSelected({value: e.target.value})
        setFormdata(e.target.value)
        setStats(null)
    }
    return (
        <Fragment>
            <label className={styles.label}>
                {label}
                <select className={styles.select} value={selected.value} onChange={changeHandler}>
                    {options.map((x,i)=> {
                    return <option key={x.toString() + i} value={x}>{x}</option>
                    })}
                </select>
            </label>
        </Fragment>
        
    )
}

export default Select