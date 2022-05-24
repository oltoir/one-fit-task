import React from "react";
import styles from './header.module.scss'
import '../../index.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header_bg}></div>
        </div>
    )
}

export default Header