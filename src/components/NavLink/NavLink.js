import React from 'react';
import {Link} from 'react-router-dom'
import styles from './navLink.module.css'

function NavLink({href, content, classname}) {

     return (
        <Link className={styles[classname]} to={href} onClick={() => {
           window.scrollTo({top: 0, behavior: 'smooth'})
        }}>{content}</Link>        
     )
}

export default NavLink