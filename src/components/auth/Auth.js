
import React, {useState, useEffect} from 'react'
import loginUser from '../../utils/auth/auth'
import styles from './Auth.module.css'

function Auth({setUser}) {
    
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
                console.log(json)
                return json
            }
        } catch (err) {
            console.log(err)
            return err
        }
    }

   

    async function submitHandler(e) {
        e.preventDefault()
        login({username: username, password: password})
    }
    function changeUsername(e) {
        setUsername(e.target.value)
    }
    function changePassword(e) {
        setPassword(e.target.value)
    }
    return (
        <div className={styles.main}>
            <form onSubmit={submitHandler} className={styles.form}>
                <label htmlFor='username' placeholder='username' value={username}></label>
                <input onChange={changeUsername} type='text' placeholder='потребителско име' value={username} id='username'></input>
                <label htmlFor='password' ></label>
                <input onChange={changePassword} type='password' placeholder='парола' value={password} id='password'></input>
                <button className={styles.submit} type='submit'>ВХОД</button>
            </form>
        </div>
    )


}

export default Auth