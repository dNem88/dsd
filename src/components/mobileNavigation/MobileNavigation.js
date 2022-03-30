import React, {useState, useContext} from 'react';
import styles from './mobileNavigation.module.css'
import ActiveMobileNavigation from '../activeMobileNavigation/ActiveMobileNavigation';


function MobileNavigation({userContext}) {

    const context = useContext(userContext)
    const [navigation, setNavigation] = useState({active: false})
    function clickHandler(e) {
        setNavigation({active: !navigation.active})
    }
    if (context) {
        return (
                <nav className={styles['nav']}>
                    <div onClick={clickHandler} className={styles['hamburger-icon-container']}>
                        <img src={navigation.active ? "https://rtiovelu.sirv.com/Images/formula1/navigation/xicon.svg" : "https://rtiovelu.sirv.com/Images/formula1/navigation/menu.svg"} alt='menu-icon'/>
                    </div>
                    <div className={styles['logo-container']}>
                        <p>{context ? context.user.username : ''}</p>
                    </div>
                    {(navigation.active) ? <ActiveMobileNavigation click={clickHandler} /> : null}
                </nav>
        )
    } else {
        return (null)
    }
    
}

export default MobileNavigation