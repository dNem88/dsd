
import React, {useState} from 'react'
import loginUser from '../../utils/auth/auth'
import styles from './Auth.module.css'
import FullSpinner from '../FullSpinner/FullSpinner'

function Auth({setUser}) {
    const [status, setStatus] = useState('initial')
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function login(formdata) {
        try {
            let response = await loginUser(formdata);
            if (response.error) {
                throw new Error(response.error.message)
            } 
            let json = await response.json()
            if (!response.ok) {
                throw new Error(json.error.message || response.message)
            }
            if (json._id && json.username) {
                setUser({user: json})
                return json
            }
        } catch (err) {
            setStatus('initial')
            setError(err.message)
            return err
        }
    }

   

    async function submitHandler(e) {
        e.preventDefault()
        login({username: username, password: password})
        setStatus('pending')
    }
    function changeUsername(e) {
        setError(null)
        setUsername(e.target.value)
    }
    function changePassword(e) {
        setError(null)
        setPassword(e.target.value)
    }

    if (status === 'initial') {
        return (
            <div className={styles.main}>
                <form onSubmit={submitHandler} className={styles.form}>
                    <label htmlFor='username' placeholder='username' value={username}></label>
                    <input onChange={changeUsername} type='text' placeholder='потребителско име' value={username} id='username'></input>
                    <label htmlFor='password' ></label>
                    <input onChange={changePassword} type='password' placeholder='парола' value={password} id='password'></input>
                    {error && <p style={{color: 'white'}}>{error}</p>}
                    <button className={styles.submit} type='submit'>ВХОД</button>
                </form>
            </div>
        )
    } else if (status === 'pending') {
        return (
            <FullSpinner/>
        )
    }


}

export default Auth