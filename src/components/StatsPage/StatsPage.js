import React, {useState, useRef} from 'react'
import styles from './StatsPage.module.css'
import Select from '../select/Select'
import Form from '../form/Form'

const collections = ['','оферти', 'клиенти', 'обаждания', 'сделки']
const months = ['', 'януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
const years = [2022]

function StatsPage() {
    const [collection, setCollection] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState('');
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null)

    async function onSubmit(e) {
        e.preventDefault()
        let formdata = {
            collection: collection,
            year: year,
            month: month
        }
        console.log(formdata)
        // 'https://dsdrealestate.herokuapp.com/stats'
        try {
            const response = await fetch('http://localhost:4000/stats', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formdata)
            })
            if (!response.ok) {
                throw new Error('Failed to fetch stats!')
            }
            const json = await response.json()
            console.log(json)
            setStats(json)
            setError(null)
        } catch(err) {
            setError({error: true, errorMessage: err.message})
        }
    }
    return (
        <div className={styles.container}>
            <Form title='Избери' submitHandler={onSubmit} content={'запази'}>
                <Select options={collections} defaultSelected={''} label={'колекция'} setFormdata={setCollection}/>
                <Select options={years} defaultSelected={new Date().getFullYear()} label={'година'} setFormdata={setYear}/>
                <Select options={months} defaultSelected={''} label={'месец'} setFormdata={setMonth}/>
                {error && <p className={styles.error}>{error.errorMessage}</p>}
            </Form>
        </div>
    )
}

export default StatsPage