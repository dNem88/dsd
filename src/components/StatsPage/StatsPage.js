import React, {useState, Fragment} from 'react'
import styles from './StatsPage.module.css'
import Select from '../select/Select'
import Form from '../form/Form'
import StatsResult from './StatsResult'
import Title from '../title/Title'

const collections = ['','оферти', 'клиенти', 'обаждания', 'сделки']
const months = ['', 'януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
const years = [2022, 2023, 2024, 2025, 2026]

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
       
       
        try {
            const response = await fetch('https://dsdrealestate.herokuapp.com/stats', {
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
        <div className={styles.main}>
            <Title content={'Статистика'}/>
            <div className={styles.container}>
                <Form title='' submitHandler={onSubmit} content={'потвърди'}>
                    <Select options={collections} defaultSelected={''} label={'колекция'} setFormdata={setCollection} setStats={setStats}/>
                    <Select options={years} defaultSelected={new Date().getFullYear()} label={'година'} setFormdata={setYear} setStats={setStats}/>
                    <Select options={months} defaultSelected={''} label={'месец'} setFormdata={setMonth} setStats={setStats}/>
                    {error && <p className={styles.error}>{error.errorMessage}</p>}
                </Form>
            </div>
            {stats ?
                <div className={styles['result-container']}>
                    {stats && <StatsResult stats={stats} collection={collection} year={year} month={month}/>}
                </div>
                :
                <div className={styles['result-container']}>
                    
                </div>
            }
            
        </div>
    )
}

export default StatsPage