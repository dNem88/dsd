import React, {useContext} from 'react';
import styles from './navigation.module.css'
import navigation from '../../utils/navigation/navigation'
import NavLink from '../NavLink/NavLink';

function Navigation({userContext}) {
    const context = useContext(userContext)
    
    const {user} = navigation;
   
    
    if (context) {
    return (
        <nav className={styles['nav']}>
             <div className={styles['logo-container']}>
                <p>{context ? context.user.username : ''}</p>
            </div>
            <div className={styles['links-container']}>
                    {user.map(x => {
                        return <NavLink key={x.href} {...x} classname={'desktop-link'}/>
                    })}
            </div>
        </nav>
    )
    } else {
        return null
    }
}

export default Navigation
