import React, {useState, useEffect} from 'react'
import styles from './StatsResult.module.css'
import Stat from './Stat'
import Title from '../title/Title'

const statsMapper = {
    'клиенти': (collection) => {
        const result = {}
        result['клиенти'] = collection.length
        return result
    },
    'оферти': (collection) => {
        const result = {}
        result['оферти'] = collection.length
        return result
    }, 
    'обаждания': (collection) => {
        const result = {}
        result['активни_дни'] = collection.length;
        result['обаждания'] = collection.reduce((acc,x) => {
            acc += Number(x.calls)
            return acc
        }, 0);
        result['валидни_оферти'] = collection.reduce((acc, x) => {
            acc += Number(x.valid)
            return acc
        }, 0);

        return result
    },
    'сделки': (collection) => {
        const result = {}
        result['сделки'] = collection.length
        result['приход'] = collection.reduce((acc, x) => {
            acc += Number(x.income)
            return acc
        }, 0)
        return result
    }
}
function StatsResult({stats, collection, year, month}) {
    const [result,setResult] = useState(null)
    
    
    useEffect(() => {
        if (stats) {
            const resultFunction = statsMapper[collection];
            let res = resultFunction(stats)
            setResult(res)
        }
    }, [stats])
    return (
        <div className={styles.container}>
            <Title content={`${collection.toUpperCase()} за ${month ? month.toUpperCase() : ''} ${year}`}/>
            <div className={styles['thead']}>
                <div></div>
                <p>резултат</p>
                <p>таргет</p>
                <p>изпълнение</p>
            </div>
            {stats && result && Object.entries(result).map(x =>  {
                return <Stat key={x[0]} keyField={x[0].split('_').join(' ')} value={x[1]} period={month ? 'month' : 'year'}/>
            })}
        </div>
    )
}

export default StatsResult