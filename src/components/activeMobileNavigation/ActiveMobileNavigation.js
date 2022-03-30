import React  from 'react';
import styles from './activeMobileNavigation.module.css'
import NavLink from '../NavLink/NavLink'
import navigation from '../../utils/navigation/navigation'

function ActiveMobileNavigation({click, isLogged}) {
    const {user} = navigation;
    return (
           <div onClick={click} className={styles['links-container']}>
               {user.map(x => {
                   return <NavLink key={x.href} {...x} classname={'mobile-link'}/>
               }) }
           </div>
    )
}

export default ActiveMobileNavigation